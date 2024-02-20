const { ObjectId } = require("mongodb");

class ProductService {
    constructor(client) {
        this.Product = client.db().collection("products");
    }

    async addProduct(product) {
        try {
            // Kiểm tra xem sản phẩm đã tồn tại 
            const existingProduct = await this.Product.findOne({ name: product.name });

            if (existingProduct) {
                // throw new Error("Product already exists");
                return "Product is already exists";
            }

            const result = await this.Product.insertOne(product);
            return "Product added successfully";
        } catch (error) {
            throw new Error("Could not add product: " + error.message);
        }
    }


    async updateProduct(productId, updatedFields) {
        const result = await this.Product.findOneAndUpdate(
            { _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null },
            { $set: updatedFields },
            { returnOriginal: false }
        );

        return result.value;
    }

    async getProductById(productId) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
        });
    }


    async deleteProduct(productId) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(productId) ? new ObjectId(productId) : null,
        });

        return result.value;
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
