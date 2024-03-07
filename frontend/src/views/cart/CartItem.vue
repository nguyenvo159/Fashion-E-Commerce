<template>
    <div v-if=" > 0">
        <div class="card mt-3 flex-row border-right-0 border-left-0 border-top-0">
            <div class="card-img-left d-flex align-items-center" style="height: 154px;">
                <img :src="item.product.imgURL" style="width:154px; height: 100%; object-fit: contain;" class="img-fluid"
                    alt="Ảnh sản phẩm">
            </div>
            <div class="card-body">
                <h5 class="card-title main-hover">{{ item.product.name }}</h5>
                <p class="price card-text">${{ item.product.price }}</p>

                <div class="d-flex justify-content-between">
                    <div class="input-group" style="width: 130px;">
                        <div class="input-group-prepend">
                            <button class="btn border rounded-0 decrease-btn" type="submit" @click="decreaseQuantity">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" id="quantity{{ item.product._id }}" name="quantity"
                            class="form-control input-number text-center" :value="item.quantity"  @input="handleInput"
                            min="1" max="10" />
                        <div class="input-group-append">
                            <button class="btn border rounded-0 increase-btn" type="submit" @click="increaseQuantity">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <p class="price m-0"> <b class="text-dark">Thành tiền: </b> ${{ item.product.price*item.quantity }}</p>
                    </div>
                </div>

            </div>

        </div>
        <div class="mt-2 mr-2 position-absolute" style="right: 0; top: 0;">
            <button class="btn delete-btn" @click="removeItem(item.productId)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </div>
</template>

<script>
import ProductService from "@/services/product.service";
import CartService from "@/services/cart.service";

export default {
    props: {
        item: {} 
    },
    data() {
        return {
            product: null,
            quantity: this.item.quantity,
            size: this.item.size,
        };
    },
    methods: {
        // async updateQuantity(newQuantity) {
        //     // Gọi phương thức CartService để cập nhật số lượng
        //     const userId = localStorage.getItem("userId");
        //     await CartService.updateQuantity(userId, this.productId, newQuantity);

        //     // Phát một sự kiện để cập nhật prop trong thành phần cha
        //     this.$emit("update:quantity", newQuantity);
        // },
        // async decreaseQuantity() {
        //     if (this.localQuantity > 1) {
        //         const newQuantity = this.localQuantity - 1;
        //         this.localQuantity = newQuantity;
        //         await this.updateQuantity(newQuantity);
        //     }
        // },
        // async increaseQuantity() {
        //     if (this.localQuantity < 10) {
        //         const newQuantity = this.localQuantity + 1;
        //         this.localQuantity = newQuantity;
        //         await this.updateQuantity(newQuantity);
        //     }
        // },
        handleInput() {
            // Số lượng từ 1 >= 10
            // if (this.product.quantity < 1) {
            //     this.product.quantity = 1;
            // } else if (this.product.quantity > 10) {
            //     this.product.quantity = 10;
            // }
        },
    },
    async mounted() {
        try {
            this.product = this.item;
        } catch (error) {
            console.error(error);
        }
    },
};
</script>
  