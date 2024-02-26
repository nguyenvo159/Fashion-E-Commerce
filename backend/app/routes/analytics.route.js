const express = require("express");
const router = express.Router();
const analytics = require("../controllers/analytics.controller");

router.post("/revenue-by-day", analytics.getRevenueByDay);
router.post("/product-category", analytics.getProductCategory);

module.exports = router;
