const express = require("express");
const auth = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// sent friend request
router.post("/:id/send-request", auth, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.json(404).json({ message: "User not found" });

    if (
      targetUser.friendRequests.includes(req.user.id) ||
      targetUser.friends.includes(req.user.id)
    )
      return res.status(400).json({ message: "Already requested or friends" });

    targetUser.friendRequests.push(req.user.id);
    await targetUser.save();
    res.json({ message: "Friend request sent" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// accept friend request
router.post("/:id/accept-request", auth, async (req, res) => {
  try {
    const sender = await User.findById(req.params.id);
    const receiver = await User.findById(req.user.id);

    if (!sender || !receiver)
      return res.status(404).json({ message: "User not found" });

    if (!receiver.friendRequests.includes(sender._id))
      return res
        .status(400)
        .json({ message: "No friend request from this user" });

    receiver.friends.push(sender._id);
    sender.friends.push(receiver._id);

    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== sender._id.toString()
    );

    await receiver.save();
    await sender.save();

    res.json({ message: "Friend request accepted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// decline friend request
router.delete("/:id/decline-request", auth, async (req, res) => {
  try {
    const senderId = req.params.id;
    const receiver = await User.findById(req.user.id);

    if (!receiver) return res.status(404).json({ message: "User not found" });

    if (!receiver.friendRequests.includes(senderId))
      return res
        .json(400)
        .json({ message: "No friend request from this user" });

    receiver.friendRequests = receiver.friendRequests.filter(
      (id) => id.toString() !== senderId
    );

    await receiver.save();
    res.json({ message: "Friend request declined" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

//get friend requests list
router.get("/requests-list", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.friendRequests);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// get friends list
router.get("/friends-list", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.friends);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
