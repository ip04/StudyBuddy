const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  getFriendsList,
  getFriendRequestsList,
  declineFriendRequest,
  acceptFriendRequest,
  sendFriendRequest,
} = require("../controllers/friendController");

const router = express.Router();

// send friend request
router.post("/:id/send-request", auth, sendFriendRequest);

// accept friend request
router.post("/:id/accept-request", auth, acceptFriendRequest);

// decline friend request
router.delete("/:id/decline-request", auth, declineFriendRequest);

//get friend requests list
router.get("/requests-list", auth, getFriendRequestsList);

// get friends list
router.get("/friends-list", auth, getFriendsList);

module.exports = router;
