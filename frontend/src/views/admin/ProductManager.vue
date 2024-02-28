<template>
    <div class="col-lg-9 admin-content">
        <h1 class="mb-4">Quản lý sản phẩm </h1>
        <div class="row mt-4">
            <div class="mb-3 col-lg-3">
                <div class="card bg-primary text-white">
                    <div class="card-body">
                        <h5 class="card-title">Tổng số sản phẩm</h5>
                        <p class="card-text">{{ products.length }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-3 col-lg-3">
                <div class="card bg-success text-white">
                    <div class="card-body">
                        <h5 class="card-title">Áo</h5>
                        <p class="card-text">{{ getCategoryCount('Shirt') }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-3 col-lg-3">
                <div class="card bg-info text-white">
                    <div class="card-body">
                        <h5 class="card-title">Quần</h5>
                        <p class="card-text">{{ getCategoryCount('Pant') }}</p>
                    </div>
                </div>
            </div>
            <div class="mb-3 col-lg-3">
                <div class="card bg-warning text-white">
                    <div class="card-body">
                        <h5 class="card-title">Khác</h5>
                        <p class="card-text">{{ getCategoryCount('Other') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Thêm sản phẩm  -->
        <button class="btn btn-primary mb-3" data-toggle="modal" data-target="#add-product">Thêm
            Sản phẩm</button>


        <table class="table">
            <thead class="thead-light">
                <tr>
                    <th>STT</th>
                    <th><a class="main-hover" @click="sortProductsByName()">Tên</a></th>
                    <th><a class="main-hover" @click="sortProductsByCategory()">Loại</a></th>
                    <th>Giá</th>
                    <th>Ngày thêm</th>
                    <th>Ngày sửa</th>
                    <th>Số lượng</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <div v-if="products.length === 0">No products available.</div>
            <tbody v-else>

                <tr v-for="(product, index) in products" :key="product._id" class="product-item">
                    <td>{{ index + 1 }}</td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.price }}</td>
                    <td>{{ formatDate(product.createdAt) }}</td>
                    <td>{{ formatDate(product.updatedAt) }}</td>

                    <td>{{ product.inventory }}</td>
                    <td>
                        <a class="mr-2" data-toggle="modal" data-target="#update-product">Sửa</a>
                        <a class="cursor-pointer" data-toggle="modal" data-target="#delete-product"
                            @click="confirmDelete(product)">Xóa</a>
                    </td>
                </tr>

            </tbody>

        </table>
        <InputProduct :product="newProduct" @submit:product="createProduct" title="Thêm Sản Phẩm" modalId="add-product" />
        <InputProduct title="Chỉnh Sửa Sản Phẩm" modalId="update-product" />
        <NotificationModal modalId="delete-product" title="Xác Nhận Xóa" :message="message" :confirmAction="deleteProduct"
            :productIdToDelete="productToDelete" />
    </div>
</template>

<script>
import { format } from 'date-fns';
import ProductService from '@/services/product.service';
import InputProduct from '@/components/admin/InputProduct.vue';
import NotificationModal from '@/components/NotificationModal.vue';

export default {
    components: {
        InputProduct,
        NotificationModal,
    },
    data() {
        return {
            products: [],
            newProduct: {
                name: "",
                price: 0,
                inventory: 0,
                category: "",
                imgURL: "",
                description: "",
            },
            message: "",
            productToDelete: null,
        };
    },
    async created() {
        this.retrieveProducts();

    },
    methods: {

        getCategoryCount(category) {
            return this.products.filter(product => product.category == category).length;
        },

        formatDate(date) {
            const formattedDate = format(new Date(date), "dd/MM/yyyy HH:mm");
            return formattedDate;
        },

        // Sắp xếp
        sortProductsByName() {
            this.products.sort((a, b) => a.name.localeCompare(b.name));
        },

        sortProductsByCategory() {
            this.products.sort((a, b) => a.category.localeCompare(b.category));
        },
        confirmDelete(product) {
            this.productToDelete = product._id;
            this.message = `Bạn có chắn chắn muốn xóa sản phẩm \"${product ? product.name : ''}\" ?`;
        },
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async createProduct(data) {
            try {
                await ProductService.create(data);
            } catch (error) {
                console.log(error);
            }
        },
        async deleteProduct(id) {
            try {
                await ProductService.delete(id);
                this.retrieveProducts();
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        this.retrieveProducts();
    }
};
</script>
<style>
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
}

.admin-sidebar {
    position: fixed;
    width: 250px;
    height: 100%;
    background-color: #343a40;
    padding-top: 20px;
    color: #ffffff;
    transition: width 0.3s;
}

.admin-content {
    margin-left: 275px;
    padding: 20px;
    transition: margin-left 0.3s;
    /* Thêm hiệu ứng chuyển động cho Admin Content */
}

.admin-sidebar a {
    color: #ffffff;
    text-decoration: none;
    padding: 10px;
    display: block;
}

.admin-sidebar a:hover {
    background-color: #555;
    border-radius: 10px;
}

.admin-sidebar a.active {
    background-color: #007bff;
    border-radius: 10px;
}

.admin-sidebar i {
    margin-right: 8px;
    font-size: 16px;
}


/* Hiệu ứng width */

@media (max-width: 768px) {
    .admin-sidebar {
        width: 65px;
    }

    .admin-sidebar span {
        display: none;
    }

    .admin-content {
        margin-left: 70px;
    }

}
</style>