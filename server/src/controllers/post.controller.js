import Post from "../models/Post.js";

// ── GET all posts (newest first) ──────────────────────────────
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── CREATE post ───────────────────────────────────────────────
export const createPost = async (req, res) => {
  try {
    // 1. Guard Clause: Ensure req.user exists from the auth middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user data found" });
    }

    const { content, tag, avatarId } = req.body;

    // 2. Extra safety for authorName to prevent crashes
    const displayName = req.user.name || (req.user.email ? req.user.email.split("@")[0] : "Anonymous");

    const post = await Post.create({
      authorName: displayName,
      authorEmail: req.user.email,
      avatarId: avatarId || "boy",
      content,
      tag: tag || "General",
    });

    res.status(201).json(post);
  } catch (err) {
    // 3. This is where your 500 error was being caught
    res.status(500).json({ message: err.message });
  }
};

// ── UPDATE post content/tag (owner only) ──────────────────────
export const updatePost = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.authorEmail !== req.user.email)
      return res.status(403).json({ message: "Not your post" });

    const { content, tag } = req.body;
    if (content) { 
      post.content = content; 
      post.edited = true; 
    }
    if (tag) post.tag = tag;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── DELETE post (owner only) ──────────────────────────────────
export const deletePost = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.authorEmail !== req.user.email)
      return res.status(403).json({ message: "Not your post" });

    await post.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── ADD reaction ──────────────────────────────────────────────
export const addReaction = async (req, res) => {
  try {
    const { emoji } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Ensure reactions Map exists
    if (!post.reactions) post.reactions = new Map();
    
    const current = post.reactions.get(emoji) || 0;
    post.reactions.set(emoji, current + 1);
    
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ── ADD comment ───────────────────────────────────────────────
export const addComment = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { text, avatarId } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const displayName = req.user.name || (req.user.email ? req.user.email.split("@")[0] : "Anonymous");

    post.comments.push({
      authorName: displayName,
      authorEmail: req.user.email,
      avatarId: avatarId || "boy",
      text,
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};