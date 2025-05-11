const Group = require("../models/Group");
const User = require("../models/User");

exports.createGroup = async (req, res) => {
  try {
    const { name, description } = req.body;

    const group = new Group({
      name,
      description,
      members: [req.user.id],
      admins: [req.user.id],
    });

    await group.save();
    res
      .status(201)
      .json({ message: "Group created seccessfully", data: group });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate("members", "username");
    res.json(groups);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.members.includes(req.user.id))
      return res.status(400).json({ message: "Already a member" });

    group.members.push(req.user.id);
    await group.save();
    res.json({ message: "Joined group", data: group });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.members.includes(req.user.id))
      return res.status(400).json({ message: "Not a memeber of the group" });

    group.members = group.members.filter((id) => id.toString() !== req.user.id);
    group.admins = group.admins.filter((id) => id.toString() !== req.user.id);

    await group.save();
    res.json({ message: "Left group" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(req.user.id))
      return res.status(403).json({ message: "Not authorized" });

    await group.deleteOne();
    res.json({ message: "Group deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
