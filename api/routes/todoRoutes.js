const express = require("express");
const TodoGroup = require("../models/TodoGroup");
const Todo = require("../models/Todo");
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
      const todoGroups = await TodoGroup.findByUser(req.user.username);
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
  )
  .get(
    checkAuth,
    catchAsync(async (req, res) => {
      const { groupId } = req.params;
      const todos = await Todo.findByUser(groupId, req.user.username);
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
  );

router.get(
  "/:groupId/data",
  catchAsync(async (req, res) => {
    const { groupId } = req.params;
    const todoGroup = await TodoGroup.findById(groupId);
    res.json(todoGroup);
  })
);

router
  .route("/:groupId/:todoId")
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
    checkAuth,
    catchAsync(async (req, res) => {
      const { groupId, todoId } = req.params;
      const todo = await Todo.findOneByUserAndDelete(
        groupId,
        todoId,
        req.user.username
      );
      res.json(todo);
    })
  )
  .get(
    checkAuth,
    catchAsync(async (req, res) => {
      const { groupId, todoId } = req.params;
      const todo = await Todo.findOneByUser(groupId, todoId, req.user.username);
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
