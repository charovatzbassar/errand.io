const mongoose = require("mongoose");
const TodoGroup = require("../models/TodoGroup");
const Todo = require("../models/Todo");

mongoose
  .connect("mongodb://127.0.0.1:27017/errand-io", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database: " + error);
  });

const mockTodos = [
  {
    title: "Task 1",
    content: "This is the first task.",
    date: new Date("2023-10-16"),
    deadline: new Date("2023-10-20"),
    urgent: true,
    completed: false,
    todoGroup: "652d35d4b8c0357acdc2235a",
  },
  {
    title: "Task 2",
    content: "This is the second task.",
    date: new Date("2023-10-17"),
    deadline: new Date("2023-10-25"),
    urgent: false,
    completed: false,
    todoGroup: "652d35d4b8c0357acdc2235a",
  },
  {
    title: "Task 3",
    content: "This is the third task.",
    date: new Date("2023-10-18"),
    deadline: new Date("2023-10-19"),
    urgent: true,
    completed: true,
    todoGroup: "652d35d4b8c0357acdc2235a",
  },
  {
    title: "Task 1",
    content: "This is the first task.",
    date: new Date("2023-10-16"),
    deadline: new Date("2023-10-20"),
    urgent: true,
    completed: false,
    todoGroup: "652d35d4b8c0357acdc2235b",
  },
  {
    title: "Task 2",
    content: "This is the second task.",
    date: new Date("2023-10-17"),
    deadline: new Date("2023-10-25"),
    urgent: false,
    completed: false,
    todoGroup: "652d35d4b8c0357acdc2235b",
  },
  {
    title: "Task 3",
    content: "This is the third task.",
    date: new Date("2023-10-18"),
    deadline: new Date("2023-10-19"),
    urgent: true,
    completed: true,
    todoGroup: "652d35d4b8c0357acdc2235b",
  },
  {
    title: "Task 1",
    content: "This is the first task.",
    date: new Date("2023-10-16"),
    deadline: new Date("2023-10-20"),
    urgent: true,
    completed: false,
    todoGroup: "652d35d4b8c0357acdc2235c",
  },
  {
    title: "Task 2",
    content: "This is the second task.",
    date: new Date("2023-10-17"),
    deadline: new Date("2023-10-25"),
    urgent: false,
    completed: false,
    todoGroup: "652d35d4b8c0357acdc2235c",
  },
  {
    title: "Task 3",
    content: "This is the third task.",
    date: new Date("2023-10-18"),
    deadline: new Date("2023-10-19"),
    urgent: true,
    completed: true,
    todoGroup: "652d35d4b8c0357acdc2235c",
  },
];

// TodoGroup.insertMany([
//   { title: "Group 1" },
//   { title: "Group 2" },
//   { title: "Group 3" },
// ]);

// Todo.insertMany(mockTodos);
