const express = require("express");
const router = express.Router();
const user = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const isAdminAuth = require("../middleware/isAdminAuth");

router.post("/register", user.register);
router.post("/login", user.login);
router.get("/logout", user.logout);

// Các endpoint cần xác thực JWT

router.use(verifyToken);
router.use(isAdminAuth);

router.get("/", user.getAll);
router.get("/:email", user.getByEmail);
router.put("/:userId", user.updateUser);
router.delete("/:userId", user.deleteUser);
// router.get("/:userId", user.getById);

module.exports = router;
