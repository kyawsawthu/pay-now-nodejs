const Transaction = require("../models/transaction");
const { TransactionStatus } = require("../constants");

async function getTransactionById(id) {
  return await Transaction.findOne({ _id: id });
}

// transactions with status: done
async function getTransactions(userId, limit) {
  return await Transaction.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
    status: TransactionStatus.DONE,
  })
    .sort({ date: -1 })
    .limit(limit);
}

// transactions with status != done as a sender
async function getRequestsAsSender(userId) {
  return await Transaction.find({
    senderId: userId,
    status: { $ne: TransactionStatus.DONE },
  }).sort({ date: -1 });
}

// transactions with status != done as a receiver
async function getRequestsAsReceiver(userId) {
  return await Transaction.find({
    receiverId: userId,
    status: { $ne: TransactionStatus.DONE },
  }).sort({ date: -1 });
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
  getTransactions,
  getRequestsAsSender,
  getRequestsAsReceiver,
  transfer,
  request,
  updateStatus,
};
