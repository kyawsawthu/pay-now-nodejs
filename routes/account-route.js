const { Router } = require("express");
const authenticate = require("../middlewares/authentication");
const accountController = require("../controllers/account-controller");

// Swagger Docs
/**
 * @swagger
 * tags:
 *   name: account
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SearchResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UserProfile'
 */

/**
 * @swagger
 * /account/profile:
 *   get:
 *     tags: [account]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserProfile'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 * /account/search:
 *   get:
 *     tags: [account]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: mobileNumber
 *         schema:
 *           type: string
 *           example: "987"
 *         required: true
 *         description: Partial mobile number to search (minimum 3 digits)
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/SearchResponse'
 */

const router = Router();

router.get("/profile", authenticate, accountController.profile);
router.get("/search", authenticate, accountController.search);

module.exports = router;
