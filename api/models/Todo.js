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

todoSchema.statics.findOneAndToggle = async function (groupId, todoId) {
  const foundTodo = await this.findOne({ _id: todoId, todoGroup: groupId });
  foundTodo.completed = !foundTodo.completed;
  await foundTodo.save();
  return foundTodo;
};

module.exports = model("Todo", todoSchema);
