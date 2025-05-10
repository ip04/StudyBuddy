const mongoose = require("mongoose");

const schema = mongoose.Schema;

const GroupSchema = new schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Group", GroupSchema);
