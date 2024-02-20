const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");


router.get("/", product.getAll);
router.get("/category/:category", product.getByCategory);
router.post("/", product.create);

router.route("/:productId")
    .get(product.getById)
    .put(product.update)
    .delete(product.delete);

module.exports = router;