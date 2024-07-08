const User = require("../models/user");
const PaymentCard = require("../models/payment-card");

async function getCardById(cardId) {
  return await PaymentCard.findById(cardId);
}

async function getCardByNumber(cardNumber) {
  return await PaymentCard.findOne({ cardNumber });
}

async function getAllCards(userId) {
  const user = await User.findById(userId).populate({
    path: "paymentCards",
    options: { sort: { updatedAt: -1 } },
  });
  return user.paymentCards;
}

async function createCard(req) {
  const { cardNumber, cardHolderName, expiryDate, cvv } = req.body;
  return await PaymentCard.create({
    cardNumber,
    cardHolderName,
    expiryDate,
    cvv,
  });
}

async function updateCard(req) {
  const { id, cardNumber, cardHolderName, expiryDate, cvv } = req.body;
  return await PaymentCard.findByIdAndUpdate(
    id,
    {
      cardNumber: cardNumber,
      cardHolderName: cardHolderName,
      expiryDate: expiryDate,
      cvv: cvv,
    },
    { new: true }
  );
}

async function deleteCard(cardId) {
  return await PaymentCard.findByIdAndDelete(cardId);
}

module.exports = {
  getCardById,
  getCardByNumber,
  getAllCards,
  createCard,
  updateCard,
  deleteCard,
};
