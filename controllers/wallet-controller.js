const { TransactionStatus } = require("../constants");
const walletService = require("../services/wallet-service");
const transactionService = require("../services/transaction-service");
const transactionValidation = require("../validations/transaction-validation");
const { WalletError, AppError } = require("../errors");

async function balance(req, res) {
  try {
    const balance = await walletService.getWalletBalance(req.userId);
    res.success({ balance: balance });
  } catch (err) {
    res.fail(err);
  }
}

async function transfer(req, res) {
  try {
    transactionValidation.validate(req);
    const { userId, amount, note } = req.body;
    const currentUserId = req.userId;
    if (currentUserId === userId) {
      throw WalletError.transactionFailed;
    }
    await walletService.transfer(currentUserId, userId, amount);
    await transactionService.transfer(currentUserId, userId, amount, note);
    res.success();
  } catch (err) {
    res.fail(err);
  }
}

async function request(req, res) {
  try {
    transactionValidation.validate(req);
    const { userId, amount, note } = req.body;
    const currentUserId = req.userId;
    if (currentUserId === userId) {
      throw WalletError.transactionFailed;
    }
    const result = await transactionService.request(
      userId,
      currentUserId,
      amount,
      note
    );
    res.success(result.response());
  } catch (err) {
    res.fail(err);
  }
}

async function approve(req, res) {
  try {
    const { transactionId } = req.body;
    const transaction = await transactionService.getTransactionById(
      transactionId
    );
    if (!transaction || transaction.status !== TransactionStatus.PENDING) {
      throw WalletError.transactionFailed;
    }
    if (
      transaction.senderId != req.userId ||
      transaction.receiverId == req.userId
    ) {
      throw WalletError.transactionFailed;
    }
    await walletService.transfer(
      transaction.senderId,
      transaction.receiverId,
      transaction.amount
    );
    const result = await transactionService.approve(transactionId);
    res.success(result.response());
  } catch (err) {
    console.log(err);
    res.fail(err);
  }
}

async function cancel(req, res) {
  try {
    const { transactionId } = req.body;
    const transaction = await transactionService.getTransactionById(
      transactionId
    );
    if (
      !transaction ||
      transaction.receiverId != req.userId ||
      transaction.status !== TransactionStatus.PENDING
    ) {
      throw WalletError.transactionFailed;
    }
    const result = await transactionService.cancel(transactionId);
    res.success(result.response());
  } catch (err) {
    res.fail(err);
  }
}

async function decline(req, res) {
  try {
    const { transactionId } = req.body;
    const transaction = await transactionService.getTransactionById(
      transactionId
    );
    if (
      !transaction ||
      transaction.senderId != req.userId ||
      transaction.status !== TransactionStatus.PENDING
    ) {
      throw WalletError.transactionFailed;
    }
    const result = await transactionService.decline(transactionId);
    res.success(result.response());
  } catch (err) {
    res.fail(err);
  }
}

module.exports = {
  balance,
  transfer,
  request,
  approve,
  cancel,
  decline,
};
