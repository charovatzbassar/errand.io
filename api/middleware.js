const { todoSchema, todoGroupSchema } = require("./validationSchemas");
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
