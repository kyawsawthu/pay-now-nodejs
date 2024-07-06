const bcrypt = require("bcrypt");

async function hash(password) {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
}

async function compare(candidatePassword, password) {
  const isMatch = await bcrypt.compare(candidatePassword, password);
  return isMatch;
}

module.exports = {
  hash,
  compare,
};
