const { PaymentError, AppError } = require("../errors");
const userService = require("../services/user-service");
const paymentService = require("../services/payment-card-service");
const paymentValidation = require("../validations/payment-validation");

async function cards(req, res) {
  try {
    const cards = await paymentService.getAllCards(req.userId);
    const response = cards.map((e) => e.response());
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}

async function addCard(req, res) {
  try {
    paymentValidation.validate(req);
    const { cardNumber } = req.body;
    const existingCard = await paymentService.getCardByNumber(cardNumber);
    if (existingCard) {
      throw PaymentError.paymentCardAlreadyExists;
    }
    const card = await paymentService.createCard(req);
    await userService.addPaymentCard(req.userId, card._id);
    const cards = await paymentService.getAllCards(req.userId);
    const response = cards.map((e) => e.response());
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}

async function updateCard(req, res) {
  try {
    paymentValidation.validate(req);
    await paymentService.updateCard(req);
    const cards = await paymentService.getAllCards(req.userId);
    const response = cards.map((e) => e.response());
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}

async function deleteCard(req, res) {
  try {
    const { id } = req.body;
    await paymentService.deleteCard(id);
    await userService.deletePaymentCard(req.userId, id);
    const cards = await paymentService.getAllCards(req.userId);
    const response = cards.map((e) => e.response());
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}

module.exports = {
  cards,
  addCard,
  updateCard,
  deleteCard,
};
