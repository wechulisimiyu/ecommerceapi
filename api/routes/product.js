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

// @desc: create a new product
// Only admin can do this
// ROUTE POST/
// http://localhost:5000/api/products
router.post("/", verifyTokenAndAdmin, createNewProduct);

// @desc: updating product
// ROUTE PUT/
router.put("/:id", verifyTokenAndAdmin, updateProduct);

// @desc: delete product
// ROUTE DELETE/
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

// @desc: get product
// any user can get any product
// ROUTE GET/
router.get("/find/:id", getSingleProduct);

// @desc: get all products
// any user can get all products
// ROUTE GET/
router.get("/", getAllProducts);

module.exports = router;
