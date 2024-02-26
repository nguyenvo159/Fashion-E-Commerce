<template>
    <div class="row justify-content-start">
        <!-- Card -->
        <div v-for="product in products" :key="product._id" class="mb-3 col-lg-3 col-md-4 col-6">
            <div class="card border-0">
                <img class="card-img-top" :src="product.imgURL" style="height: 240px; width: auto; object-fit: contain;">
                <a class="icon-cardplus card-overlay">
                    <i class="fa-solid fa-cart-plus"></i>
                </a>
                <div class="card-body text-center text-justify">
                    <h5 class="card-title main-hover">{{ product.name }}</h5>
                    <div class="row justify-content-around p-3">
                        <span class="price">${{ product.price }}</span>
                        <span class="compare-price">$99.99</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        products: {
            type: Array,
            required: true
        }
    }
};
</script>
  
<style scoped></style>
  