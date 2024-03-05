<template>
    <div class="container-fluid">
        <div class="row">
            <div id="dv" :class="{ 'col-10 offset-1': screenWidth >= 450, 'col-11': screenWidth < 450 }">
                <div class="mt-2 mb-2 d-flex justify-content-center">
                    <router-link class="p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        :to="{ name: 'Product' }" style="font-size: 18px;">Tất cả sản phẩm</router-link>
                    <a class="active-bottom p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        hred style="font-size: 18px;">Áo</a>
                    <router-link class="p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        :to="{ name: 'Pant' }" style="font-size: 18px;">Quần</router-link>
                    <router-link class="p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        :to="{ name: 'Other' }" style="font-size: 18px;">Khác</router-link>
                </div>

                <ProductList v-if="products.length > 0" :products="products" />
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
                this.products = await ProductService.getCategory('Shirt');
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
