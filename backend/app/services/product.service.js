const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }

    async addProduct(product) {
        try {
            // Kiểm tra xem sản phẩm đã tồn tại 
            const existingProduct = await this.Product.findOne({ name: product.name });

            if (existingProduct) {
                // throw new Error("Product already exists");
                return "Product is already exists";
            }
            product.createdAt = new Date();
            product.updatedAt = new Date();

            const result = await this.Product.insertOne(product);
            return "Product added successfully";
        } catch (error) {
            throw new Error("Could not add product: " + error.message);
        }
    }


    async updateProduct(productId, updatedFields) {

        updatedFields.updatedAt = new Date();
        const result = await this.Product.findOneAndUpdate(
            { _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null },
            { $set: updatedFields },
            { returnOriginal: false }
        );

        return result.value;
    }
    async updateInventory(productId, quantity) {
        const product = await this.getProductById(productId);
        if (!product) {
            throw new Error("Product not found");
        }
        const updatedInventory = product.inventory - quantity;

        // Đảm bảo tồn kho không âm
        if (updatedInventory < 0) {
            updatedInventory = 0;
        }
        const result = await this.Product.findOneAndUpdate(
            { _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null },
            { $set: { inventory: updatedInventory } },
            { returnOriginal: false }
        );
    }

    async deleteProduct(productId) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
        });

        return result.value;
    }

    async getProductById(productId) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
        });
    }

    async getProductsByCategory(category) {
        try {
            const products = await this.Product.find({ category }).toArray();
            return products;
        } catch (error) {
            throw new Error("Could not fetch products by category");
        }
    }

    async getAllProducts() {
        try {
            const products = await this.Product.find({}).toArray();
            return products;
        } catch (error) {
            throw new Error("Could not fetch products");
        }
    }
}

module.exports = ProductService;
