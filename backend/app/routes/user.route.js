const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");

const verifyToken = require("../middleware/verifyToken");
const isAdminAuth = require("../middleware/isAdminAuth");

router.post("/register", user.register);
router.post("/login", user.login);

// Các endpoint cần xác thực JWT

router.use(verifyToken);

router.put("/:userId", user.updateUser);
router.get("/:email", user.getByEmail);
router.delete("/:userId", user.deleteUser);


router.use(isAdminAuth);
router.get("/", user.getAll);

// router.get("/:userId", user.getById);

module.exports = router;
