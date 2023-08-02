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

// @desc: add order
// user or guest
// ROUTE POST/
// http://localhost:5000/api/

router.post("/", verifyToken, addOrder);

// @desc: update user order
// admin
// ROUTE PUT/
// http://localhost:5000/api/orders
router.put("/:id", verifyTokenAndAdmin, updateUserOrder);

// @desc: delete user order
// admin
// ROUTE DELETE/
// http://localhost:5000/api/orders
router.delete("/:id", verifyTokenAndAdmin, deleteUserOrder);

// @desc: get user order
// all users
// ROUTE GET/
// http://localhost:5000/api/orders
router.get("/find/:userId", verifyTokenAndAuthorization, getSingleUserOrder);

// @desc: get all orders
// all users
// ROUTE GET/
// http://localhost:5000/api/orders
router.get("/", verifyTokenAndAdmin, getAllUserOrders);

// @desc: get income summaries
// admin
// ROUTE GET/
// http://localhost:5000/api/income
// POSSIBLE BUG
router.get("/income", verifyTokenAndAdmin, getIncomeSummary);

module.exports = router;
