const mongoose = require("mongoose");

const whitelistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("whitelist", whitelistSchema);
