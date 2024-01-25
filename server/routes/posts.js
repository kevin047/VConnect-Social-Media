import express from "express";
import {addComment, getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js"
import { verifyToken } from "../middleware/authorization/auth.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:id/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, addComment);


export default router;