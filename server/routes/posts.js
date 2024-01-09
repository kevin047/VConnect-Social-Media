import express from "express";
import {getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import { verifyToken } from "../middleware/authorization/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:id/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

export default router;