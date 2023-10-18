const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.todoGroupSchema = Joi.object({
  title: Joi.string()
    .required()
    .escapeHTML()
    .messages({ "any.required": "Group title is required!" }),
}).required();

module.exports.todoSchema = Joi.object({
  title: Joi.string()
    .required()
    .escapeHTML()
    .messages({ "any.required": "Todo title is required!" }),
  content: Joi.string().escapeHTML(),
  urgent: Joi.boolean()
    .required()
    .messages({ "any.required": "Urgent field is required!" }),

  deadline: Joi.date()
    .min(new Date())
    .messages({ "date.min": "Deadline cannot be in the past!" }),
}).required();
