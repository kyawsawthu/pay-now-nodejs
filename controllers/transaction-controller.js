const { TransactionType } = require("../constants");
const transactionService = require("../services/transaction-service");

const recentLimit = 5;

function mapTransactions(userId, transactions) {
  return transactions.map(function (e) {
    let type;
    let user;
    if (e.sender._id == userId) {
      type = TransactionType.OUT;
      user = e.receiver;
    } else if (e.receiver._id == userId) {
      type = TransactionType.IN;
      user = e.sender;
    }
    var response = e.response();
    response.type = type;
    response.user = user.response();
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
    console.log(transactions);
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
