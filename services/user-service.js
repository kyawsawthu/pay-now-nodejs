const mongoose = require("mongoose");
const User = require("../models/user");

async function createUser(req) {
  const { name, mobileNumber, password } = req.body;
  const user = await User.create({ name, mobileNumber, password });
  return user;
}

async function getUserById(userId) {
  return await User.findById(userId);
}

async function getUserByMobileNumber(mobileNumber) {
  return await User.findOne({ mobileNumber });
}

async function verifyUser(mobileNumber) {
  return await User.findOneAndUpdate(
    { mobileNumber: mobileNumber },
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
  getUserByMobileNumber,
  createUser,
  verifyUser,
  addPaymentCard,
  deletePaymentCard,
};
