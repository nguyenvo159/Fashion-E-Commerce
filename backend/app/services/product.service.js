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
            return result.insertedId;
        } catch (error) {
            throw new Error("Could not add product: " + error.message);
        }
    }


    async updateProduct(productId, updatedFields) {
        try {
            await this.Product.updateOne({ _id: ObjectId(productId) }, { $set: updatedFields });
            return true;
        } catch (error) {
            throw new Error("Could not update product");
        }
    }

    async deleteProduct(productId) {
        try {
            await this.Product.deleteOne({ _id: ObjectId(productId) });
            return true;
        } catch (error) {
            throw new Error("Could not delete product");
        }
    }

    async getProductById(productId) {
        try {
            const product = await this.Product.findOne({ _id: ObjectId(productId) });
            return product;
        } catch (error) {
            throw new Error("Could not fetch product");
        }
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
