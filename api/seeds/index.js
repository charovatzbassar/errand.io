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

// const mockTodos = [
//   {
//     title: "Task 1",
//     content: "This is the first task.",
//     date: new Date("2023-10-16"),
//     deadline: new Date("2023-10-20"),
//     urgent: true,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253115",
//   },
//   {
//     title: "Task 2",
//     content: "This is the second task.",
//     date: new Date("2023-10-17"),
//     deadline: new Date("2023-10-25"),
//     urgent: false,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253115",
//   },
//   {
//     title: "Task 3",
//     content: "This is the third task.",
//     date: new Date("2023-10-18"),
//     deadline: new Date("2023-10-19"),
//     urgent: true,
//     completed: true,
//     todoGroup: "657e12e44eb65a4bbe253115",
//   },
//   {
//     title: "Task 1",
//     content: "This is the first task.",
//     date: new Date("2023-10-16"),
//     deadline: new Date("2023-10-20"),
//     urgent: true,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253116",
//   },
//   {
//     title: "Task 2",
//     content: "This is the second task.",
//     date: new Date("2023-10-17"),
//     deadline: new Date("2023-10-25"),
//     urgent: false,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253116",
//   },
//   {
//     title: "Task 3",
//     content: "This is the third task.",
//     date: new Date("2023-10-18"),
//     deadline: new Date("2023-10-19"),
//     urgent: true,
//     completed: true,
//     todoGroup: "657e12e44eb65a4bbe253116",
//   },
//   {
//     title: "Task 1",
//     content: "This is the first task.",
//     date: new Date("2023-10-16"),
//     deadline: new Date("2023-10-20"),
//     urgent: true,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253117",
//   },
//   {
//     title: "Task 2",
//     content: "This is the second task.",
//     date: new Date("2023-10-17"),
//     deadline: new Date("2023-10-25"),
//     urgent: false,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253117",
//   },
//   {
//     title: "Task 3",
//     content: "This is the third task.",
//     date: new Date("2023-10-18"),
//     deadline: new Date("2023-10-19"),
//     urgent: true,
//     completed: true,
//     todoGroup: "657e12e44eb65a4bbe253117",
//   },
//   {
//     title: "Task 1",
//     content: "This is the first task.",
//     date: new Date("2023-10-16"),
//     deadline: new Date("2023-10-20"),
//     urgent: true,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253118",
//   },
//   {
//     title: "Task 2",
//     content: "This is the second task.",
//     date: new Date("2023-10-17"),
//     deadline: new Date("2023-10-25"),
//     urgent: false,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253118",
//   },
//   {
//     title: "Task 3",
//     content: "This is the third task.",
//     date: new Date("2023-10-18"),
//     deadline: new Date("2023-10-19"),
//     urgent: true,
//     completed: true,
//     todoGroup: "657e12e44eb65a4bbe253118",
//   },
//   {
//     title: "Task 1",
//     content: "This is the first task.",
//     date: new Date("2023-10-16"),
//     deadline: new Date("2023-10-20"),
//     urgent: true,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253119",
//   },
//   {
//     title: "Task 2",
//     content: "This is the second task.",
//     date: new Date("2023-10-17"),
//     deadline: new Date("2023-10-25"),
//     urgent: false,
//     completed: false,
//     todoGroup: "657e12e44eb65a4bbe253119",
//   },
//   {
//     title: "Task 3",
//     content: "This is the third task.",
//     date: new Date("2023-10-18"),
//     deadline: new Date("2023-10-19"),
//     urgent: true,
//     completed: true,
//     todoGroup: "657e12e44eb65a4bbe253119",
//   },
// ];
// Todo.insertMany(mockTodos);

// TodoGroup.insertMany([
//   { title: "Group 1", user: "657e066979b136465b6774c0" },
//   { title: "Group 2", user: "657e066979b136465b6774c0" },
//   { title: "Group 3", user: "657e12b14eedb35143911ad8" },
//   { title: "Group 4", user: "657e12b14eedb35143911ad8" },
//   { title: "Group 5", user: "657e12b14eedb35143911ad8" },
// ]);
