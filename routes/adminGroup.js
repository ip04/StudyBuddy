const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  aprroveJoinRequest,
  declineJoinRequest,
  removeMember,
  promoteToAdmin,
  cancelPromoteToAdmin,
  cancelPromoteToModifier,
  promoteToModifier,
  removePost,
  deleteGroup,
} = require("../controllers/adminController");

const router = express.Router();

// Approves a user's join request to the group - accessible by admins and modifiers
router.post("/:groupId/approve/:userId", auth, aprroveJoinRequest);

// Declines a user's join request to the group – accessible by admins and modifiers
router.post("/:groupId/decline/:userId", auth, declineJoinRequest);

// Removes a member from the group – accessible by admins and modifiers,
// but modifier cannot remove admins or other modifiers
router.delete("/:groupId/remove/:userId", auth, removeMember);

// Deletes a post from the group – accessible by admins and modifiers,
// but modifiers cannot delete posts created by admins or others modifiers
router.delete("/:postId/remove", auth, removePost);

// Promotes a group member to admin – accessible by admins only
router.post("/:groupId/promoteToAdmin/:userId", auth, promoteToAdmin);

// Promotes a group member to modifier – accessible by admins only
router.post("/:groupId/promoteToModifier/:userId", auth, promoteToModifier);

// Cancels an admin promotion – accessible by admins only
router.post(
  "/:groupId/cancelPromoteToAdmin/:userId",
  auth,
  cancelPromoteToAdmin
);

// Cancels a modifier promotion – accessible by admins only
router.post(
  "/:groupId/cancelPromoteToModifier/:userId",
  auth,
  cancelPromoteToModifier
);

//delete group - accessible by admins only
router.delete("/:id/delete", auth, deleteGroup);

module.exports = router;
