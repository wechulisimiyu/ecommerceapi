const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");
const {
  createNewProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getAllProducts,
} = require("../controllers/productControllers");

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags: [Product]
 *     summary: Create a new product
 *     description: Create a new product (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product created successfully
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
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           required: true
 *           unique: true
 *         desc:
 *           type: string
 *           required: true
 *         img:
 *           type: string
 *           required: true
 *         categories:
 *           type: array
 *         size:
 *           type: string
 *         color:
 *           type: string
 *         price:
 *           type: number
 */

router.post("/", verifyTokenAndAdmin, createNewProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     tags: [Product]
 *     summary: Update a product
 *     description: Update a product (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.put("/:id", verifyTokenAndAdmin, updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags: [Product]
 *     summary: Delete a product
 *     description: Delete a product (Admin only).
 *     security:
 *       - bearerAuth: []
 *       - adminAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       403:
 *         description: You are not allowed to do that!
 *       500:
 *         description: Internal server error
 */

router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

/**
 * @openapi
 * /api/products/find/{id}:
 *   get:
 *     tags: [Product]
 *     summary: Get a single product
 *     description: Get details of a single product.
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *       500:
 *         description: Internal server error
 */

router.get("/find/:id", getSingleProduct);

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags: [Product]
 *     summary: Get all products
 *     description: Get all products.
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       500:
 *         description: Internal server error
 */

router.get("/", getAllProducts);

module.exports = router;
