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
    const userId = req.user.id;
    const group = await Group.findById(req.params.id);

    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.members.includes(userId))
      return res.status(400).json({ message: "Not a member of the group" });

    // Remove user from members/admins
    group.members = group.members.filter((id) => id.toString() !== userId);
    group.admins = group.admins.filter((id) => id.toString() !== userId);

    // Handle if user was the creator
    if (group.createdBy.toString() === userId) {
      if (group.admins.length > 0) {
        // Transfer ownership to another admin
        group.createdBy = group.admins[0];
      } else if (group.members.length > 0) {
        // Transfer to member if no admins
        const newAdmin = group.members[0];
        group.createdBy = newAdmin;
        group.admins.push(newAdmin);
      } else {
        // No members left — delete the group
        await group.deleteOne();
        return res.json({ message: "Group deleted as no members remain" });
      }
    }

    await group.save();
    res.json({ message: "Left group successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
