const express = require("express");
const { validateUser } = require("../middleware");
const { catchAsync } = require("../utils/catchAsync");
const User = require("../models/User");
const { hash, compare } = require("bcryptjs");
const ExpressError = require("../utils/ExpressError");
const { sign } = require("jsonwebtoken");

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
    const token = sign(
      { username: newUser.username },
      process.env.AUTH_SECRET,
      { expiresIn: "1h" }
    );
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

    const pwIsValid = await compare(password, user.password);

    if (!pwIsValid) {
      next(new ExpressError("Invalid credentials", 500));
    }

    const token = sign({ username }, process.env.AUTH_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User logged in", token });
  })
);

module.exports = router;
