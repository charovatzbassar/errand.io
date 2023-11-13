const { sign, verify } = require("jsonwebtoken");
const { compare } = require("bcryptjs");

module.exports.createJSONToken = (email) => {
  return sign({ email }, process.env.AUTH_SECRET, { expiresIn: "1h" });
};

module.exports.validateJSONToken = (token) => {
  return verify(token, process.env.AUTH_SECRET);
};

module.exports.isValidPassword = (password, storedPassword) => {
  return compare(password, storedPassword);
};
