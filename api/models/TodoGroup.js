const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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

module.exports = model("TodoGroup", todoGroupSchema);
