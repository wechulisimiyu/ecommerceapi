const router = require("express").Router();
const stripeCharge = require("../controllers/stripeController");

/**
 * @openapi
 * /api/payment:
 *   post:
 *     tags: [Payment]
 *     summary: Make a payment using Stripe
 *     description: Make a payment using Stripe with the provided token ID and amount.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tokenId:
 *                 type: string
 *               amount:
 *                 type: integer
 *                 description: Amount in cents (USD)
 *             required:
 *               - tokenId
 *               - amount
 *     responses:
 *       200:
 *         description: Payment successful
 *       500:
 *         description: Payment error
 */

router.post("/payment", stripeCharge);

module.exports = router;
