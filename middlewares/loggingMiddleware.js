//loggingMiddleware.js

// Create a middleware function that logs the current timestamp, HTTP method, and route being accessed
const loggingMiddleware = (req, res, next) => {
  const currentTime = new Date().toISOString(); // Get current timestamp
  const method = req.method; // Get HTTP method (GET, POST, etc.)
  const route = req.originalUrl; // Get the route being accessed

  console.log(`[${currentTime}] ${method} request to ${route}`);

  // Continue to the next middleware or route handler
  next();
};

module.exports = loggingMiddleware;
