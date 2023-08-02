const { createCart, updateCart, deleteCart, getUserCart, getAllCarts } = require('../controllers/cartControllers')
const { 
  verifyToken, 
  verifyTokenAndAuthorization, 
  verifyTokenAndAdmin 
} = require('../middleware/verifyToken')

const router = require("express").Router()

// @desc: create a new cart
// User or guest
// ROUTE POST/
// http://localhost:5000/api/products
router.post("/", verifyToken, createCart)

// @desc: update cart
// user or guest
// ROUTE PUT/
// http://localhost:5000/api/products
router.put("/:id", verifyTokenAndAuthorization, updateCart);

// @desc: delete something on the cart
// user or guest
// ROUTE DELETE/
// http://localhost:5000/api/products
router.delete("/:id", verifyTokenAndAuthorization, deleteCart)

// @desc: get user cart
// user or guest
// ROUTE GET/
// http://localhost:5000/api/find/userId/cart
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart)

// @desc: get all carts
// Only admin can do this
// ROUTE GET/
// http://localhost:5000/api/carts
router.get("/", verifyTokenAndAdmin, getAllCarts)

module.exports = router