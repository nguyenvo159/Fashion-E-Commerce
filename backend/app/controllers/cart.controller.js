const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.utils");


exports.update = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const { userId, productId, quantity, size } = req.body;

        // Kiểm tra xem ID người dùng từ token có khớp với ID từ tham số không
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        const result = await cartService.updateCart(userId, productId, quantity, size);
        res.status(200).json({ message: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getCart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const { userId } = req.params;

        // Kiểm tra xem ID người dùng từ token có khớp với ID từ tham số không
        if (req.user._id.toString() !== userId) {
            console.log(req.user);
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const cart = await cartService.getCart(userId);
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
        } else {
            res.status(200).json(cart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getQuantity = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const { userId, productId } = req.params;

        // Kiểm tra xem ID người dùng từ token có khớp với ID từ tham số không
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const cart = await cartService.getQuantity(userId, productId);
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
        } else {
            res.status(200).json(cart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.removeItem = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const { userId, productId, size } = req.params;

        // Kiểm tra xem ID người dùng từ token có khớp với ID từ tham số không
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const result = await cartService.removeItem(userId, productId, size);

        res.status(200).json({ message: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.clearCart = async (req, res, next) => {
    try {
        const cartService = new CartService(MongoDB.client);
        const { userId } = req.params;

        // Kiểm tra xem ID người dùng từ token có khớp với ID từ tham số không
        if (req.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const result = await cartService.getCart(userId);
        if (!result) {
            res.status(404).json({ message: 'Cart not found' });
        } else {
            await cartService.clearCart(userId);
            res.status(200).json({ message: 'Cart cleared successfully' });
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

