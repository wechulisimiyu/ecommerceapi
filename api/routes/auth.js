const router = require('express').Router()
const { registerUser, loginUser } = require('../controllers/authControllers')

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: User authentication operations
 */


// @desc: User register
// Route: POST/
// http://localhost:5000/api/auth/register

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Register a new user with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: mysecretpassword
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 615eb25cc4b1de0036c39ef0
 *                 username:
 *                   type: string
 *                   example: john_doe
 *       400:
 *         description: Bad request
 */

router.post("/register", registerUser) 

// @desc: User login
// Route: POST/
// http://localhost:5000/api/auth/login

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate user
 *     description: Authenticate a user with the provided credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: john_doe
 *               password:
 *                 type: string
 *                 example: mysecretpassword
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 615eb25cc4b1de0036c39ef0
 *                 username:
 *                   type: string
 *                   example: john_doe
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsIn...
 *       401:
 *         description: Unauthorized
 */

router.post("/login", loginUser)

module.exports = router