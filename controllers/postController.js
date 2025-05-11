const Post = require("../models/Post");
const User = require("../models/User");

exports.uploadPost = async (req, res) => {
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
};

exports.likePost = async (req, res) => {
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
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await Post.find({ author: { $in: user.friends } })
      .populate("author", "username")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updatePost = async (req, res) => {
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
};

exports.deletePost = async (req, res) => {
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
};
