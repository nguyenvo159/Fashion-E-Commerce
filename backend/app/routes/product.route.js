const express = require("express");
const router = express.Router();
const product = require("../controllers/product.controller");
const verifyToken = require("../middleware/verifyToken");
const isAdminAuth = require("../middleware/isAdminAuth");



router.get("/", product.getAll);
router.get("/category/:category", product.getByCategory);
router.get("/:productId", product.getById);

// router.use(verifyToken);
// router.use(isAdminAuth);

router.post("/", product.create);
router.route("/:productId")
    .put(product.update)
    .delete(product.delete);

module.exports = router;