const { ObjectId } = require("mongodb");

class AnalyticsService {
    constructor(client) {
        this.Order = client.db().collection("orders");
        this.Product = client.db().collection("products");
    }

    async getRevenueByDay(month, year) {
        try {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const orders = await this.Order.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }).toArray();

            const revenueByDay = {};
            orders.forEach(order => {
                const day = order.createdAt.getDate();
                revenueByDay[day] = (revenueByDay[day] || 0) + order.total;
            });

            return revenueByDay;
        } catch (error) {
            throw new Error("Failed to get revenue by day: " + error.message);
        }
    }

    async getProductCategory(month, year) {
        try {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);

            const orders = await this.Order.find({
                createdAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            }).toArray();

            let totalProducts = 0;
            let shirtProducts = 0;
            let pantProducts = 0;
            let otherProducts = 0;

            orders.forEach(order => {
                order.items.forEach(item => {
                    const category = item.product.category ? item.product.category.toLowerCase() : "";
                    switch (category) {
                        case 'shirt':
                            shirtProducts += item.quantity;
                            break;
                        case 'pant':
                            pantProducts += item.quantity;
                            break;
                        default:
                            otherProducts += item.quantity;
                            break;
                    }
                    totalProducts += item.quantity;
                });
            });

            return [totalProducts, shirtProducts, pantProducts, otherProducts];
        } catch (error) {
            throw new Error("Could not fetch product categories: " + error.message);
        }
    }


}

module.exports = AnalyticsService;