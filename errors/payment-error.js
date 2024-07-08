const AppError = require("./app-error");
const ErrorCode = require("./error-codes");

const paymentCardAlreadyExists = new AppError(
  200,
  ErrorCode.paymentCardAlreadyExists,
  "Payment Card already exists with this card number."
);

module.exports = {
  paymentCardAlreadyExists,
};
