const express = require("express");
const router = express.Router();
const cart = require("../controllers/cart.controller");

const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken);
router.get("/:userId", cart.getCart);
router.get("/quantity/:userId/:productId", cart.getQuantity);
router.post("/", cart.update);
router.delete("/remove/:userId/:productId/:size", cart.removeItem);
router.delete("/:userId", cart.clearCart);

module.exports = router;