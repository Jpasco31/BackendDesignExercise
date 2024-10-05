//userController.js

require("dotenv").config();
const responses = require("../utils/responses");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

// Joi schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

// Joi schema for user login
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

//Register User Logic
const registerUser = async (req, res) => {
  try {
    // Validate input using Joi schema
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return responses.validationError(res, error.details[0].message);
    }

    const { username, password, email } = req.body;
    const newUser = { username, password, email };
    const createdUser = await User.createNewUser(newUser);
    responses.created(res, createdUser, "User created successfully");
  } catch (error) {
    responses.error(res, error);
  }
};

//Login User with JWT (tokens include user id, username, iat, exp)
const loginUser = async (req, res) => {
  try {
    // Validate input using Joi schema
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return responses.validationError(res, error.details[0].message);
    }

    const { username, password } = req.body;
    const user = await User.findUserByUsername(username);

    if (user && user.password === password) {
      // Get current time in seconds since epoch (Unix time)
      const issuedAt = Math.floor(Date.now() / 1000);
      const expirationTime = issuedAt + 60 * 60; // Token expires in 1 hour

      // Generate the token with exp and iat claims
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          iat: issuedAt,
          exp: expirationTime,
        },
        process.env.JWT_SECRET
      );

      // Return the token in the response
      responses.success(res, { token }, "Login successful");
    } else {
      responses.validationError(res, "Invalid username or password");
    }
  } catch (error) {
    responses.error(res, error);
  }
};

//Get User Profile (requires authentication)
const getUserProfile = async (req, res) => {
  try {
    // Access req.user.username instead of req.username
    const username = req.user.username;
    const user = await User.findUserByUsername(username);
    if (user) {
      responses.success(res, user, "User profile retrieved successfully");
    } else {
      responses.notFound(res, "User not found");
    }
  } catch (error) {
    responses.error(res, error);
  }
};

//Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    responses.success(res, users, "Users retrieved successfully");
  } catch (error) {
    responses.error(res, error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
};
