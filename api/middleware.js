const {
  todoSchema,
  todoGroupSchema,
  userSchema,
} = require("./validationSchemas");
const ExpressError = require("./utils/ExpressError.js");
const { verify } = require("jsonwebtoken");

module.exports.validateTodoGroup = async (req, res, next) => {
  const { error } = todoGroupSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    next(new ExpressError(msg, 400));
  } else {
    next();
  }
};

module.exports.validateTodo = async (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    next(new ExpressError(msg, 400));
  } else {
    next();
  }
};

module.exports.validateUser = async (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    next(new ExpressError(msg, 400));
  } else {
    next();
  }
};

module.exports.checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (!req.headers.authorization) {
    return next(new ExpressError("Not authenticated.", 401));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    return next(new ExpressError("Not authenticated.", 401));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = verify(
      authToken,
      process.env.AUTH_SECRET,
      (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }

        req.user = user;
      }
    );
    req.token = validatedToken;
  } catch (error) {
    return next(new ExpressError("Not authenticated.", 401));
  }
  next();
};
