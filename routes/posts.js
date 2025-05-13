const express = require("express");
const {
  uploadPost,
  likePost,
  getAllPosts,
  getFeed,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
} = require("../controllers/postController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

//? create post
router.post("/upload", auth, uploadPost);

//? like post
router.post("/:id/like", auth, likePost);

//? create comment
router.post("/:id/comment", auth, createComment);

//* get all posts
router.get("/", auth, getAllPosts);

//* get all friend post (feed)
router.get("/feed", auth, getFeed);

//? update post
router.put("/:id/update", auth, updatePost);

//! delete post
router.delete("/:id/delete", auth, deletePost);

//! delete comment
router.delete("/:postId/comments/:commentId", auth, deleteComment);

module.exports = router;
