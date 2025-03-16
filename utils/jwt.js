const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function createToken(payload) {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });
  return token;
}

function verifyToken(token) {
  const payload = jwt.verify(token, secret);
  return payload;
}

module.exports = {
  createToken,
  verifyToken,
};

/*
ms('2 days')  // 172800000
ms('1d')      // 86400000
ms('10h')     // 36000000
ms('2.5 hrs') // 9000000
ms('2h')      // 7200000
ms('1m')      // 60000
ms('5s')      // 5000
ms('1y')      // 31557600000
ms('100')     // 100
ms('-3 days') // -259200000
ms('-1h')     // -3600000
ms('-200')    // -200
*/
