const Group = require("../models/Group");
const Post = require("../models/Post");

//TODO: when admin leave (or delete account) give someone else this rule

// approve\decline join requests
exports.aprroveJoinRequest = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (
      !group.admins.includes(req.user.id) ||
      !group.modifiers.includes(req.user.id)
    ) {
      return res
        .status(403)
        .json({ message: "Only admins or modifiers can perform this action" });
    }

    if (!group.joinRequests.includes(req.params.userId))
      return res
        .status(400)
        .json({ message: "User is not in the join requests list" });

    group.members.push(req.params.userId);

    group.joinRequests = group.joinRequests.filter(
      (id) => id.toString() !== req.params.userId
    );

    await group.save();
    res.json({ message: "The join request approved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.declineJoinRequest = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (
      !group.admins.includes(req.user.id) ||
      !group.modifiers.includes(req.user.id)
    ) {
      return res
        .status(403)
        .json({ message: "Only admins or modifiers can perform this action" });
    }

    if (!group.joinRequests.includes(req.params.userId))
      return res
        .status(400)
        .json({ message: "User is not in the join requests list" });

    group.joinRequests = group.joinRequests.filter(
      (id) => id.toString() !== req.params.userId
    );

    await group.save();
    res.json({ message: "The join request declined" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// remove members or post
exports.removeMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const requesterId = req.user.id;
    const targetId = req.params.userId;

    const isAdmin = group.admins.includes(requesterId);
    const isModifier = group.modifiers.includes(requesterId);

    const targetIsAdmin = group.admins.includes(targetId);
    const targetIsModifier = group.modifiers.includes(targetId);

    if (!isAdmin && !isModifier) {
      return res
        .status(403)
        .json({ message: "Only admins or modifiers can perform this action" });
    }

    if ((targetIsAdmin || targetIsModifier) && !isAdmin) {
      return res
        .status(403)
        .json({ message: "Modifier can't remove admin or other modifier" });
    }

    if (!group.members.includes(targetId))
      return res.status(400).json({ message: "The user not in the group" });

    group.members = group.members.filter(
      (id) => id.toString() !== req.params.userId
    );

    group.modifiers = group.modifiers.filter(
      (id) => id.toString() !== req.params.userId
    );

    await group.save();
    res.json({ message: "Member was removed successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const group = await Group.findById(post.group);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const userId = req.user.id;
    const postAuthorId = post.author.toString();

    const isAdmin = group.admins.includes(userId);
    const isModifier = group.modifiers && group.modifiers.includes(userId);
    const isAuthor = postAuthorId === userId;

    const postAuthorIsAdmin = group.admins.includes(postAuthorId);
    const postAuthorIsModifier =
      group.modifiers && group.modifiers.includes(postAuthorId);

    if (!isAdmin && !isModifier) {
      return res
        .status(403)
        .json({ message: "Only admins or modifiers can perform this action" });
    }

    if (
      isAuthor ||
      isAdmin ||
      (isModifier && !postAuthorIsAdmin && !postAuthorIsModifier)
    ) {
      await post.deleteOne();
      return res.json({ message: "Post deleted successfully" });
    }

    return res
      .status(403)
      .json({ message: "Not authorized to delete this post" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Promotions
exports.promoteToAdmin = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    if (!group.members.includes(req.params.userId))
      return res.status(400).json({ message: "The user not in the group" });

    if (group.admins.includes(req.params.userId))
      return res.status(400).json({ message: "The user already admin" });

    group.admins.push(req.params.userId);
    await group.save();

    res.json({ message: "The user promoted to admin" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelPromoteToAdmin = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    if (!group.members.includes(req.params.userId))
      return res.status(400).json({ message: "The user not in the group" });

    if (!group.admins.includes(req.params.userId))
      return res
        .status(400)
        .json({ message: "The user not in the admins list" });

    group.admins = group.admins.filter(
      (id) => id.toString() !== req.params.userId
    );

    await group.save();
    res.json({ message: "Member was removed from admins successfully" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.promoteToModifier = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    if (!group.members.includes(req.params.userId))
      return res.status(400).json({ message: "The user not in the group" });

    if (group.modifiers.includes(req.params.userId))
      return res.status(400).json({ message: "The user already modifier" });

    group.modifiers.push(req.params.userId);
    await group.save();

    res.json({ message: "The user promoted to modifier" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelPromoteToModifier = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    if (!group.members.includes(req.params.userId))
      return res.status(400).json({ message: "The user not in the group" });

    if (!group.modifiers.includes(req.params.userId))
      return res
        .status(400)
        .json({ message: "The user not in the modifiers list" });

    group.modifiers = group.modifiers.filter(
      (id) => id.toString() !== req.params.userId
    );

    await group.save();
    res.json({ message: "Member was removed from modifiers successfully" });
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

    if (group.createdBy.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Only the group creator can delete the group" });

    await group.deleteOne();
    res.json({ message: "Group deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
