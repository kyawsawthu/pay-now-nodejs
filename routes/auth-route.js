const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const authController = require("../controllers/auth-controller");

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/request-otp", authController.requestOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/logout", authController.logout);

module.exports = router;
