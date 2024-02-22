// Middleware xác thực isAdmin
const isAdminAuth = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (req.user.isAdmin !== true) {
            return res.status(403).json({ message: "Forbidden: Requires admin privilege" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = isAdminAuth;
