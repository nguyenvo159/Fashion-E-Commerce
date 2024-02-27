const isAdminMiddleware = (req, res, next) => {
    // Kiểm tra xem người dùng có phải là admin không
    if (!req.user || req.user.isAdmin !== true) {
        return res.status(403).json({ message: "Access denied. Admin privilege required" });
    }

    // Nếu người dùng là admin, cho phép tiếp tục
    next();
};

module.exports = isAdminMiddleware;
