const express = require("express");
const auth = require("../middlewares/authMiddleware");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/debug-friends", auth, (req, res) => {
  console.log("🚀 Reached test debug route");
  console.log(mongoose.models);
  res.json({ message: "Debug route working", user: req.user });
});

module.exports = router;
