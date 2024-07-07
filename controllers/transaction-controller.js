const { TransactionType } = require("../constants");
const transactionService = require("../services/transaction-service");

const recentLimit = 5;

function mapTransactions(userId, transactions) {
  return transactions.map(function (e) {
    let type;
    if (e.senderId == userId) {
      type = TransactionType.OUT;
    } else if (e.receiverId == userId) {
      type = TransactionType.IN;
    }
    var response = e.response();
    response.type = type;
    return response;
  });
}

async function getRecentTransactions(req, res) {
  try {
    const transactions = await transactionService.getTransactions(
      req.userId,
      recentLimit
    );
    if (transactions) {
      const response = mapTransactions(req.userId, transactions);
      res.success(response);
    } else {
      res.success([]);
    }
  } catch (err) {
    res.fail(err);
  }
}

async function getAllTransactions(req, res) {
  try {
    const transactions = await transactionService.getTransactions(req.userId);
    if (transactions) {
      const response = mapTransactions(req.userId, transactions);
      res.success(response);
    } else {
      res.success([]);
    }
  } catch (err) {
    res.fail(err);
  }
}

async function getRequestsAsSender(req, res) {
  try {
    const transactions = await transactionService.getRequestsAsSender(
      req.userId
    );
    if (transactions) {
      const response = mapTransactions(req.userId, transactions);
      res.success(response);
    } else {
      res.success([]);
    }
  } catch (err) {
    res.fail(err);
  }
}

async function getRequestsAsReceiver(req, res) {
  try {
    const transactions = await transactionService.getRequestsAsReceiver(
      req.userId
    );
    if (transactions) {
      const response = mapTransactions(req.userId, transactions);
      res.success(response);
    } else {
      res.success([]);
    }
  } catch (err) {
    res.fail(err);
  }
}

module.exports = {
  getRecentTransactions,
  getAllTransactions,
  getRequestsAsSender,
  getRequestsAsReceiver,
};
