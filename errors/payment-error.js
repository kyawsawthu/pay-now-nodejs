const AppError = require("./app-error");
const ErrorCode = require("./error-codes");

const invalidCardNumber = new AppError(
  200,
  ErrorCode.invalidCardNumber,
  "Invalid card number."
);

const invalidCardHolderName = new AppError(
  200,
  ErrorCode.invalidCardHolderName,
  "Invalid card holder name."
);

const invalidExpiryDate = new AppError(
  200,
  ErrorCode.invalidExpiryDate,
  "Invalid expiry date."
);

const invalidCVV = new AppError(
  200,
  ErrorCode.invalidCVV,
  "Invalid CVV number."
);

const paymentCardAlreadyExists = new AppError(
  200,
  ErrorCode.paymentCardAlreadyExists,
  "Payment Card already exists with this card number."
);

module.exports = {
  invalidCardNumber,
  invalidCardHolderName,
  invalidExpiryDate,
  invalidCVV,
  paymentCardAlreadyExists,
};
