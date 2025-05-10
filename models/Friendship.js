const mongoose = require("mongoose");

const schema = mongoose.Schema;

const FriendshipSchema = new schema({
  requester: { type: schema.Types.ObjectId, ref: "User" },
  recipient: { type: schema.Types.ObjectId, ref: "User" },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Friendship", FriendshipSchema);
