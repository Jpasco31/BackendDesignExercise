//userModel.js
const fs = require("fs");
const path = require("path");

// Path to the users.json file
const userDataPath = path.join(__dirname, "../data/users.json");
let users = [];

// Load users from users.json into memory
try {
  const data = fs.readFileSync(userDataPath, "utf8");
  users = JSON.parse(data);
} catch (err) {
  console.error("Error reading user data:", err);
}

// User model with basic CRUD operations
const User = {
  // Get all users
  findAll: () => {
    return Promise.resolve(users);
  },
  // Find user by ID
  findUserById: (id) => {
    const user = users.find((user) => user.id === id);
    return Promise.resolve(user);
  },
  // Find user by username
  findUserByUsername: (username) => {
    const user = users.find((user) => user.username === username);
    return Promise.resolve(user);
  },
  // Create a new user
  createNewUser: (newUser) => {
    const existingUser = users.find(
      (user) => user.username === newUser.username
    );
    // Check if the username already exists
    if (existingUser) {
      return Promise.reject(new Error("Username already exists"));
    }
    // Assign a new ID to the user by incrementing the last user's ID
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    return Promise.resolve(newUser);
  },
};

module.exports = User;
