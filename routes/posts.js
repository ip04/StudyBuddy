const express = require("express");
const {
  uploadPost,
  likePost,
  getAllPosts,
  getFeed,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

//? create post
router.post("/upload", auth, uploadPost);

//? like post
router.post("/:id/like", auth, likePost);

//* get all posts
router.get("/", auth, getAllPosts);

//* get all friend post (feed)
router.get("/feed", auth, getFeed);

//? update post
router.put("/:id/update", auth, updatePost);

//! delete post
router.delete("/:id/delete", auth, deletePost);

module.exports = router;
