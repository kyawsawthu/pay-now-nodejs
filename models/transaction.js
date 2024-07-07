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
    default: Date.now,
  },
});

transactionSchema.pre("save", async function (next) {
  this.amount = parseFloat(this.amount).toFixed(2);
  this.date = Date.now;
  next();
});

transactionSchema.methods.response = function () {
  return {
    id: this._id,
    amount: this.amount,
    status: this.status,
    note: this.note || null,
    date: this.date,
  };
};

module.exports = mongoose.model("transaction", transactionSchema);
