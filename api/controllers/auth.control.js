import bcryptjs from 'bcryptjs'
import User from '../modules/user.js'
import { errorhandler } from '../utils/error.js';
export const signup = async (req, res,next) => {
    const { password, email, username } = req.body;
    if (!password || !email || !username || username === "" || email === "" || password === "") {
next(errorhandler(400,"all fields are required")) }
const passwordhash = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password : passwordhash,
    });
    try { 
        await newUser.save();
        res.json('signed up')
    } catch(error)
    {
next(error)    }


}
 