import express from "express";
import { test, updateUser } from "../controllers/user.control.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test)
router.put('/update:userid' ,verifyToken, updateUser)
export default router