const baseSchemas = require("../schemas/base");
const authSchemas = require("../schemas/auth");
const accountSchemas = require("../schemas/account");
const walletSchemas = require("../schemas/wallet");
const paymentSchemas = require("../schemas/payment");
const transactionSchemas = require("../schemas/transaction");

const schemas = {
  ...baseSchemas,
  ...authSchemas,
  ...accountSchemas,
  ...walletSchemas,
  ...paymentSchemas,
  ...transactionSchemas,
};

module.exports = schemas;
