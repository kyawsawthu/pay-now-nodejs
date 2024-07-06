require("../utils/number");
const { WalletError, AppError } = require("../errors");

function validate(req) {
  const { userId, amount } = req.body;
  if (!userId) {
    throw WalletError.invalidUser;
  }
  if (!amount || typeof amount !== "string" || parseFloat(amount) <= 0) {
    throw WalletError.invalidAmount;
  }
  if (Number(amount).countDecimals() > 2) {
    throw AppError.message("Amount must have 2 decimal points.");
  }
}

module.exports = {
  validate,
};
