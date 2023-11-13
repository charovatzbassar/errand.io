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
  catchAsync(async (req, res) => {
    const passwordHash = await hash(req.body.password, 12);
    const newUser = new User({
      ...req.body,
      password: passwordHash,
    });
    await newUser.save();
    const authToken = createJSONToken(newUser.username);
    res
      .status(201)
      .json({ message: "User registered.", user: newUser, token: authToken });
  })
);

router.post(
  "/login",
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const pwIsValid = await isValidPassword(password, user.password);

    if (pwIsValid) {
      const token = createJSONToken(username);
      res.json({ message: "User logged in", token });
    }

    next(new ExpressError("Authentication failed", 500));
  })
);

module.exports = router;
