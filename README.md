# Node.js Backend Design Exercise - App Dev

## - Jericho C. Pasco

## Description

This is a basic backend application built with Node.js and Express.js. It simulates user registration, login, and profile management using mock models (in-memory arrays or JSON files) as a simulated database. The project demonstrates key functionalities such as authentication, rate limiting, logging, and proper separation of concerns within the structure of a Node.js application.

## Project Structure

Project/
├── app.js
├── routes/
│ └── user.js
├── controllers/
│ └── userController.js
├── models/
│ └── userModel.js
├── middleware/
│ └── authMiddleware.js
│ └── loggingMiddleware.js
│ └── rateLimitMiddleware.js
├── utils/
│ └── responses.js
└── data/
└── users.json

## Install dependencies

```bash
npm install express body-parser jsonwebtoken joi dotenv express-rate-limit nodemon
```

## Set Up Environment Variables:

```bash
JWT_SECRET=your_jwt_secret_key
PORT = 5001 (depends on you)
```

# Run the App

```bash
npm start
```

### Dev (for nodemon)

```bash
npm run dev
```

## Test cases for the APIs

### POST - Test for user registration

```bash
http://localhost:<port>/register
```

```bash
{
"username":"momohirai",
"password":"momohirai123",
"email":"momohirai@gmail.com"
}
```

### POST - Test for Login

```bash
http://localhost:<port>/login
```

```bash
{
"username":"jihyopark",
"password":"jihyopark123"
}
```

### GET - Test for get user profile

```bash
http://localhost:<port>/profile
```

```bash
Header:
Authorization: Bearer <your-jwt-token>
```

### GET - Test for get all users

```bash
http://localhost:<port>/allUsers
```

## Features

- **User Registration**: Allows new users to register by providing a username, password, and email.
- **User Login**: Authenticates users and provides a JWT token for secure access to protected routes.
- **Profile Management**: Retrieves user profile details for authenticated users.
- **Input Validation**: Uses Joi for validating user input in registration and login routes.
- **Token-based Authentication**: Protects the profile route with JWT-based authentication.
- **Logging Middleware**: Logs details of each request, including method, route, and timestamp.
- **Rate Limiting** (Optional): Implement rate limiting for API requests.
