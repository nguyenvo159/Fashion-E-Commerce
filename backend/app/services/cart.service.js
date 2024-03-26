const { ObjectId } = require("mongodb");


const ProductService = require("./product.service");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts");
        this.product = new ProductService(client);
        this.client = client;
    }

    async updateCart(userId, productId, quantity = 1, size = "free-size") {
        if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
            throw new Error("Invalid userId or productId");
        }

        const filter = { userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null };
        const cart = await this.Cart.findOne(filter);

        const product = await this.product.getProductById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        if (quantity > product.inventory) {
            throw new Error("Not enough stock available");
        }


        // Nếu chưa có giỏ hàng, tạo mới giỏ hàng và thêm sản phẩm
        if (!cart) {
            const newCart = {
                userId: new ObjectId(userId),
                items: [{ productId: new ObjectId(productId), size: size, quantity: quantity }],
            };

            await this.Cart.insertOne(newCart);

            return "Add new cart and product successfully";
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.equals(new ObjectId(productId)) && item.size == size);

        // Nếu sản phẩm chưa tồn tại, thêm mới vào giỏ hàng
        if (existingItemIndex == -1) {
            const update = {
                $addToSet: {
                    items: {
                        productId: new ObjectId(productId),
                        size: size,
                        quantity: quantity,
                    },
                },
            };
            await this.Cart.findOneAndUpdate(
                filter,
                update,
                {
                    returnDocument: "after"
                }
            );
            return "Add new product to cart successfully";
        }

        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const updatedQuantity = cart.items[existingItemIndex].quantity + quantity;
        const update = {
            $set: {
                [`items.${existingItemIndex}.size`]: size,
                [`items.${existingItemIndex}.quantity`]: updatedQuantity
            },
        };

        await this.Cart.findOneAndUpdate(filter, update, { returnDocument: "after" });

        return "Updated Product successfully";
    }

    async getQuantity(userId, productId, size) {
        if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
            throw new Error("Invalid userId or productId");
        }

        const filter = { userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null };
        const cart = await this.Cart.findOne(filter);

        if (!cart) {
            return "Invalid Cart";
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.equals(new ObjectId(productId)) && item.size === size);
        return cart.items[existingItemIndex].quantity;
    }


    // Chi tiết product trong cart
    async populateCart(cart) {
        const productIds = cart.items.map(item => item.productId);

        const products = await this.product.find({ _id: { $in: productIds } });

        const validProducts = products.filter(product => product !== null);

        // Tổng tiền cart
        const total = cart.items.reduce((acc, item) => {
            const product = validProducts.find(p => p._id.toString() === item.productId.toString());
            if (product) {
                acc += product.price * item.quantity; // Giá của mỗi sản phẩm nhân số lượng
            }
            return acc;
        }, 0);

        const populatedCart = {
            ...cart,
            total: total,
            items: cart.items.reduce((acc, item) => {
                const product = validProducts.find(p => p._id.toString() === item.productId.toString());
                if (product) {
                    acc.push({
                        ...item,
                        product: product
                    });
                }
                return acc;
            }, [])
        };

        return populatedCart;
    }

    async getCart(userId) {
        const filter = { userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null };
        const cart = await this.Cart.findOne(filter);

        if (cart) {
            const result = await this.populateCart(cart);
            return result;
        }

        return null;
    }

    async removeItem(userId, productId, size) {
        if (!ObjectId.isValid(userId) || !ObjectId.isValid(productId)) {
            throw new Error("Invalid userId or productId");
        }

        const product = await this.product.getProductById(productId);
        if (!product) {
            throw new Error("Product not found");
        }


        const filter = { userId: new ObjectId(userId) };
        const update = { $pull: { items: { productId: new ObjectId(productId), size: size } } };

        await this.Cart.findOneAndUpdate(filter, update, { returnDocument: "after" });

        return "Removed item succussfully";
    }

    async clearCart(userId) {
        const filter = { userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null };

        const cart = await this.Cart.findOne(filter);

        if (!cart) {
            return;
        }
        for (const item of cart.items) {
            const productId = item.productId;
            const quantity = item.quantity;

            await this.product.updateInventory(productId, quantity);
        }
        await this.Cart.findOneAndDelete(filter);
    }


}

module.exports = CartService;