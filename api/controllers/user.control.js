import User from "../modules/user.js"; // Ensure the path is correct
import { errorhandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({ message: "API is connected" });
}

export const updateUser = async (req, res, next) => {
    try {
        console.log("Incoming request body:", req.body);
        console.log("Authenticated user ID:", req.user.id);

        // Check if the user is authorized to update the profile
        if (req.user.id !== req.params.userId) {
            return next(errorhandler(403, 'Unauthorized'));
        }
 
        // Validate and hash password if provided
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return next(errorhandler(403, 'Password must be more than 6 characters'));
            }
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        // Validate username if provided
        if (req.body.username) {
            if (req.body.username.length < 6 || req.body.username.length > 20) {
                return next(errorhandler(400, 'Username must be between 6 and 20 characters'));
            }
            if (req.body.username !== req.body.username.toLowerCase()) {
                return next(errorhandler(400, 'Username must be lowercase'));
            }
            if (req.body.username.includes(' ')) {
                return next(errorhandler(400, 'Username must have no spaces'));
            }
            if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
                return next(errorhandler(400, 'Username must only contain letters and numbers'));
            }
        }

        // Update the user information in the database
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password,
            },
        }, { new: true });

        // Check if the user was found and updated
        if (!updatedUser) {
            return next(errorhandler(404, 'User not found'));
        }

        // Remove the password from the response
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (err) {
        console.error("Error updating user:", err);
        next(err);
    }
};
export const deleteUser = async (req, res, next) => {
 
  
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json('User deleted successfully');
    } catch (error) {
      next(error);
    }
  }; 
  export const signout = (req,res,next) => {
    try {
        res.clearCookie('access_token').status(200).json('signed out')
    } catch (error) {
        next(error)
    }
  }