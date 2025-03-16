const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const transactionController = require("../controllers/transaction-controller");

const router = Router();

router.get(
  "/recent",
  authenticate,
  transactionController.getRecentTransactions
);
router.get("/history", authenticate, transactionController.getAllTransactions);
router.get(
  "/send-requests",
  authenticate,
  transactionController.getRequestsAsSender
);
router.get(
  "/receive-requests",
  authenticate,
  transactionController.getRequestsAsReceiver
);

module.exports = router;
