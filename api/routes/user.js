const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getAllUserStats,
} = require("../controllers/userControllers");

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     tags: [User]
 *     summary: Update a user
 *     description: Update a user's information (Authorized user only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     UserUpdate:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The new username for the user.
 *         email:
 *           type: string
 *           description: The new email for the user.
 *         password:
 *           type: string
 *           description: The new password for the user.
 *         isAdmin:
 *           type: boolean
 *           description: The new admin status for the user.
 */

router.put("/:id", verifyTokenAndAuthorization, updateUser);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Delete a user
 *     description: Delete a user (Authorized user only).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

/**
 * @openapi
 * /api/users/find/{id}:
 *   get:
 *     tags: [User]
 *     summary: Get a user
 *     description: Get details of a user (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.get("/find/:id", verifyTokenAndAdmin, getUser);

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags: [User]
 *     summary: Get all users
 *     description: Get all users (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.get("/", verifyTokenAndAdmin, getAllUsers);

/**
 * @openapi
 * /api/users/stats:
 *   get:
 *     tags: [User]
 *     summary: Get user stats
 *     description: Get user statistics (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     responses:
 *       200:
 *         description: User stats retrieved successfully
 *       401:
 *         description: You are not authenticated!
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.get("/stats", verifyTokenAndAdmin, getAllUserStats);

module.exports = router;
