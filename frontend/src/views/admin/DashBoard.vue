<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Admin Sidebar -->
            <div class="col-lg-3  admin-sidebar">

                <!-- <h4 class="m-0 pt-2" style="height: 52px;"><span>Admin</span></h4> -->
                <h3 style="height: 52px;"><span>Quản Trị</span></h3>

                <a href="admin.html" class=""><i class="fas fa-chart-bar"></i><span>Thống Kê</span></a>
                <a href="user.html" class=""><i class="fas fa-user"></i><span>User</span></a>
                <a href="product.html" class="active"><i class="fas fa-box"></i><span>Product</span></a>
                <a href="order.html" class=""><i class="fas fa-shopping-cart"></i><span>Order</span></a>
                <a href="#" class=""><i class="fas fa-sign-out-alt"></i><span>Thoát</span></a>
            </div>

            <!-- Admin Content -->
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
                <button class="btn btn-primary mb-3">Thêm Sản phẩm</button>
                <table class="table">
                    <thead class="thead-light">
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Giá</th>
                            <th>Ngày thêm</th>
                            <th>Ngày sửa</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <div v-if="products.length === 0">No products available.</div>
                    <tbody v-else>

                        <tr v-for="product in products" :key="product._id" class="product-item">
                            <td>1</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ product.createdAt }}</td>
                            <td>{{ product.updatedAt }}</td>
                            <td>{{ product.inventory }}</td>
                            <td>
                                <a class="mr-2  ">Sửa</a>
                                <a class="">Xóa</a>
                            </td>
                        </tr>

                    </tbody>

                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ProductService from '@/services/product.service';

export default {
    data() {
        return {
            products: []
        };
    },
    async created() {
        try {
            this.products = await ProductService.getAll();
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    },
    methods: {
        getCategoryCount(category) {
            return this.products.filter(product => product.category == category).length;
        }
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