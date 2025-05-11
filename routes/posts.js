const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

// create post
router.post("/upload", auth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content)
      return res.status(400).json({ message: "Content is required" });

    const newPost = new Post({
      author: req.user.id,
      content,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

//like post
router.post("/:id/like", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json({ message: "Like status updated", likes: post.likes });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// get all posts
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// get all friend post (feed)
router.get("/feed", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await Post.find({ author: { $in: user.friends } })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

//update post
router.put("/:id/update", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    post.content = req.body.content || post.content;
    await post.save();

    res.json({ message: "Post Updated seccessfully", data: post });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

//delete post
router.delete("/:id/delete", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
