const express = require("express");
const router = express.Router();
const analytics = require("../controllers/analytics.controller");

router.post("/revenue-month", analytics.getRevenueByDay);
router.post("/product-ratio", analytics.getProductCategory);

module.exports = router;


