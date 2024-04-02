<template>
    <div class="container-fluid d-flex justify-content-center">
        <div v-if="cart && cart.items && cart.items.length > 0" class="row col-lg-8 col-12">
            <router-link :to="{ name: 'Cart' }" class="h2 mt-3 mb-3 main-hover">Giỏ Hàng</router-link>
            <ul class="w-100 pl-0" style="min-height: 200px;">
                <li v-for="item in cart.items.slice().reverse()" :key="item.productId"
                    class="position-relative list-unstyled">
                    <div class="card shadow-sm mt-3 flex-row border-0 rounded-0">
                        <div class="card-img-left d-flex align-items-center" style="height: auto">
                            <img :src="item.product.imgURL" style="width:154px; height: 100%; object-fit: contain;"
                                class="img-fluid" alt="Ảnh sản phẩm">
                        </div>
                        <div class="card-body">
                            <router-link :to="{ name: 'Detail', params: { id: item.productId } }"
                                class="card-title h5 main-hover">{{ item.product.name }}</router-link>
                            <div class="mb-2">
                                <span class="text-muted font-italic">{{ item.size == 'free-size' ? item.size : `Size
                                    ${item.size}` }}</span>
                            </div>
                            <p class="price card-text">${{ item.product.price }}</p>

                            <div class="row justify-content-between w-100 m-0">
                                <div class="input-group" style="width: auto; height: auto;">
                                    <div class="input-group-prepend">
                                        <button class="btn border rounded-0 decrease-btn" type="submit"
                                            @click="decreaseQuantity(item)">
                                            <i class="fas fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" id="quantity{{ item.product._id }}" name="quantity"
                                        class="form-control input-number text-center" :value="item.quantity" min="1"
                                        max="20" style="width: 50px;" />
                                    <div class="input-group-append">
                                        <button class="btn border rounded-0 increase-btn" type="submit"
                                            @click="increaseQuantity(item)">
                                            <i class="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <p class="price m-0 mt-2"> <b class="text-dark">Thành tiền:</b> ${{
            (item.product.price * item.quantity) ?
                (item.product.price * item.quantity).toFixed(2) : '0.00' }}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div class="mt-2 mr-2 position-absolute" style="right: 0; top: 0;">
                        <button class="btn delete-btn" @click="removeItem(item.productId, item.size)">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </li>

            </ul>

            <div class="w-100 mb-5 mt-4 d-flex justify-content-between align-items-center">
                <div>
                    <strong>Tổng tiền: </strong>
                    <span v-if="cart" class="price">{{ cart.total ? cart.total.toFixed(2) : '0.00' }} $</span>
                    <span v-else class="price">0.00 $</span>

                </div>
                <button type="button" class="p-2 pl-4 pr-4 rounded-0 btn btn-dark" data-toggle="modal"
                    data-target="#orderNow">Đặt
                    hàng</button>
            </div>


            <!-- Modal -->
            <div class="modal fade" id="orderNow" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalLabel">Thông tin đặt hàng</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit="order">
                                <div class="row">
                                    <div class="col-lg-6 form-group">
                                        <label for="name">Tên</label>
                                        <input class="form-control rounded-0" id="name" name="name"
                                            v-model="orderTemp.name" type="text" required min="2" />
                                    </div>

                                    <div class="col-lg-6 form-group">
                                        <label for="phone">Số điện thoại</label>
                                        <input class="form-control rounded-0" id="phone" name="phone"
                                            v-model="orderTemp.phone" type="tel" required />
                                    </div>

                                    <div class=" col-12 form-group">
                                        <label for="address">Địa chỉ</label>
                                        <input class="form-control rounded-0" name="address" type="text"
                                            v-model="orderTemp.address" label="Địa chỉ" required />
                                    </div>

                                    <div class=" col-12 form-group">
                                        <label for="note">Ghi chú</label>
                                        <textarea class="form-control rounded-0" name="note" v-model="orderTemp.note"
                                            label="Mô tả" />
                                    </div>
                                </div>

                                <div class="row m-0">
                                    <p class="w-100">Đơn hàng gồm:</p>
                                    <div class="card mb-3 rounded-0 flex-row col-12" v-for="(item, index) in cart.items"
                                        :key="index">
                                        <div class="card-img-left d-flex align-items-center">
                                            <img :src="item.product.imgURL"
                                                style="width:80px; height: 80px; object-fit: contain;" class="img-fluid"
                                                alt="Ảnh sản phẩm">
                                        </div>
                                        <div class="pl-3 card-body position-relative p-2">
                                            <strong class="card-title main-hover">{{ item.product.name }}</strong>

                                            <p class="text-muted font-italic mb-2" style="font-size: 12px;">Size: {{
            item.size }}</p>
                                            <p class="price card-text"> <i>${{ item.product.price }}</i> </p>

                                            <div class="position-absolute" style="right: 20px; bottom: 10px;">
                                                <p class="">x{{ item.quantity }}</p>
                                            </div>
                                        </div>

                                    </div>
                                    <p class="w-100 text-muted text-center font-italic"><i
                                            class="fa-solid fa-truck-fast"></i> Miễn phí giao hàng cho tất cả đơn hàng
                                        từ 50$</p>
                                    <p class="w-100 text-right">Thành tiền: <span class="price">{{ cart.total ?
            cart.total.toFixed(2) : '0.00' }}$</span></p>
                                    <p class="w-100 text-right">Phí vận chuyển: <span class="price">
                                            {{ cart.total < 50 ? '3.00' : '0.00' }} $</span>
                                    </p>
                                    <p class="w-100 text-right">Tổng tiền: <span class="price">
                                            {{ cart.total < 50 ? (cart.total + 3).toFixed(2) : cart.total.toFixed(2)
                                                }}$</span>
                                    </p>

                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    <button type="submit" class="btn btn-primary">Đặt</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        <div v-else id="dv" class="row col-lg-8 col-12">
            <router-link :to="{name: 'Cart'}" class="h2 mt-3 mb-3 w-100 text-decoration-none text-dark">Giỏ
                Hàng</router-link>
            <div class=" mb-5">
                <p class="h5 text-muted font-italic">Giỏ hàng trống, hãy quay lại khi đã thêm sản phẩm vào!</p>
            </div>
        </div>
    </div>
</template>

<script>
import CartService from "@/services/cart.service";
import OrderService from "@/services/order.service";


export default {
    data() {
        return {
            cart: {},
            user: null,
            orderTemp: {
                name: '',
                phone: '',
                address: '',
                note: '',
            },
            screenWidth: window.innerWidth,
        };
    },
    async mounted() {
        try {
            window.addEventListener('resize', this.updateScreenWidth);
            this.user = this.$store.getters.getUser;
            this.orderTemp = { name: this.user.name, phone: this.user.phone };
            this.retrieveCart();
        } catch (error) {
            console.log(error);
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },
    methods: {
        async retrieveCart() {
            try {
                const cart = await CartService.get(this.user._id);
                if (cart.items.length != 0) {
                    for (const item of cart.items) {
                        if (item.product.inventory == 0) {
                            await this.removeItem(item.productId, item.size);
                        }
                    }
                    this.cart = cart;
                } else {
                    this.cart = null;
                }
            } catch (error) {
                this.cart = null;
                console.error('Error fetching cart:', error);
            }
        },
        handleInput() {

        },
        async removeItem(productId, size) {
            try {
                await CartService.removeItem(this.user._id, productId, size);
                this.retrieveCart();
                // this.$router.push('/cart');
            } catch (error) {
                console.error(error);
            }
        },
        async decreaseQuantity(item) {
            if (item.quantity > 1) {
                await this.updateCartItem(item, -1);
            }
        },

        async increaseQuantity(item) {
            if (item.quantity < 20 && item.quantity < item.product.inventory) {
                await this.updateCartItem(item, 1);
            }
        },
        async updateCartItem(item, quantity) {
            try {
                await CartService.update(this.user._id, item.productId, quantity, item.size);
                this.retrieveCart();
            } catch (error) {
                console.error(error);
            }
        },
        async order(event) {
            event.preventDefault();

            try {
                await OrderService.create(this.user._id, this.orderTemp.name, this.orderTemp.address, this.orderTemp.phone, this.orderTemp.note);
                this.retrieveCart();
                $('#orderNow').modal('hide');
                window.scrollTo(0, 0);
                this.$router.push('/order');

            } catch (error) {
                console.error(error);
            }
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },

    },
};
</script>


<style>
.form-size {
    box-shadow: none !important;
    outline: none !important;
    opacity: 0.7;
    background-color: #75757520;
}
</style>