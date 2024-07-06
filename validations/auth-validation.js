const { AppError, AuthError } = require("../errors");
const validator = require("validator");

function validateRegister(req) {
  const { name, email, password } = req.body;
  if (!name) {
    throw AppError.badRequest("Username cannot be empty.");
  }
  if (!email || validator.isEmail(email) == false) {
    throw AuthError.invalidEmail;
  }
  if (!password) {
    throw AppError.badRequest("Password cannot be empty.");
  }
  if (validator.isStrongPassword(password, { minLength: 8 }) == false) {
    throw AppError.badRequest("Password is not strong enough.");
  }
}

function validateLogin(req) {
  const { email } = req.body;
  if (!email || validator.isEmail(email) == false) {
    throw AuthError.invalidEmail;
  }
}

function validateEmail(email) {
  if (!email || validator.isEmail(email) == false) {
    throw AuthError.invalidEmail;
  }
}

module.exports = {
  validateRegister,
  validateLogin,
  validateEmail,
};
