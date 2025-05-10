const express = require("express");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

//* get current user info
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//* get user by id
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

//? update current user
router.put("/update", auth, async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//? change password
router.put("/change-password", auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//! delete current user
router.delete("/delete", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
