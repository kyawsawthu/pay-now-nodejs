const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const paymentController = require("../controllers/payment-controller");

// Swagger Docs
/**
 * @swagger
 * tags:
 *   name: payment
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CardRequest:
 *       type: object
 *       required:
 *         - cardNumber
 *         - cardHolderName
 *         - expiryDate
 *         - cvv
 *       properties:
 *         cardNumber:
 *           type: string
 *         cardHolderName:
 *           type: string
 *         expiryDate:
 *           type: string
 *         cvv:
 *           type: string
 *     CardResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "64f3e4b1c2f3a1b2c3d4e5f6"
 *         cardNumber:
 *           type: string
 *           example: "4111111111111111"
 *         cardHolderName:
 *           type: string
 *           example: "John Doe"
 *         expiryDate:
 *           type: string
 *           example: "12/25"
 *         cvv:
 *           type: string
 *           example: "123"
 */

/**
 * @swagger
 * /payment/cards:
 *   get:
 *     tags: [payment]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cards retrieved successfully
 *
 * /payment/add-card:
 *   post:
 *     tags: [payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CardRequest'
 *     responses:
 *       200:
 *         description: Card added successfully
 *
 * /payment/update-card:
 *   post:
 *     tags: [payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/CardRequest'
 *               - type: object
 *                 properties:
 *                   id:
 *                     type: string
 *     responses:
 *       200:
 *         description: Card updated successfully
 *
 * /payment/delete-card:
 *   post:
 *     tags: [payment]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 example: "64f3e4b1c2f3a1b2c3d4e5f6"
 *     responses:
 *       200:
 *         description: Card deleted successfully
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
 *                         $ref: '#/components/schemas/CardResponse'
 */

const router = Router();

router.get("/cards", authenticate, paymentController.cards);
router.post("/add-card", authenticate, paymentController.addCard);
router.post("/update-card", authenticate, paymentController.updateCard);
router.post("/delete-card", authenticate, paymentController.deleteCard);

module.exports = router;
