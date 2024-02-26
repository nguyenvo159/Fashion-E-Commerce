<template>
    <div>
        <h1>Product List</h1>
        <br>
        <router-link :to="{ name: 'Product' }">
            Product
        </router-link>
        <br>
        <div v-if="products.length === 0">No products available.</div>
        <div v-else>
            <div v-for="product in products" :key="product._id" class="product-item">
                <img :src="product.imgURL" :alt="product.name" />
                <div>
                    <h2>{{ product.name }}</h2>
                    <p>Category: {{ product.category }}</p>
                    <p>Price: {{ product.price }}</p>
                    <p>Description: {{ product.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import ProductService from '@/services/product.service'; // Import ProductService

export default {
    data() {
        return {
            products: []
        };
    },
    async created() {
        try {
            // Khởi tạo ProductService
            this.products = await ProductService.getAll(); // Gọi hàm getAll() để lấy danh sách sản phẩm
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
};
</script>
  
<style scoped>
.product-item {
    display: flex;
    margin-bottom: 20px;
}

.product-item img {
    width: 100px;
    height: auto;
    margin-right: 20px;
}
</style>
  