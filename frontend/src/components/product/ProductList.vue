<template>
    <div v-if="shouldRender" class="row justify-content-start mt-3">
        <!-- Card -->
        <div v-for="product in products" :key="product._id" class="mb-3 col-lg-3 col-md-4 col-6">
            <div class="card border-0">
                <a class="icon-cardplus card-overlay bg-none" v-if="product.inventory != 0"
                    @click="addToCart(product._id)">
                    <i class="fa-solid fa-cart-plus"></i>
                </a>
                <img class="card-img-top" :src="product.imgURL" style="height: 240px; width: auto; object-fit: contain;">
                
                <div class="position-absolute empty" v-if="product.inventory == 0">
                    <p class="w-100 text-center h2 pt-3 pb-3 m-0"><strong >HẾT HÀNG</strong></p>
                </div>
                
                <div class="card-body text-center text-justify">
                    <router-link :to="{ name: 'Detail', params: { id: product._id } }" class="h5 card-title main-hover">
                        {{ product.name }}
                    </router-link>
                    <div class="row justify-content-around p-3">
                        <span class="price">${{ product.price? product.price.toFixed(2): '0.00' }}</span>
                        <span class="compare-price">$99.99</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import CartService from "@/services/cart.service";
import ProductService from "@/services/product.service";

export default {
    props: {
        products: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            shouldRender: false
        };
    },
    mounted() {
        setTimeout(() => {
            this.shouldRender = true;
        }, 300); // Thực hiện sau 2 giây
    },
    methods: {
        async addToCart(productId){
            try {
                if(!this.$store.getters.isLoggedIn){
                    window.scrollTo(0, 0);
                    this.$router.push('/login');
                }
                const product = await ProductService.get(productId);
                const user = this.$store.getters.getUser;

                if (product.category == 'Other'){
                    await CartService.update(user._id, productId, 1);
                } else {
                    await CartService.update(user._id, productId, 1, 'M');
                }
                // this.$router.push('/cart');
                $('#addToCartToasts').toast('show');


            } catch(error){
                console.log(error);
            }
        },
    },
};
</script>
  
<style scoped>
.empty{
    width: 100%;
    top: 100px;
    background-color: rgba(75, 75, 75, 0.8);
    color: aliceblue;
}

</style>
  