const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");


router.get("/", product.getAll);
router.get("/category/:category", product.getByCategory);
router.get("/:productId", product.get);
router.post("/", product.create);
router.put("/:productId", product.update);
router.delete("/:productId", product.delete);

module.exports = router;