import jwt from 'jsonwebtoken';
import { errorhandler } from './error.js';

export const verifyToken = (req, res, next) => {
    console.log('Received Cookies:', req.cookies); // Log all cookies for debugging

    const token = req.cookies.access_token;
    console.log('Access token:', token); // Log the token for debugging

    if (!token) {
        return next(errorhandler(403, 'Unauthorized: No token provided'));
    }
 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorhandler(401, 'Unauthorized: Invalid token'));
        }
        req.user = user;
        next();
    });
};
