import jwt from 'jsonwebtoken'
import { errorhandler } from './error.js'
export const verifyToken = (req , res , next) => {
    const token = req.cookies.access_token
    if (!token){
        return next(errorhandler(401,'unauthorized'))
    }
jwt.verify(token,process.env.JWT_TOKEN , (error,user) =>{
    if(error){
        return next(errorhandler(401,'unauthorized'))

    }
    req.user = user
 next(  )
})
}