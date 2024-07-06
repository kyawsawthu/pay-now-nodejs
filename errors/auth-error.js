const AppError = require("./app-error");
const ErrorCode = require("./error-codes");

const invalidEmail = new AppError(
  200,
  ErrorCode.invalidEmail,
  "Invalid email address."
);

const emailAlreadyExists = new AppError(
  200,
  ErrorCode.emailAlreadyExists,
  "This email is already registered. Please try a different email or log in."
);

const emailDoesNotExist = new AppError(
  200,
  ErrorCode.emailDoesNotExist,
  "There is no account registered with this email."
);

const incorrectPassword = new AppError(
  200,
  ErrorCode.incorrectPassword,
  "Incorrect password. Please double-check and try again."
);

const incorrectOTP = new AppError(
  200,
  ErrorCode.incorrectOTP,
  "Incorrect OTP."
);

const needEmailVerification = new AppError(
  200,
  ErrorCode.needEmailVerification,
  "Please verify your email."
);
const unauthenticated = new AppError(401, "401", "Invalid access token.");
const tokenExpired = new AppError(401, "401", "Token expired.");

const logoutFail = new AppError(
  401,
  "401",
  "Logout failed. Invalid access token."
);

module.exports = {
  invalidEmail,
  emailAlreadyExists,
  emailDoesNotExist,
  incorrectPassword,
  incorrectOTP,
  needEmailVerification,
  unauthenticated,
  tokenExpired,
  logoutFail,
};
