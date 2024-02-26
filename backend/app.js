const express = require("express");
const cors = require("cors");
const app = express();

const product = require("./app/routes/product.route");
const user = require("./app/routes/user.route");
const cart = require("./app/routes/cart.route");
const order = require("./app/routes/order.route");
const analytics = require("./app/routes/analytics.route");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Backend" });
});

app.use("/api/product", product);
app.use("/api/auth", user);
app.use("/api/cart", cart);
app.use("/api/order", order);
app.use("/api/analytics", analytics);

module.exports = app;