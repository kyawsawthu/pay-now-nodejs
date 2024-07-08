require("../utils/number");
const { AppError } = require("../errors");

function validateAmount(amount) {
  const amountRegex = /^(?!0\d)\d*(\.\d{1,2})?$/;

  if (!amountRegex.test(amount) || parseFloat(amount) <= 0) {
    throw AppError.badRequest("Invalid amount.");
  }
}

module.exports = {
  validateAmount,
};
