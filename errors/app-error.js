class AppError extends Error {
  constructor(statusCode, code, message) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, AppError);
  }

  static message(message) {
    return new AppError(200, "error", message);
  }

  static badRequest(message) {
    return new AppError(400, "400", message);
  }
}

module.exports = AppError;
