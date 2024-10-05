const rateLimit = require("express-rate-limit");

// Create a rate limiter middleware
const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000, // 2 minutes window
  max: 5, // Limit each IP to 100 requests per windowMs
  message: {
    status: "error",
    message:
      "Too many requests from this IP (Max of 5 requests per 30 seconds), please try again after 30 seconds",
    code: 429,
  },
});

module.exports = limiter;
