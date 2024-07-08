const mongoose = require("mongoose");

const paymentCardSchema = new mongoose.Schema({
  cardNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 16,
    maxLength: 16,
  },
  cardHolderName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
    minlength: 5,
    maxLength: 5,
  },
  cvv: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 3,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

paymentCardSchema.methods.response = function () {
  return {
    id: this._id,
    cardNumber: this.cardNumber,
    cardHolderName: this.cardHolderName,
    expiryDate: this.expiryDate,
    cvv: this.cvv,
  };
};

module.exports = mongoose.model("payment-card", paymentCardSchema);
