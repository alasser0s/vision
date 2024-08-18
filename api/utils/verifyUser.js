import jwt from 'jsonwebtoken';
import { errorhandler } from './error.js';

export const verifyToken = (req, res, next) => {
  // Extract the token from cookies
  const token = req.cookies.access_token;
  
  // Log the token for debugging purposes
  console.log('Access token:', token);

  // Check if token is provided
  if (!token) {
    console.log('No token provided');
    return next(errorhandler(403, 'Unauthorized'));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification error:', err);
      return next(errorhandler(401, 'Unauthorized'));
    }

    // Log the decoded user for debugging
    console.log('Token verified, user:', user);

    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};
