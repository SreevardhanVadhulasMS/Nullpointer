import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  addReaction,
  addComment,
} from "../controllers/post.controller.js";

const router = express.Router();

// GET  /api/posts          → all posts
// POST /api/posts          → create post
router.get("/",  auth, getPosts);
router.post("/", auth, createPost);

// PUT    /api/posts/:id      → edit post (owner only)
// DELETE /api/posts/:id      → delete post (owner only)
router.put("/:id",    auth, updatePost);
router.delete("/:id", auth, deletePost);

// POST /api/posts/:id/react    → add emoji reaction
// POST /api/posts/:id/comment  → add comment
router.post("/:id/react",   auth, addReaction);
router.post("/:id/comment", auth, addComment);

export default router;