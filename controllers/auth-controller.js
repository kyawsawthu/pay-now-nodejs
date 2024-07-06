const jwt = require("../utils/jwt");
const { AuthError, AppError } = require("../errors");
const { OTPPurpose } = require("../constants");
const userService = require("../services/user-service");
const walletService = require("../services/wallet-service");
const tokenService = require("../services/token-service");
const otpService = require("../services/otp-service");
const authValidation = require("../validations/auth-validation");

async function register(req, res) {
  try {
    const { email } = req.body;
    authValidation.validateRegister(req);
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      throw AuthError.emailAlreadyExists;
    }
    const newUser = await userService.createUser(req);
    await walletService.createWallet(newUser._id);
    res.success(null, "", "Please verify you email.");
  } catch (err) {
    res.fail(err);
  }
}

async function login(req, res) {
  try {
    authValidation.validateLogin(req);
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (user.isVerified === false) {
      throw AuthError.needEmailVerification;
    }
    if (user) {
      const isPasswordCorrect = await user.comparePassword(password);
      if (isPasswordCorrect === false) {
        throw AuthError.incorrectPassword;
      }
    } else {
      throw AuthError.emailDoesNotExist;
    }
    const token = jwt.createToken({ userId: user._id });
    const response = { profile: user.response(), accessToken: token };
    await tokenService.saveActiveToken(user._id, token);
    res.success(response);
  } catch (err) {
    res.fail(err);
  }
}
async function requestOTP(req, res) {
  try {
    const { email, purpose } = req.body;
    authValidation.validateEmail(email);
    if (purpose === OTPPurpose.FORGOT_PASSWORD) {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        throw AuthError.emailDoesNotExist;
      }
      res.success(null, "", "OTP has been sent to your email.");
    }
  } catch (err) {
    res.fail(err);
  }
}

async function verifyOTP(req, res) {
  try {
    const { email, code, purpose } = req.body;
    authValidation.validateEmail(email);
    if (!code) {
      throw AuthError.incorrectOTP;
    }
    if (purpose === OTPPurpose.REGISTER) {
      const user = await userService.getUserByEmail(email);
      if (user.isVerified === true) {
        throw AppError.badRequest("Email already verified.");
      }
      const isCorrect = otpService.verify(code);
      if (isCorrect === false) {
        throw AuthError.incorrectOTP;
      }
      const token = jwt.createToken({ userId: user._id });
      await userService.verifyUser(email);
      await tokenService.saveActiveToken(user._id, token);
      const response = { profile: user.response(), accessToken: token };
      res.success(response);
    } else if (purpose === OTPPurpose.FORGOT_PASSWORD) {
      const user = await userService.getUserByEmail(email);
      if (!user) {
        throw AuthError.emailDoesNotExist;
      }
      const isCorrect = otpService.verify(code);
      if (isCorrect === false) {
        throw AuthError.incorrectOTP;
      }
      res.success();
    } else {
      throw AppError.badRequest("Invalid OTP purpose.");
    }
  } catch (err) {
    res.fail(err);
  }
}

async function profile(req, res) {
  try {
    const user = await userService.getUserById(req.userId);
    res.success(user.response());
  } catch (err) {
    res.fail(err);
  }
}

async function logout(req, res) {
  try {
    const token = tokenService.getBearerToken(req);
    if (!token) {
      throw AuthError.logoutFail;
    }

    const payload = jwt.verifyToken(token);
    const userId = payload.userId;
    const isActive = await tokenService.verifyToken(userId, token);

    if (isActive === false) {
      throw AuthError.logoutFail;
    }
    await tokenService.saveInactiveToken(token);
    res.success();
  } catch (err) {
    res.fail(err);
  }
}

module.exports = {
  register,
  login,
  requestOTP,
  verifyOTP,
  profile,
  logout,
};
