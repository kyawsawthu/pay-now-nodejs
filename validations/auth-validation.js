const { AppError } = require("../errors");

function validateName(name) {
  if (!name) {
    throw AppError.badRequest("Username cannot be empty.");
  }
}

function validateMobileNumber(mobileNumber) {
  const mobileNumberRegex = /^\d{10}$/;
  if (!mobileNumber || !mobileNumberRegex.test(mobileNumber)) {
    throw AppError.badRequest("Invalid mobile number.");
  }
}

function validatePassword(password) {
  const passwordMinLength = 8;
  if (!password || password.length < passwordMinLength) {
    throw AppError.badRequest("Password must have at least 8 characters.");
  }
}

function validateRegister(req) {
  const { name, mobileNumber, password } = req.body;
  validateName(name);
  validateMobileNumber(mobileNumber);
  validatePassword(password);
}

function validateLogin(req) {
  const { mobileNumber } = req.body;
  validateMobileNumber(mobileNumber);
}

module.exports = {
  validateRegister,
  validateLogin,
  validateMobileNumber,
};
