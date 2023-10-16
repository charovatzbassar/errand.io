const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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

module.exports = model("Todo", todoSchema);
