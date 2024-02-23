const { ObjectId } = require("mongodb");

const CartService = require("./cart.service");


class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
        this.cart = new CartService(client);
        this.client = client;
    }

    async createOrder(userId, name, address, phone, note) {
        if (!ObjectId.isValid(userId)) {
            throw new Error("Invalid userId");
        }

        const cart = await this.cart.getCart(userId);

        if (!cart || !cart.items || cart.items.length == 0) {
            throw new Error("Cart is empty");
        }

        let total = cart.total;

        const order = {
            userId: new ObjectId(userId),
            name: name,
            address: address,
            phone: phone,
            note: note || "",
            items: cart.items,
            total: total,
            status: "Pending",
            createdAt: new Date(),
        };

        await this.Order.insertOne(order);
        await this.cart.clearCart(userId);

        return "Order created successfully";
    }

    async updateStatus(orderId, status) {
        try {
            await this.Order.findOneAndUpdate(
                { _id: new ObjectId(orderId) },
                { $set: { status: status } },
                { returnDocument: "after" }
            );
            return "Updated order successfully";
        } catch (error) {
            throw new Error("Do not update order status");
        }
    }



    async getOrderById(orderId) {
        try {
            return await this.Order.findOne({ _id: new ObjectId(orderId) });
        } catch (error) {
            throw error;
        }
    }

    async getUserOrder(userId) {
        try {
            const orders = await this.Order.find({ userId: new ObjectId(userId) }).toArray();
            return orders;
        } catch (error) {
            throw error;
        }
    }

    async getAllOrder() {
        try {
            const orders = await this.Order.find().toArray();
            return orders;
        } catch (error) {
            throw new Error("Could't fetch order");
        }
    }

    async deleteOrder(orderId) {
        try {
            const result = await this.Order.findOneAndDelete({ _id: new ObjectId(orderId) });
            return result.value;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = OrderService;