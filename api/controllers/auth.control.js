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
 export const signin = (req , res , next) => {
    const {username,password} = req.body;
    if (!username || !password || username === "" || password === ""){
        next(errorhandler(400,'all fields are required'))
    }
    try{
const vaildUser = await User.findOne({email})
if(!vaildUser){
    next(errorhandler(400,"username or password is wrong"))
}
const vaildPassword = bcryptjs.compareSync(password,vaildUser.password);
if(!vaildPassword){
    next(errorhandler(400,"username or password is wrong"));
}
    }catch (error){
next(error)
    }
 }