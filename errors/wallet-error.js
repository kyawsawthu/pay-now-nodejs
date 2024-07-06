const AppError = require("./app-error");
const ErrorCode = require("./error-codes");

const invalidUser = new AppError(400, ErrorCode.invalidUser, "Invalid User.");

const invalidAmount = new AppError(
  400,
  ErrorCode.invalidAmount,
  "Invalid Amount."
);

const insufficientAmount = new AppError(
  400,
  ErrorCode.insufficientAmount,
  "Insufficient Amount."
);

const transactionFailed = new AppError(
  400,
  ErrorCode.transactionFailed,
  "Transaction failed."
);

module.exports = {
  invalidUser,
  invalidAmount,
  insufficientAmount,
  transactionFailed,
};
