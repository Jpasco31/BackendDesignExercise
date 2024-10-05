const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const loggedInAuth = require("../middlewares/authMiddleware");
const loggingMiddleware = require("../middlewares/loggingMiddleware");
const rateLimitMiddleware = require("../middlewares/rateLimitMiddleware");

router.use(loggingMiddleware);

// Apply rate limiting on registration and login routes
router.post("/register", rateLimitMiddleware, userController.registerUser);
router.post("/login", rateLimitMiddleware, userController.loginUser);

// Apply both authentication and rate limiting on the profile route
router.get("/profile", loggedInAuth, rateLimitMiddleware, userController.getUserProfile);

// Optionally apply rate limiting on retrieving all users
router.get("/allUsers", rateLimitMiddleware, userController.getAllUsers);

module.exports = router;
