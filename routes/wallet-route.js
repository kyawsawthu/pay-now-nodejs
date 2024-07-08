const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const walletController = require("../controllers/wallet-controller");

const router = Router();

router.get("/balance", authenticate, walletController.balance);
router.post("/topup", authenticate, walletController.topup);
router.post("/transfer", authenticate, walletController.transfer);
router.post("/request", authenticate, walletController.request);
router.post("/request/approve", authenticate, walletController.approve);
router.post("/request/cancel", authenticate, walletController.cancel);
router.post("/request/decline", authenticate, walletController.decline);

module.exports = router;
