<template>
    <div class="container-fluid">
        <div class="row">
            <!-- Admin Sidebar -->
            <div class="col-lg-3  admin-sidebar">

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
<style></style>