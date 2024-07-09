const { AuthError } = require("../errors");

function validateName(name) {
  if (!name) {
    throw AuthError.invalidUserName;
  }
}

function validateMobileNumber(mobileNumber) {
  const mobileNumberRegex = /^\d{10}$/;
  if (!mobileNumber || !mobileNumberRegex.test(mobileNumber)) {
    throw AuthError.invalidMobileNumber;
  }
}

function validatePassword(password) {
  const passwordMinLength = 8;
  if (!password || password.length < passwordMinLength) {
    throw AuthError.invalidPassword;
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
