const { WalletError } = require("../errors");
const Wallet = require("../models/wallet");

async function createWallet(userId) {
  return await Wallet.create({ _id: userId });
}

async function getWalletBalance(userId) {
  const wallet = await Wallet.findById(userId);
  return wallet.balance;
}

async function transfer(sender, receiver, amount) {
  const senderWallet = await Wallet.findById(sender);
  const receiverWallet = await Wallet.findById(receiver);
  if (parseFloat(senderWallet.balance) < amount) {
    throw WalletError.insufficientAmount;
  }
  senderWallet.balance = (
    parseFloat(senderWallet.balance) - parseFloat(amount)
  ).toFixed(2);
  receiverWallet.balance = (
    parseFloat(receiverWallet.balance) + parseFloat(amount)
  ).toFixed(2);
  await senderWallet.save();
  await receiverWallet.save();
}

module.exports = {
  createWallet,
  getWalletBalance,
  transfer,
};
