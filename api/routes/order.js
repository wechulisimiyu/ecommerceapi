const {
  addOrder,
  updateUserOrder,
  deleteUserOrder,
  getSingleUserOrder,
  getAllUserOrders,
  getIncomeSummary,
} = require("../controllers/orderControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

/**
 * @openapi
 * /api/orders:
 *   post:
 *     tags: [Order]
 *     summary: Add an order
 *     description: Add a new order for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order added successfully
 *       401:
 *         description: You are not authenticated!
 *       500:
 *         description: Internal server error
 */

router.post("/", verifyToken, addOrder);

/**
 * @openapi
 * /api/orders/{id}:
 *   put:
 *     tags: [Order]
 *     summary: Update a user order
 *     description: Update an order (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderUpdate'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.put("/:id", verifyTokenAndAdmin, updateUserOrder);

/**
 * @openapi
 * /api/orders/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Delete a user order
 *     description: Delete an order (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", verifyTokenAndAdmin, deleteUserOrder);

/**
 * @openapi
 * /api/orders/find/{userId}:
 *   get:
 *     tags: [Order]
 *     summary: Get a user order
 *     description: Get orders for a specific user (Authorized user only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User orders retrieved successfully
 *       401:
 *         description: You are not authenticated!
 *       500:
 *         description: Internal server error
 */

router.get("/find/:userId", verifyTokenAndAuthorization, getSingleUserOrder);

/**
 * @openapi
 * /api/orders:
 *   get:
 *     tags: [Order]
 *     summary: Get all user orders
 *     description: Get all user orders (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     responses:
 *       200:
 *         description: User orders retrieved successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.get("/", verifyTokenAndAdmin, getAllUserOrders);

/**
 * @openapi
 * /api/orders/income:
 *   get:
 *     tags: [Order]
 *     summary: Get income summaries
 *     description: Get income summaries (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     responses:
 *       200:
 *         description: Income summaries retrieved successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.get("/income", verifyTokenAndAdmin, getIncomeSummary);

module.exports = router;
