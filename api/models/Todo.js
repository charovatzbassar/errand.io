const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  urgent: {
    type: Boolean,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  todoGroup: {
    type: Schema.Types.ObjectId,
    ref: "TodoGroup",
    required: true,
  },
});

todoSchema.statics.findByIdAndToggle = async function (id) {
  const foundTodo = await this.findById(id);
  foundTodo.completed = !foundTodo.completed;
  await foundTodo.save();
  return foundTodo;
};

module.exports = model("Todo", todoSchema);
