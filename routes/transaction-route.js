const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const transactionController = require("../controllers/transaction-controller");

// Swagger Docs
/**
 * @swagger
 * tags:
 *   name: transaction
 *   description: Transaction history endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         amount:
 *           type: string
 *         type:
 *           type: string
 *           enum: [in, out]
 *         status:
 *           type: string
 *           enum: [pending, declined, canceled, done]
 *         note:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             name:
 *               type: string
 *             mobileNumber:
 *               type: string
 */

/**
 * @swagger
 * /transaction/recent:
 *   get:
 *     tags: [transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent transactions retrieved successfully
 *
 * /transaction/history:
 *   get:
 *     tags: [transaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Transaction'
 *
 * /transaction/send-requests:
 *   get:
 *     tags: [transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sent requests retrieved successfully
 *
 * /transaction/receive-requests:
 *   get:
 *     tags: [transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Received requests retrieved successfully
 */

const router = Router();

router.get(
  "/recent",
  authenticate,
  transactionController.getRecentTransactions
);
router.get("/history", authenticate, transactionController.getAllTransactions);
router.get(
  "/send-requests",
  authenticate,
  transactionController.getRequestsAsSender
);
router.get(
  "/receive-requests",
  authenticate,
  transactionController.getRequestsAsReceiver
);

module.exports = router;
