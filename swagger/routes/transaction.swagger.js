/**
 * @swagger
 * tags:
 *   name: transaction
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
 *                         $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transaction/history:
 *   get:
 *     tags: [transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transaction history retrieved successfully
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
 *                         $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transaction/send-requests:
 *   get:
 *     tags: [transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sent requests retrieved successfully
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
 *                         $ref: '#/components/schemas/Transaction'
 */

/**
 * @swagger
 * /transaction/receive-requests:
 *   get:
 *     tags: [transaction]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Received requests retrieved successfully
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
 *                         $ref: '#/components/schemas/Transaction'
 */

module.exports = {};
