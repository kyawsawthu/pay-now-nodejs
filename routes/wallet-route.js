const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const walletController = require("../controllers/wallet-controller");

/**
 * @swagger
 * tags:
 *   name: wallet
 *   description: Wallet management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TopupRequest:
 *       type: object
 *       required:
 *         - paymentId
 *         - amount
 *       properties:
 *         paymentId:
 *           type: string
 *           example: "64f3e4b1c2f3a1b2c3d4e5f6"
 *         amount:
 *           type: string
 *           example: "100.00"
 *     TransferRequest:
 *       type: object
 *       required:
 *         - userId
 *         - amount
 *       properties:
 *         userId:
 *           type: string
 *           example: "64f3e4b1c2f3a1b2c3d4e5f6"
 *         amount:
 *           type: string
 *           example: "100.00"
 *         note:
 *           type: string
 *           example: "For dinner"
 *     WalletBalance:
 *       type: object
 *       properties:
 *         balance:
 *           type: string
 *           example: "1000.00"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-03-15T10:30:00Z"
 */

/**
 * @swagger
 * /wallet/balance:
 *   get:
 *     tags: [wallet]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Balance retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/WalletBalance'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /wallet/topup:
 *   post:
 *     tags: [wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TopupRequest'
 *     responses:
 *       200:
 *         description: Top up successful
 *
 * /wallet/transfer:
 *   post:
 *     tags: [wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferRequest'
 *     responses:
 *       200:
 *         description: Transfer successful
 *
 * /wallet/request:
 *   post:
 *     tags: [wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransferRequest'
 *     responses:
 *       200:
 *         description: Request sent successfully
 *
 * /wallet/request/approve:
 *   post:
 *     tags: [wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *             properties:
 *               transactionId:
 *                 type: string
 *                 example: "64f3e4b1c2f3a1b2c3d4e5f6"
 *     responses:
 *       200:
 *         description: Request approved successfully
 *
 * /wallet/request/decline:
 *   post:
 *     tags: [wallet]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *             properties:
 *               transactionId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request declined successfully
 */

const router = Router();

router.get("/balance", authenticate, walletController.balance);
router.post("/topup", authenticate, walletController.topup);
router.post("/transfer", authenticate, walletController.transfer);
router.post("/request", authenticate, walletController.request);
router.post("/request/approve", authenticate, walletController.approve);
router.post("/request/cancel", authenticate, walletController.cancel);
router.post("/request/decline", authenticate, walletController.decline);

module.exports = router;
