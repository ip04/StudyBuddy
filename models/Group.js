const mongoose = require("mongoose");

const schema = mongoose.Schema;

const GroupSchema = new schema({
  name: { type: String, required: true },
  description: String,
  isClosed: { type: Boolean, default: false },
  admins: [{ type: schema.Types.ObjectId, ref: "User" }],
  members: [{ type: schema.Types.ObjectId, ref: "User" }],
  modifiers: [{ type: schema.Types.ObjectId, ref: "User" }],
  joinRequests: [{ type: schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", GroupSchema);
