import bcryptjs from 'bcryptjs'
import User from '../modules/user.js'
import { errorhandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'
  
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
 export const signin = async (req , res , next) => {
    const {email,password} = req.body;
    if (!email || !password || email === "" || password === ""){
        next(errorhandler(400,'all fields are required'))
    }
    
    try{
const vaildUser = await User.findOne({email})
if(!vaildUser){
   return next(errorhandler(400,"username or password is wrong"));
}
const vaildPassword = bcryptjs.compareSync(password,vaildUser.password);
if(!vaildPassword){
    return next(errorhandler(400,"username or password is wrong"));
}
const {password: pass,...rest} = vaildUser._doc;
const token = jwt.sign(
    {id:vaildUser._id}, process.env.JWT_SECRET, {expiresIn:'1d'}
)
res.status(200).cookie("access_token", token,{
    httpOnly:true
}).json(rest)

    }catch (error){
next(error)
    }
 }