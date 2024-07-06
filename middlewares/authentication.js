const jwt = require("../utils/jwt");
const tokenService = require("../services/token-service");
const { AuthError, AppError } = require("../errors");

async function authenticate(req, res, next) {
  try {
    const token = tokenService.getBearerToken(req);
    if (!token) {
      throw AuthError.unauthenticated;
    }
    const payload = jwt.verifyToken(token);
    const userId = payload.userId;
    if (userId) {
      const isActive = await tokenService.verifyToken(userId, token);
      if (isActive === true) {
        req.userId = payload.userId;
        next();
      } else {
        throw AuthError.unauthenticated;
      }
    } else {
      throw AuthError.unauthenticated;
    }
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      res.fail(AuthError.tokenExpired);
    } else {
      res.fail(AuthError.unauthenticated);
    }
  }
}

module.exports = authenticate;
