const express = require("express");
const TodoGroup = require("../models/TodoGroup");
const Todo = require("../models/Todo");
const router = express.Router();
const { catchAsync } = require("../utils/catchAsync");

router
  .route("/")
  .get(async (req, res) => {
    const todoGroups = await TodoGroup.find({});
    res.json(todoGroups);
  })
  .post(async (req, res) => {
    const newTodoGroup = new TodoGroup({ title: req.body.title });
    await newTodoGroup.save();
    res.json(newTodoGroup);
  });

router
  .route("/:groupId")
  .put(async (req, res) => {
    const { groupId } = req.params;

    const todoGroup = await TodoGroup.findByIdAndUpdate(groupId, {
      title: req.body.title,
    });

    res.json(todoGroup);
  })
  .delete(async (req, res) => {
    const { groupId } = req.params;
    await Todo.deleteMany({ todoGroup: groupId });
    await TodoGroup.findByIdAndDelete(groupId);
    res.redirect("/todos");
  })
  .get(async (req, res) => {
    const { groupId } = req.params;
    const todos = await Todo.find({ todoGroup: groupId });
    res.json(todos);
  })
  .post(async (req, res) => {
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

router
  .route("/:groupId/:todoId")
  .put(async (req, res) => {
    const { groupId, todoId } = req.params;
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, todoGroup: groupId },
      { ...req.body, date: new Date() }
    );
    res.json(todo);
  })
  .delete(async (req, res) => {
    const { groupId, todoId } = req.params;
    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      todoGroup: groupId,
    });
    res.json(todo);
  })
  .get(async (req, res) => {
    const { groupId, todoId } = req.params;
    const todo = await Todo.find({ _id: todoId, todoGroup: groupId });
    res.json(todo);
  });

module.exports = router;
