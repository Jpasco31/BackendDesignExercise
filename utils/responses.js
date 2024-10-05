//responses.js

const responses = {
  // Success Response (200 OK)
  success: (res, data = {}, message = "Operation successful", code = 200) => {
    res.status(code).json({
      status: "success",
      message: message,
      data: data,
      code: code,
    });
  },

  // Resource Created (201 Created)
  created: (res, data = {}, message = "Resource created", code = 201) => {
    res.status(code).json({
      status: "success",
      message: message,
      data: data,
      code: code,
    });
  },

  // Validation Error (400 Bad Request)
  validationError: (
    res,
    message = "Validation error",
    errors = [],
    code = 400
  ) => {
    res.status(code).json({
      status: "error",
      message: message,
      errors: errors, // Optionally pass validation errors
      code: code,
    });
  },

  // Unauthorized Error (401 Unauthorized)
  UnauthorizedError: (res, message = "Unauthorized", code = 401) => {
    res.status(code).json({
      status: "error",
      message: message,
      code: code,
    });
  },

  // Resource Not Found (404 Not Found)
  notFound: (res, message = "Resource not found", code = 404) => {
    res.status(code).json({
      status: "error",
      message: message,
      code: code,
    });
  },

  // Internal Server Error (500 Internal Server Error)
  error: (res, error, code = 500) => {
    let message = "Internal Server Error";
    if (error && error.message) {
      message = error.message;
    }
    res.status(code).json({
      status: "error",
      message: message,
      code: code,
    });
  },
};

module.exports = responses;
