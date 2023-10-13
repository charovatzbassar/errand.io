const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const todoGroupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = model("TodoGroup", todoGroupSchema);
