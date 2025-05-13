const Group = require("../models/Group");

//TODO: only the group members can read the posts in the group

exports.createGroup = async (req, res) => {
  try {
    const { name, description, isClosed } = req.body;

    const group = new Group({
      name,
      description,
      isClosed: isClosed ?? false,
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

    if (!group.isClosed) {
      group.members.push(req.user.id);
    } else {
      group.joinRequests.push(req.user.id);
    }

    await group.save();
    if (group.members.includes(req.user.id)) {
      res.json({ message: "Joined group", data: group });
    } else {
      res.json({ message: "Waiting for admin approval" });
    }
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelJoinGroupRequest = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (group.members.includes(req.user.id))
      return res.status(400).json({ message: "Already a member" });

    if (!group.joinRequests.includes(req.user.id))
      return res
        .status(400)
        .json({ message: "You have not requested to join this group" });

    group.joinRequests = group.joinRequests.filter(
      (id) => id.toString() !== req.user.id
    );

    await group.save();
    res.json({ message: "Join request canceled" });
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
