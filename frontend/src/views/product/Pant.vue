<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div id="dv" class="col-lg-10 col-12">
                <div class="mt-2 mb-2 d-flex justify-content-center">
                    <router-link class="p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        :to="{ name: 'Product' }" style="font-size: 18px;">Tất cả</router-link>
                    <router-link class="p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        :to="{ name: 'Shirt' }" style="font-size: 18px;">Áo</router-link>
                    <router-link class="active-bottom p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        :to="{ name: 'Pant' }" style="font-size: 18px;">Quần</router-link>
                    <router-link class="p-3 pr-4 pl-4 font-weight-bold main-hover text-decoration-none"
                        :to="{ name: 'Other' }" style="font-size: 18px;">Khác</router-link>
                </div>
                <div class="d-flex mt-4 align-items-center">
                    <span class="mr-2">Sắp xếp: </span>
                    <select class="form-control p-1 select-arrange" v-model="sortOption" @change="sortProducts">
                        <option value="default">Mặc định</option>
                        <option value="newest">Mới nhất</option>
                        <option value="priceLowToHigh">Giá tăng dần</option>
                        <option value="priceHighToLow">Giá giảm dần</option>
                    </select>
                </div>

                <ProductList v-if="products.length >0" :products="products" />
                    
                <div v-else>
                    <h5 class="mt-5 mb-5">Không có dữ liệu.</h5>
                </div>
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
            sortOption: 'default',
        };
    },
    mounted() {
        this.retrieveProducts();
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getCategory('Pant');
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        sortProducts() {
            switch (this.sortOption) {
                case 'default':
                    this.retrieveProducts();
                    break;
                case 'priceLowToHigh':
                    this.products.sort((a, b) => a.price - b.price);
                    break;
                case 'priceHighToLow':
                    this.products.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    this.products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                default:
                    break;
            }
        },
    },
};
</script>

<style scoped>

</style>
