const express = require("express");
const auth = require("../middlewares/authMiddleware");
const {
  createGroup,
  getAllGroups,
  joinGroup,
  leaveGroup,
  deleteGroup,
} = require("../controllers/groupController");

const router = express.Router();

//? create group
router.post("/create", auth, createGroup);

//* get all groups
router.get("/", auth, getAllGroups);

//? join group
router.post("/:id/join", auth, joinGroup);

//? leave group
router.post("/:id/leave", auth, leaveGroup);

//! delete group (admin only)
router.delete("/:id/delete", auth, deleteGroup);

module.exports = router;
