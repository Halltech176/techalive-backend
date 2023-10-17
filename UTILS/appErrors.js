class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode || 500; // Default to 500 Internal Server Error
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // 'fail' for client errors, 'error' for server errors
    this.isOperational = true; // Indicates if the error is operational (e.g., not programming errors)

    // Capture the stack trace (excluding the constructor)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
