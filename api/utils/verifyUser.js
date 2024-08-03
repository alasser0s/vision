import jwt from 'jsonwebtoken';
import { errorhandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
console.log( req.cookies.access_token);

  if (!token) {
    console.log('No token provided');
    return next(errorhandler(401, 'Unauthorized'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err);
      return next(errorhandler(401, 'Unauthorized'));
    }
    console.log('Token verified, user:', user);
    req.user = user;
    next();
  });
};
