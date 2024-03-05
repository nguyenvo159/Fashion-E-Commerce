const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.utils");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new Error("Name can not be empty"));
    }

    try {
        const productService = new ProductService(MongoDB.client);
        const message = await productService.addProduct(req.body);
        return res.status(201).json({ message });
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while creating the product"));
    }
};

exports.getById = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const product = await productService.getProductById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while fetching the product"));
    }
};


exports.update = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const updatedFields = req.body;

        const productService = new ProductService(MongoDB.client);
        const product = await productService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        const updatedProduct = { ...product, ...updatedFields };

        await productService.updateProduct(productId, updatedProduct);

        return res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while updating the product"));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const { productId } = req.params;

        const existingProduct = await productService.getProductById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        await productService.deleteProduct(productId);
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while deleting the product"));
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const products = await productService.getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while fetching products"));
    }
};

exports.getByCategory = async (req, res, next) => {
    try {
        const productService = new ProductService(MongoDB.client);
        const { category } = req.params;
        const products = await productService.getProductsByCategory(category);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return next(new Error("An error occurred while fetching products by category"));
    }
};

