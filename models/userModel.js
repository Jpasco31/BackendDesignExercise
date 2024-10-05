const fs = require("fs");
const path = require("path");

const userDataPath = path.join(__dirname, "../data/users.json");
let users = [];

// Load users from users.json into memory
try {
  const data = fs.readFileSync(userDataPath, "utf8");
  users = JSON.parse(data);
} catch (err) {
  console.error("Error reading user data:", err);
}

const User = {
  findAll: () => {
    return Promise.resolve(users);
  },
  findUserById: (id) => {
    const user = users.find((user) => user.id === id);
    return Promise.resolve(user);
  },
  findUserByUsername: (username) => {
    const user = users.find((user) => user.username === username);
    return Promise.resolve(user);
  },
  createNewUser: (newUser) => {
    const existingUser = users.find(
      (user) => user.username === newUser.username
    );
    if (existingUser) {
      return Promise.reject(new Error("Username already exists"));
    }

    newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(newUser);
    return Promise.resolve(newUser);
  },
};

module.exports = User;
