const { Router } = require("express");
const authController = require("../controllers/auth-controller");

// Swagger Docs
/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - mobileNumber
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         mobileNumber:
 *           type: string
 *         password:
 *           type: string
 *     LoginResponse:
 *       type: object
 *       properties:
 *         profile:
 *           $ref: '#/components/schemas/UserProfile'
 *         accessToken:
 *           type: string
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Bad request
 *
 * /auth/login:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNumber
 *               - password
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "yourpassword"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 * /auth/request-otp:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNumber
 *               - purpose
 *             properties:
 *               mobileNumber:
 *                 type: string
 *               purpose:
 *                 type: string
 *                 enum: [register, forgot-password]
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *
 * /auth/verify-otp:
 *   post:
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNumber
 *               - code
 *               - purpose
 *             properties:
 *               mobileNumber:
 *                 type: string
 *               code:
 *                 type: string
 *               purpose:
 *                 type: string
 *                 enum: [register, forgot-password]
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *
 * /auth/logout:
 *   post:
 *     tags: [auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/request-otp", authController.requestOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/logout", authController.logout);

module.exports = router;
