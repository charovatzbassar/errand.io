const { verify } = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");

module.exports = (req, res, next) => {
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
