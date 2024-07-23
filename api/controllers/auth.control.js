import bcryptjs from 'bcryptjs';
import User from '../modules/user.js';
import { errorhandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { password, email, username } = req.body;
    if (!password || !email || !username || username === "" || email === "" || password === "") {
        return next(errorhandler(400, "all fields are required"));
    }
    const passwordhash = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: passwordhash,
    });
    try {
        await newUser.save();
        res.json('signed up');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        return next(errorhandler(400, 'all fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorhandler(400, "username or password is wrong"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) { 
            return next(errorhandler(400, "username or password is wrong"));
        } 
        const { password: pass, ...rest } = validUser._doc;
        const token = jwt.sign(
            { id: validUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' }
        );
        res.status(200).cookie("access_token", token, {
            httpOnly: true
        }).json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name, PhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.status(200).cookie('access token', token, {
                httpOnly: true,
            }).json(rest);
        } else {
            const generatedpassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedpassword = bcryptjs.hashSync(generatedpassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email,
                password: hashedpassword,
                profilePicture: PhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie('access token', token, {
                httpOnly: true,
            }).json(rest);
        }
    } catch (error) {
        next(error);
    }
};
