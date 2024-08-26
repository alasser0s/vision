import mongoose from 'mongoose';
import Post from '../modules/post.js';
import { errorhandler } from '../utils/error.js';

export const create = async (req, res, next) => {
    if (!req.user.IsAdmin) {
        return next(errorhandler(403, 'You are not allowed to create a post'));
    }
if (!req.body.title || !req.body.content || !req.body.price) {
        return next(errorhandler(400, 'Please provide all required fields'));
    }   
    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9ا-ي]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
}
export const getpost = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        console.log('Querying posts for userId:', req.query.userId);

        const posts = await Post.find({
            ...(req.query.userId && { userId: new mongoose.Types.ObjectId(req.query.userId) }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.postId && { _id: req.query.postId }),
            ...(req.query.price && { price: req.query.price }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalposts = await Post.countDocuments();
        const now = new Date();
        const OneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
        );

        const lasttMonthPosts = await Post.countDocuments({
            createdAt: { $gte: OneMonthAgo },
        });

        res.status(200).json({ posts, totalposts, lasttMonthPosts });
    } catch (error) {
        next(error);
    }
};

export const deletepost = async (req,res,next)=>{
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json('the post has been deleted')
    } catch (error) {
        next(error)
    }
} 
export const updatepost = async (req,res,next)=>{
try {
    const updateroute =await Post.findByIdAndUpdate(
        req.params.postId,{
            $set:{
                title:req.body.title,
                content:req.body.content,
                category:req.body.category,
                images:req.body.images,
                price:req.body.price,
            }
        },{new:true}
    )
    res.status(200).json(updateroute)
} catch (error) {
    next(error)
}
} 