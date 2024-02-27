<template>
    <div>
        <h1>Product List</h1>
        <div v-if="loading">Loading...</div>
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
            products: [], // Danh sách sản phẩm
            loading: false // Trạng thái loading
        };
    },
    async created() {
        this.loading = true;
        try {
            // Khởi tạo ProductService
            this.products = await ProductService.getAll(); // Gọi hàm getAll() để lấy danh sách sản phẩm
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            this.loading = false;
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
  