const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
  balance: {
    type: String,
    required: true,
    default: "0.00",
  },
  updatedAt: Date,
});

walletSchema.pre("save", function (next) {
  this.balance = parseFloat(this.balance).toFixed(2);
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("wallet", walletSchema);
