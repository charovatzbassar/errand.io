const express = require("express");
const TodoGroup = require("../models/TodoGroup");
const Todo = require("../models/Todo");
const User = require("../models/User");
const { catchAsync } = require("../utils/catchAsync");
const {
  validateTodo,
  validateTodoGroup,
} = require("../utils/validationMiddleware");
const checkAuth = require("../utils/checkAuth");
const ExpressError = require("../utils/ExpressError");

const router = express.Router();

router
  .route("/")
  .get(
    checkAuth,
    catchAsync(async (req, res) => {
      const user = await User.findOne({ username: req.user.username });
      const todoGroups = await TodoGroup.find({ user: user._id });
      res.json(todoGroups);
    })
  )
  .post(
    validateTodoGroup,
    catchAsync(async (req, res) => {
      const newTodoGroup = new TodoGroup({ title: req.body.title });
      await newTodoGroup.save();
      res.json(newTodoGroup);
    })
  );

router
  .route("/:groupId")
  .get(
    checkAuth,
    catchAsync(async (req, res) => {
      const { groupId } = req.params;
      const user = await User.findOne({ username: req.user.username });
      const todoGroup = await TodoGroup.findOne({
        _id: groupId,
        user: user._id,
      });
      const todos = await Todo.find({ todoGroup: todoGroup._id });
      res.json(todos);
    })
  )
  .post(
    validateTodo,
    catchAsync(async (req, res) => {
      const { groupId } = req.params;
      const newTodo = new Todo({
        ...req.body,
        date: new Date(),
        completed: false,
        todoGroup: groupId,
      });

      await newTodo.save();

      res.json(newTodo);
    })
  )
  .put(
    validateTodoGroup,
    catchAsync(async (req, res) => {
      const { groupId } = req.params;

      const todoGroup = await TodoGroup.findByIdAndUpdate(groupId, {
        title: req.body.title,
      });

      res.json(todoGroup);
    })
  )
  .delete(
    catchAsync(async (req, res) => {
      const { groupId } = req.params;
      await Todo.deleteMany({ todoGroup: groupId });
      const todoGroup = await TodoGroup.findByIdAndDelete(groupId);
      res.json(todoGroup);
    })
  );

router.get(
  "/:groupId/data",
  checkAuth,
  catchAsync(async (req, res) => {
    const { groupId } = req.params;
    const user = await User.findOne({ username: req.user.username });
    const todoGroup = await TodoGroup.findOne({ _id: groupId, user: user._id });
    res.json(todoGroup);
  })
);

router
  .route("/:groupId/:todoId")
  .get(
    checkAuth,
    catchAsync(async (req, res) => {
      const { groupId, todoId } = req.params;
      const user = await User.findOne({ username: req.user.username });
      const todoGroup = await TodoGroup.findOne({
        _id: groupId,
        user: user._id,
      });
      const todo = await Todo.findOne({
        _id: todoId,
        todoGroup: todoGroup._id,
      });
      res.json(todo);
    })
  )
  .put(
    validateTodo,
    catchAsync(async (req, res) => {
      const { groupId, todoId } = req.params;
      const todo = await Todo.findOneAndUpdate(
        { _id: todoId, todoGroup: groupId },
        { ...req.body, date: new Date() }
      );
      res.json(todo);
    })
  )
  .delete(
    catchAsync(async (req, res) => {
      const { groupId, todoId } = req.params;
      const todo = await Todo.findOneAndDelete({
        _id: todoId,
        todoGroup: groupId,
      });
      res.json(todo);
    })
  );

router.put(
  "/:groupId/:todoId/:attribute",
  catchAsync(async (req, res) => {
    const { groupId, todoId, attribute } = req.params;
    const attributes = ["completed", "urgent"];
    if (!attributes.includes(attribute)) {
      throw new ExpressError("Invalid attribute", 400);
    }

    const todo = await Todo.findOneAndToggle(groupId, todoId, attribute);
    res.json(todo);
  })
);

module.exports = router;
