const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.ObjectId;

const transactionSchema = new mongoose.Schema({
  senderId: {
    type: ObjectId,
    required: true,
  },
  receiverId: {
    type: ObjectId,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  note: String,
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

transactionSchema.pre("save", async function (next) {
  this.amount = parseFloat(this.amount).toFixed(2);
  this.date = new Date();
  next();
});

transactionSchema.methods.response = function () {
  return {
    transactionId: this._id,
    amount: this.amount,
    status: this.status,
    note: this.note,
  };
};

module.exports = mongoose.model("transaction", transactionSchema);
