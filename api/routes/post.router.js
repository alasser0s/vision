import express from "express";
import { create, deletepost, getpost, updatepost } from "../controllers/post.control.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router()

router.post('/create',verifyToken,create)
router.get('/getpost',getpost)
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)
router.put('/updatepost/:postId/:userId',verifyToken,updatepost)
export default router