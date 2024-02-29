<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Admin Sidebar -->
            <div class="col-lg-3 admin-sidebar" style="border-radius: 0 25px 0 0;">

                <h3 style="height: 52px;"><span>Quản Trị</span></h3>

                <a href="admin.html" class=""><i class="fas fa-chart-bar"></i><span>Thống Kê</span></a>
                <a href="user.html" class=""><i class="fas fa-user"></i><span>User</span></a>
                <a href="product.html" class="active"><i class="fas fa-box"></i><span>Product</span></a>
                <a href="order.html" class=""><i class="fas fa-shopping-cart"></i><span>Order</span></a>
                <a href="#" class=""><i class="fas fa-sign-out-alt"></i><span>Thoát</span></a>
            </div>

            <ProductManager />

        </div>
    </div>
</template>

<script>
import ProductManager from '@/views/admin/ProductManager.vue';

export default {
    components: {
        ProductManager,
    }
}

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