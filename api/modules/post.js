import mongoose from "mongoose";
const postScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
    title: {
        required: true,
        type: String,
        unique: true,

    },
    slug: {
        required: true,
        type: String,
        unique: true,

    },
    content: { type: String, required: true }, // Mixed type can store any data

    category: {
        type: mongoose.Schema.Types.Mixed,
        required: false,
        default: 'uncatogarized'
    },
    price: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    }, 
    images: {
        type: String,
        default: 'https://media.istockphoto.com/id/1351443977/vector/megaphone-with-new-blog-post-speech-bubble-banner-loudspeaker-label-for-business-marketing.jpg?s=612x612&w=0&k=20&c=sUqjhCZGosQB80uQI17FTCrSHx5FBmXAOhvmjNoPh5U='
    },
 },
 {timestamps:true}
)
 const Post = new mongoose.model("Post",postScheme);

 export default Post