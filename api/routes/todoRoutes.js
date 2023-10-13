const express = require("express");
const TodoGroup = require("../models/TodoGroup");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/", async (req, res) => {
  const todoGroups = await TodoGroup.find({});
  res.json(todoGroups);
});

router.post("/", async (req, res) => {
    
});

router.get("/:groupId", async (req, res) => {
  const { groupId } = req.params;
  const todos = await Todo.find({ todoGroup: groupId });
  res.json(todos);
});

router.get("/:groupId/:todoId", async (req, res) => {
  const { groupId, todoId } = req.params;
  const todo = await Todo.find({ _id: todoId, todoGroup: groupId });
  res.json(todo);
});

module.exports = router;
