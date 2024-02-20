const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Lấy token từ tiêu đề yêu cầu
    const token = req.headers["authorization"];

    // Kiểm tra xem token có tồn tại không
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided" });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
