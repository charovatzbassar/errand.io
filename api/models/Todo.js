const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const TodoGroup = require("./TodoGroup");

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: function () {
      return this.deadline > this.date;
    },
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

todoSchema.statics.findOneAndToggle = async function (
  groupId,
  todoId,
  toggleField
) {
  const foundTodo = await this.findOne({ _id: todoId, todoGroup: groupId });
  foundTodo[toggleField] = !foundTodo[toggleField];
  await foundTodo.save();
  return foundTodo;
};

todoSchema.statics.findByUser = async function (groupId, username) {
  const todoGroup = await TodoGroup.findOneByUser(groupId, username);
  const todos = await this.find({ todoGroup: todoGroup._id });
  return todos;
};

todoSchema.statics.findOneByUser = async function (groupId, todoId, username) {
  const todoGroup = await TodoGroup.findOneByUser(groupId, username);
  const todo = await this.findOne({ _id: todoId, todoGroup: todoGroup._id });
  return todo;
};

todoSchema.statics.findOneByUserAndDelete = async function (
  groupId,
  todoId,
  username
) {
  const todoGroup = await TodoGroup.findOneByUser(groupId, username);
  await this.findOneAndDelete({ _id: todoId, todoGroup: todoGroup._id });
};

module.exports = model("Todo", todoSchema);
