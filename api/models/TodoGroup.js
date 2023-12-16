const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const User = require("./User");

const todoGroupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

todoGroupSchema.statics.findByUser = async function (username) {
  const user = await User.findOne({ username });
  const todoGroups = await this.find({ user: user._id });
  return todoGroups;
};

module.exports = model("TodoGroup", todoGroupSchema);
