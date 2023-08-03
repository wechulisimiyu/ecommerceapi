const {
  createCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("../controllers/cartControllers");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

/**
 * @openapi
 * /api/carts:
 *   post:
 *     tags: [Cart]
 *     summary: Create a new cart
 *     description: Create a new cart for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                       default: 1
 *     responses:
 *       200:
 *         description: Cart created successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: Token is not valid!
 *       500:
 *         description: Internal server error
 */

router.post("/", verifyToken, createCart);

/**
 * @openapi
 * /api/carts/{id}:
 *   put:
 *     tags: [Cart]
 *     summary: Update a cart
 *     description: Update a cart for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Cart updated successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ProductUpdate:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product to update in the cart.
 *         quantity:
 *           type: number
 *           default: 1
 *           description: The new quantity of the product in the cart.
 */


router.put("/:id", verifyTokenAndAuthorization, updateCart);

/**
 * @openapi
 * /api/carts/{id}:
 *   delete:
 *     tags: [Cart]
 *     summary: Delete a cart
 *     description: Delete a cart for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart ID
 *     responses:
 *       200:
 *         description: Cart deleted successfully
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

/**
 * @openapi
 * /api/carts/user/{userId}:
 *   get:
 *     tags: [Cart]
 *     summary: Get user's cart
 *     description: Get the cart of the authenticated user.
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
 *         description: User's cart retrieved successfully
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

/**
 * @openapi
 * /api/carts:
 *   get:
 *     tags: [Cart]
 *     summary: Get all carts
 *     description: Get all carts (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     responses:
 *       200:
 *         description: Carts retrieved successfully
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.get("/", verifyTokenAndAdmin, getAllCarts);

module.exports = router;
