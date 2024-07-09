import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    UserName: {
        required: true,
        type: String,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    }
})

const User = new mongoose.model("User",userSchema);

export default User;