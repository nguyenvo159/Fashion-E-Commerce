const jwt = require("jsonwebtoken");
const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.utils");

const verifyToken = async (req, res, next) => {
    // Lấy token từ tiêu đề yêu cầu
    const token = req.headers["authorization"];

    // Kiểm tra xem token có tồn tại không
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided" });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const userService = new UserService(MongoDB.client);
        const user = await userService.getUserById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
