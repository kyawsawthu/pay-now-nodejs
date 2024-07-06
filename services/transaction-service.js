const Transaction = require("../models/transaction");
const { TransactionStatus } = require("../constants");

async function getTransactionById(id) {
  return await Transaction.findOne({ _id: id });
}

async function transfer(senderId, receiverId, amount, note) {
  const status = TransactionStatus.DONE;
  return await Transaction.create({
    senderId,
    receiverId,
    amount,
    note,
    status,
  });
}

async function request(senderId, receiverId, amount, note) {
  const status = TransactionStatus.PENDING;
  return await Transaction.create({
    senderId,
    receiverId,
    amount,
    note,
    status,
  });
}

async function updateStatus(id, status) {
  return await Transaction.findOneAndUpdate(
    { _id: id },
    { status: status },
    { new: true }
  );
}

module.exports = {
  getTransactionById,
  transfer,
  request,
  updateStatus,
};
