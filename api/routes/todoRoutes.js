const express = require("express");
const TodoGroup = require("../models/TodoGroup");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/", async (req, res) => {
  const todoGroups = await TodoGroup.find({});
  res.json(todoGroups);
});

router.post("/", async (req, res) => {
  const newTodoGroup = new TodoGroup({ title: req.body.title });
  await newTodoGroup.save();
  res.json(newTodoGroup);
});

router.put("/:groupId", async (req, res) => {
  const { groupId } = req.params;

  const todoGroup = await TodoGroup.findByIdAndUpdate(groupId, {
    title: req.body.title,
  });

  res.json(todoGroup);
});

router.delete("/:groupId", async (req, res) => {
  const { groupId } = req.params;
  await Todo.deleteMany({ todoGroup: groupId });
  await TodoGroup.findByIdAndDelete(groupId);
  res.redirect("/todos");
});

router.get("/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const todos = await Todo.find({ todoGroup: groupId });
  res.json(todos);
});

router.post("/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const newTodo = new Todo({
    ...req.body,
    date: new Date(),
    completed: false,
    todoGroup: groupId,
  });

  await newTodo.save();

  res.json(newTodo);
});

router.put("/:groupId/:todoId", async (req, res) => {
  const { groupId, todoId } = req.params;
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, todoGroup: groupId },
    { ...req.body, date: new Date() }
  );
  res.json(todo);
});

router.delete("/:groupId/:todoId", async (req, res) => {
  const { groupId, todoId } = req.params;
  const todo = await Todo.findOneAndDelete({ _id: todoId, todoGroup: groupId });
  res.json(todo);
});

router.get("/:groupId/:todoId", async (req, res) => {
  const { groupId, todoId } = req.params;
  const todo = await Todo.find({ _id: todoId, todoGroup: groupId });
  res.json(todo);
});

module.exports = router;
