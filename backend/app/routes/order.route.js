const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");

const verifyToken = require("../middleware/verifyToken");
const isAdminAuth = require("../middleware/isAdminAuth");

router.use(verifyToken);

router.post("/", order.createOrder);
router.get("/:userId", order.getUserOrder);
router.get("/detail/:orderId", order.getOrderById);
router.delete("/:orderId", order.deleteOrder);

router.use(isAdminAuth);
router.get("/", order.getAllOrder);
router.put("/:orderId", order.updateOrder);

module.exports = router;