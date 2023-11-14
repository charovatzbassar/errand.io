const express = require("express");
const { validateUser } = require("../middleware");
const { catchAsync } = require("../utils/catchAsync");
const User = require("../models/User");
const { isValidPassword, createJSONToken } = require("../utils/auth");
const { hash } = require("bcryptjs");
const ExpressError = require("../utils/ExpressError");

const router = express.Router();

router.post(
  "/register",
  validateUser,
  catchAsync(async (req, res, next) => {
    const passwordHash = await hash(req.body.password, 12);
    const newUser = new User({
      ...req.body,
      password: passwordHash,
    });

    const userInDB = await User.findOne({ username: newUser.username });

    if (userInDB) {
      next(new ExpressError("User already registered", 401));
    }

    await newUser.save();
    const token = createJSONToken(newUser.username);
    res.status(201).json({ message: "User registered.", user: newUser, token });
  })
);

router.post(
  "/login",
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      next(new ExpressError("Invalid credentials", 500));
    }

    const pwIsValid = await isValidPassword(password, user.password);

    if (pwIsValid) {
      const token = createJSONToken(username);
      res.json({ message: "User logged in", token });
      return;
    }

    next(new ExpressError("Invalid credentials", 500));
  })
);

module.exports = router;
