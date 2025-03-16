const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const paymentController = require("../controllers/payment-card-controller");

const router = Router();

router.get("/cards", authenticate, paymentController.cards);
router.post("/add-card", authenticate, paymentController.addCard);
router.post("/update-card", authenticate, paymentController.updateCard);
router.post("/delete-card", authenticate, paymentController.deleteCard);

module.exports = router;
