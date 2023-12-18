const {
  todoSchema,
  todoGroupSchema,
  userSchema,
} = require("./validationSchemas.js");
const ExpressError = require("./ExpressError.js");

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
