const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  balance: {
    type: String,
    required: true,
    default: "0.00",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

walletSchema.pre("save", function (next) {
  this.balance = parseFloat(this.balance).toFixed(2);
  this.updatedAt = Date.now;
  next();
});

walletSchema.methods.response = function () {
  return {
    balance: this.balance,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("wallet", walletSchema);
