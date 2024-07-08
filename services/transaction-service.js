const Transaction = require("../models/transaction");
const { TransactionStatus } = require("../constants");

async function getTransactionById(id) {
  return await Transaction.findById(id);
}

// transactions with status: done
async function getTransactions(userId, limit) {
  return await Transaction.find({
    $or: [{ sender: userId }, { receiver: userId }],
    status: TransactionStatus.DONE,
  })
    .populate("sender")
    .populate("receiver")
    .sort({ date: -1 })
    .limit(limit);
}

// transactions with status != done as a sender
async function getRequestsAsSender(userId) {
  return await Transaction.find({
    sender: userId,
    status: { $ne: TransactionStatus.DONE },
  }).sort({ date: -1 });
}

// transactions with status != done as a receiver
async function getRequestsAsReceiver(userId) {
  return await Transaction.find({
    receiver: userId,
    status: { $ne: TransactionStatus.DONE },
  }).sort({ date: -1 });
}

async function transfer(sender, receiver, amount, note) {
  const status = TransactionStatus.DONE;
  return await Transaction.create({
    sender,
    receiver,
    amount,
    note,
    status,
  });
}

async function request(sender, receiver, amount, note) {
  const status = TransactionStatus.PENDING;
  return await Transaction.create({
    sender,
    receiver,
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
