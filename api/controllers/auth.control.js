import bcryptjs from 'bcryptjs'
import User from '../modules/user.js'
export const signup = async (req, res) => {
    const { password, email, username } = req.body;
    if (!password || !email || !username || username === "" || email === "" || password === "") {
        return res.status(400).json({ message: "all fields are connected" })
    }
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
        res.status(500).json({ message:error.message });
    }


}
 