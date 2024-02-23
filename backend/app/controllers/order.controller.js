const MongoDB = require("../utils/mongodb.utils");
const OrderService = require("../services/order.service");

exports.createOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { userId, name, address, phone, note } = req.body;

        const result = await orderService.createOrder(userId, name, address, phone, note);
        res.status(201).json({ message: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create order" });
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { orderId } = req.params;
        const { status } = req.body;

        const result = await orderService.updateStatus(orderId, status);
        res.status(200).json({ message: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update order" });
    }
}

exports.getOrderById = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { orderId } = req.params;
        const result = await orderService.getOrderById(orderId);
        if (!result) {
            res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update order" });
    }
}

exports.getUserOrder = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const orderService = new OrderService(MongoDB.client);
        const result = await orderService.getUserOrder(userId);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch user orders" });
    }
};

exports.getAllOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const result = await orderService.getAllOrder();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch orders" });
    }
};

exports.deleteOrder = async (req, res, next) => {
    try {
        const orderService = new OrderService(MongoDB.client);
        const { orderId } = req.params;
        await orderService.deleteOrder(orderId);
        res.status(200).json({ message: "Order deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete order" });
    }
}