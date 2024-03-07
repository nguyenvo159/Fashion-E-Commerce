<template>
    <div class="container-fluid d-flex justify-content-center">
        <div :class="{'row col-8': screenWidth >768, 'row w-75': screenWidth >= 450 && screenWidth <= 768, 'col-12': screenWidth < 450 }">
            <h2 class="w-100 mt-3 mb-3">Giỏ Hàng</h2>
            <ul class="w-100 pl-0" style="min-height: 200px;">
                <li v-if="cart && cart.items" v-for="item in cart.items.slice().reverse()" :key="item.productId" class="position-relative list-unstyled">
                        <div class="card shadow-sm mt-3 flex-row border-0 rounded-0">
                            <div class="card-img-left d-flex align-items-center" style="height: auto">
                                <img :src="item.product.imgURL" style="width:154px; height: 100%; object-fit: contain;" class="img-fluid"
                                    alt="Ảnh sản phẩm">
                            </div>
                            <div class="card-body">
                                <router-link :to="{ name: 'Detail', params: { id: item.productId } }" class="card-title h5 main-hover">{{ item.product.name }}</router-link>
                                <div class="mb-2 mt-2">
                                    <select class="form-size form-control pt-0 pb-0" style="width: auto; height: 25px;" name="size" id="size" :value="item.size">
                                        <option class="rounded-0" value="S">Size S</option>
                                        <option class="rounded-0" value="M">Size M</option>
                                        <option class="rounded-0" value="L">Size L</option>
                                        <option class="rounded-0" value="XL">Size XL</option>
                                        <option class="rounded-0" value="free-size">free-size</option>
                                    </select>
                                </div>
                                <p class="price card-text">${{ item.product.price }}</p>
                
                                <div class="row justify-content-between w-100 m-0">
                                    <div class="input-group" style="width: auto; height: auto;">
                                        <div class="input-group-prepend">
                                            <button class="btn border rounded-0 decrease-btn" type="submit" @click="decreaseQuantity(item)">
                                                <i class="fas fa-minus"></i>
                                            </button>
                                        </div>
                                        <input type="text" id="quantity{{ item.product._id }}" name="quantity"
                                            class="form-control input-number text-center" :value="item.quantity"
                                            min="1" max="20" style="width: 50px;" />
                                        <div class="input-group-append">
                                            <button class="btn border rounded-0 increase-btn" type="submit" @click="increaseQuantity(item)">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <p class="price m-0 mt-2"> <b class="text-dark">Thành tiền:</b> ${{ (item.product.price*item.quantity) }}</p>
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
                <div v-else class="mt-5 mb-5">
                    <p class="h5 text-muted font-italic">Giỏ hàng hiện đang rỗng, hãy quay lại khi đã thêm sản phẩm vào!</p>
                </div>
            </ul>

            <div class="w-100 mb-5 mt-4 d-flex justify-content-between align-items-center">
                <div>
                    <strong>Tổng tiền: </strong>
                    <span  v-if="cart" class="price">{{ cart.total }} $</span>
                    <span  v-else class="price">0.00 $</span>

                </div>
                <button type="button" class="p-2 pl-4 pr-4 rounded-0 btn btn-dark" data-toggle="modal" data-target="#orderNow">Đặt
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
                            <Form @submit="order" :validation-schema="orderFormSchema">
                                <div class="row">
                                    <div class="col-lg-6 form-group">
                                        <label for="name">Tên</label>
                                        <input class="form-control rounded-0" id="name" name="name" v-model="orderTemp.name" type="text" />
                                        <ErrorMessage class="error-feedback" name="name" />
                                    </div>
        
                                    <div class="col-lg-6 form-group">
                                        <label for="phone">Số điện thoại</label>
                                        <input class="form-control rounded-0" id="phone" name="phone" v-model="orderTemp.phone" type="text" />
                                        <ErrorMessage class="error-feedback" name="phone" />
                                    </div>
        
                                    <div class=" col-12 form-group">
                                        <label for="address">Địa chỉ</label>
                                        <input class="form-control rounded-0" name="address" type="text"
                                            v-model="orderTemp.address" label="Địa chỉ" />
                                        <ErrorMessage class="error-feedback" name="address" />
                                    </div>

                                    <div class=" col-12 form-group">
                                        <label for="note">Ghi chú</label>
                                        <textarea class="form-control rounded-0" name="note" as="textarea"
                                            v-model="orderTemp.note" label="Mô tả" />
                                        <ErrorMessage class="error-feedback" name="note" />
                                    </div>
                                </div>
        
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                    <button type="submit" class="btn btn-primary">Lưu</button>
                                </div>
                            </Form> 
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
  
<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import CartService from "@/services/cart.service";
import ProductService from "@/services/product.service";


export default {
    component: {
        Form,
        Field,
        ErrorMessage,
    },
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
            orderFormSchema: yup.object().shape({
                name: yup.string()
                                    .required("Vui lòng nhập họ và tên")
                                    .min(2, "Tên có ít nhất 2 kí tự."),
                phone: yup.string()
                                    .required("Vui lòng nhập số điện thoại")
                                    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa các chữ số")
                                    .min(9, "Số điện thoại phải có ít nhất 9 số")
                                    .max(11, "Số điện thoại có tối đa 11 số"),
                address: yup.string()
                                    .required("Vui lòng nhập địa chỉ")
                                    .min(5, "Tên có ít nhất 2 kí tự."),

                                    
            }),
        };
    },
    async mounted() {
        try {
            window.addEventListener('resize', this.updateScreenWidth);
            this.user = this.$store.getters.getUser;
            console.log(this.user);
            this.orderTemp = {name: this.user.name, phone: this.user.phone};
            console.log(this.orderTemp);
            this.retrieveCart();
        } catch (error) {
            console.log(error);
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },
    methods: {
        async retrieveCart(){
            try {
                const cart = await CartService.get(this.user._id);
                if (cart.items.length != 0 ){
                    this.cart = cart;
                } else {
                    this.cart = null;
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        },
        handleInput() {
           
        },
        async removeItem(productId, size) {
            try {
                await CartService.removeItem(this.user._id, productId, size);
                this.retrieveCart();
                this.$router.push('/cart');
            } catch (error) {
                console.error(error);
            }
        },
        async decreaseQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--;
                await this.updateCartItem(item);
            }
        },

        async increaseQuantity(item) {
            if (item.quantity < 10) {
                item.quantity++;
                await this.updateCartItem(item);
            }
        },
        async updateCartItem(item) {
            try {
                await CartService.update(this.user._id, item.productId, item.quantity, item.size);
                this.retrieveCart();
            } catch (error) {
                console.error(error);
            }
        },
        async order(){

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