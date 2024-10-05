//authMiddleware.js 
const jwt = require("jsonwebtoken");
const responses = require("../utils/responses");

//Authentication Middleware to check if the user is logged in or not using JWT
const loggedInAuth = (req, res, next) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return responses.UnauthorizedError(res, "No token provided");
  }

  // Extract the token from the Bearer token format
  const token = authHeader.split(" ")[1];

  if (!token) {
    return responses.UnauthorizedError(res, "Token is missing");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return responses.UnauthorizedError(res, "Invalid token");
    }
    req.user = decoded; // Store the decoded token payload in req.user
    next();
  });
};

module.exports = loggedInAuth;
