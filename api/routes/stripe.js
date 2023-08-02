const router = require("express").Router();
const stripeCharge = require("../controllers/stripeController");

router.post("/payment", stripeCharge);

module.exports = router;
