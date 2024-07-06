const Whitelist = require("../models/token/whitelist");
const Blacklist = require("../models/token/blacklist");

function getBearerToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    return authHeader.split(" ")[1];
  } else {
    return null;
  }
}

async function verifyToken(userId, token) {
  const whitelist = await Whitelist.findOne({ userId });
  return whitelist.token === token;
}

async function saveActiveToken(userId, token) {
  const whitelist = await Whitelist.findOne({ userId });
  if (whitelist) {
    const inactiveToken = whitelist.token;
    whitelist.token = token;
    await whitelist.save();
    if (inactiveToken) {
      await saveInactiveToken(inactiveToken);
    }
  } else {
    await Whitelist.create({ userId, token });
  }
}

async function saveInactiveToken(token) {
  await Whitelist.findOneAndUpdate({ token: token }, { token: "" });
  await Blacklist.create({ token });
}

module.exports = {
  getBearerToken,
  verifyToken,
  saveActiveToken,
  saveInactiveToken,
};
