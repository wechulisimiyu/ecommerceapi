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

// @desc: updating user
// ROUTE PUT/
router.put("/:id", verifyTokenAndAuthorization, updateUser);

// @desc: delete user
// ROUTE DELETE/
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

// @desc: get user
// only admin can get any user
// ROUTE GET/
// http://localhost:5000/api/users/find/id
router.get("/find/:id", verifyTokenAndAdmin, getUser);

// @desc: get all users
// only admin can get all users
// ROUTE GET/
// http://localhost:5000/api/users/stats
router.get("/", verifyTokenAndAdmin, getAllUsers);

// @desc: get user stats
// only admin can get all user stats
// ROUTE GET/
router.get("/stats", verifyTokenAndAdmin, getAllUserStats);

module.exports = router;
