/**
 * @swagger
 * tags:
 *   name: account
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
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserProfile'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */

/**
 * @swagger
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
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UserProfile'
 */

module.exports = {};
