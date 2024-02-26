const MongoDB = require("../utils/mongodb.utils");
const AnalyticsService = require("../services/analytics.service");

exports.getRevenueByDay = async (req, res, next) => {
    try {
        const { month, year } = req.body;
        const analyticsService = new AnalyticsService(MongoDB.client);
        const revenueByDay = await analyticsService.getRevenueByDay(month, year);
        res.status(200).json(revenueByDay);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get revenue by day" });
    }
}

exports.getProductCategory = async (req, res, next) => {
    try {
        const { month, year } = req.body;
        const analyticsService = new AnalyticsService(MongoDB.client);
        const productCategory = await analyticsService.getProductCategory(month, year);
        res.status(200).json(productCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get product categories" });
    }
}
