<template>
    <div class="container-fluid">
        <div class="row">
            <div id="dv" :class="{ 'col-10 offset-1': screenWidth >= 450, 'col-11': screenWidth < 450 }">
                <router-link :to="{ name: 'Product' }" class="h4 mt-3 main-hover">
                    Product
                </router-link>

                <ProductList :products="products" />
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "@/components/product/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        ProductList,
    },
    data() {
        return {
            products: [],
            screenWidth: window.innerWidth,
        };
    },
    mounted() {
        this.retrieveProducts();
        window.addEventListener('resize', this.updateScreenWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
    },
};
</script>

<style scoped></style>
