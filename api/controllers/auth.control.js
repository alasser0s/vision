import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../modules/user.js'; // Ensure the path is correct
import { errorhandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { password, email, username } = req.body;
    if (!password || !email || !username || username === "" || email === "" || password === "") {
        return next(errorhandler(400, "All fields are required"));
    }
    const passwordHash = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: passwordHash,
    });
    try {
        await newUser.save();
        res.json('Signed up');
    } catch (error) {
        next(error);
    }
}; 

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        return next(errorhandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorhandler(400, "Username or password is wrong"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) { 
            return next(errorhandler(400, "Username or password is wrong"));
        } 
        const { password: pass, ...rest } = validUser._doc;
        const token = jwt.sign({ id: validUser._id, IsAdmin: validUser.IsAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: process.env.JWT_SECRET === 'production' ? 'Strict' : 'Lax',

        });

        console.log('Token:', token); // Log the generated token
        console.log('Cookie set:', res.getHeader('Set-Cookie')); // Log the cookie header
        console.log('Response:', rest); // Log the response

        res.status(200).json(rest);
    } catch (error) {
        console.error('Signin error:', error); // Log any errors
        next(error);
    }
};


export const google = async (req, res, next) => {
    const { email, name, PhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id, IsAdmin:user.IsAdmin }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure cookie only in production
                sameSite: 'Strict'
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: PhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id , IsAdmin: newUser.IsAdmin}, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure cookie only in production
                sameSite: 'Strict'
            }).json(rest);
        }
    } catch (error) {
        next(error);
    }
};
