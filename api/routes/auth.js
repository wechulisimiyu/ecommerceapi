const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/authControllers')

// @desc: User register
// Route: POST/
// http://localhost:5000/api/auth/register
router.post("/register", registerUser) 

// @desc: User login
// Route: POST/
// http://localhost:5000/api/auth/login
router.post("/login", loginUser)

module.exports = router