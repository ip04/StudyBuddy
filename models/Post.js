const mongoose = require("mongoose");

const schema = mongoose.Schema;

const PostSchema = new schema({
  group: { type: schema.Types.ObjectId, ref: "Group" },
  author: { type: schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
