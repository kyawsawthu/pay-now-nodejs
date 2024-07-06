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

function updateMobileNumber(req) {}

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  verifyUser,
  updateMobileNumber,
};
