const { TransactionStatus } = require("../constants");
const userService = require("../services/user-service");
const walletService = require("../services/wallet-service");
const paymentService = require("../services/payment-service");
const transactionService = require("../services/transaction-service");
const transactionValidation = require("../validations/transaction-validation");
const { WalletError, AppError } = require("../errors");

async function balance(req, res) {
  try {
    const wallet = await walletService.getWalletById(req.userId);
    const response = wallet.response();
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}

async function topup(req, res) {
  try {
    const { paymentId, amount } = req.body;
    transactionValidation.validateAmount(amount);
    const paymentCard = await paymentService.getCardById(paymentId);
    if (!paymentCard) {
      throw AppError.badRequest("Invalid payment card.");
    }
    const wallet = await walletService.topup(req.userId, amount);
    const response = wallet.response();
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}

async function transfer(req, res) {
  try {
    const { userId, amount, note } = req.body;
    const user = await userService.getUserById(userId);
    if (!user) {
      throw AppError.badRequest("Invalid receipent.");
    }
    transactionValidation.validateAmount(amount);
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
    const { userId, amount, note } = req.body;
    transactionValidation.validateAmount(amount);
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
      transaction.sender != req.userId ||
      transaction.receiver == req.userId
    ) {
      throw WalletError.transactionFailed;
    }
    await walletService.transfer(
      transaction.sender,
      transaction.receiver,
      transaction.amount
    );
    const status = TransactionStatus.DONE;
    const result = await transactionService.updateStatus(transactionId, status);
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
      transaction.receiver != req.userId ||
      transaction.status !== TransactionStatus.PENDING
    ) {
      throw WalletError.transactionFailed;
    }
    const status = TransactionStatus.CANCELED;
    const result = await transactionService.updateStatus(transactionId, status);
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
      transaction.sender != req.userId ||
      transaction.status !== TransactionStatus.PENDING
    ) {
      throw WalletError.transactionFailed;
    }
    const status = TransactionStatus.DECLINED;
    const result = await transactionService.updateStatus(transactionId, status);
    res.success(result.response());
  } catch (err) {
    res.fail(err);
  }
}

module.exports = {
  balance,
  topup,
  transfer,
  request,
  approve,
  cancel,
  decline,
};
