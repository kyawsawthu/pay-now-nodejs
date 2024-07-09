const AppError = require("./app-error");
const ErrorCode = require("./error-codes");

const mobileNumberAlreadyExists = new AppError(
  200,
  ErrorCode.mobileNumberAlreadyExists,
  "This mobile number is already registered. Please try a different mobile number or log in."
);

const mobileNumberDoesNotExist = new AppError(
  200,
  ErrorCode.mobileNumberDoesNotExist,
  "There is no account registered with this mobile number."
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

const needMobileNumberVerification = new AppError(
  200,
  ErrorCode.needMobileNumberVerification,
  "Please verify your mobile number."
);

const invalidUserName = new AppError(
  200,
  ErrorCode.invalidUserName,
  "Username cannot be empty."
);

const invalidMobileNumber = new AppError(
  200,
  ErrorCode.invalidMobileNumber,
  "Mobile number must have at least 10 digits."
);

const invalidPassword = new AppError(
  200,
  ErrorCode.invalidPassword,
  "Password must have at least 8 characters."
);

const unauthenticated = new AppError(401, "401", "Invalid access token.");
const tokenExpired = new AppError(401, "401", "Token expired.");

const logoutFail = new AppError(
  401,
  "401",
  "Logout failed. Invalid access token."
);

module.exports = {
  mobileNumberAlreadyExists,
  mobileNumberDoesNotExist,
  incorrectPassword,
  incorrectOTP,
  needMobileNumberVerification,
  invalidUserName,
  invalidMobileNumber,
  invalidPassword,
  unauthenticated,
  tokenExpired,
  logoutFail,
};
