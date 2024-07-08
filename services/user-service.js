const mongoose = require("mongoose");
const User = require("../models/user");

function createUserId() {
  return new mongoose.Types.ObjectId();
}

async function createUser(req) {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  return user;
}

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function getUserById(userId) {
  return await User.findOne({ _id: userId });
}

async function verifyUser(email) {
  return await User.findOneAndUpdate(
    { email: email },
    { isVerified: true },
    { new: true }
  );
}

async function addPaymentCard(userId, cardId) {
  return await User.findByIdAndUpdate(userId, {
    $push: { paymentCards: cardId },
  });
}

async function deletePaymentCard(userId, cardId) {
  return await User.findByIdAndUpdate(userId, {
    $pull: { paymentCards: cardId },
  });
}

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  verifyUser,
  addPaymentCard,
  deletePaymentCard,
};
