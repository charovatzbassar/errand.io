const {
  todoSchema,
  todoGroupSchema,
  userSchema,
} = require("./validationSchemas");
const { validateJSONToken } = require("./utils/auth");
const ExpressError = require("./utils/ExpressError.js");

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
    console.log("NOT AUTH. AUTH HEADER MISSING.");
    return next(new ExpressError("Not authenticated.", 401));
  }
  const authFragments = req.headers.authorization.split(" ");

  if (authFragments.length !== 2) {
    console.log("NOT AUTH. AUTH HEADER INVALID.");
    return next(new ExpressError("Not authenticated.", 401));
  }
  const authToken = authFragments[1];
  try {
    const validatedToken = validateJSONToken(authToken);
    req.token = validatedToken;
  } catch (error) {
    console.log("NOT AUTH. TOKEN INVALID.");
    return next(new ExpressError("Not authenticated.", 401));
  }
  next();
};
