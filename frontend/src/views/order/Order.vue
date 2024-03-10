<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div id="dv" :class="{ 'col-10 offset-1': screenWidth >= 450, 'col-11': screenWidth < 450 }">
                <h2 class="mt-2 mb-2">Đơn Hàng</h2>
                <div class="row" v-if="orders.length !=0 ">
                    <ul  class="col-lg-8 offset-lg-2 col-12 pl-0" style="min-height: 200px;">
                        <li v-for="order in orders.slice().reverse()" :key="order._id" class="mb-4 p-3 shadow position-relative list-unstyled">
                            <div class="p-2 position-relative">
                                <p class="m-0 pb-2 border-bottom">ID: {{order._id}}</p>
                                <p class="text-muted font-italic position-absolute" style="right: 10px; top: 10px;">
                                    {{showStatus(order.status)}}</p>
                            </div>
                            <div class="card mt-3 flex-row border-0 rounded-0">
                                <div class="card-img-left d-flex align-items-center" style="height: auto">
                                    <img :src="order.items[0].product.imgURL" style="width:100px; height: auto; object-fit: contain;" class="img-fluid"
                                        alt="Ảnh sản phẩm">
                                </div>
                                <div class="card-body p-2 position-relative">
                                    <router-link class="card-title main-hover" :to="{ name: 'Detail', params: { id: order.items[0].productId } }" >
                                        <strong>{{ order.items[0].product.name }}</strong></router-link>
                                    <div class="mb-2 mt-2">
                                        <p>Size: {{ order.items[0].size }}</p>
                                    </div>
                                    <p class="card-text">x{{ order.items[0].quantity }}</p>
                                    <div class="position-absolute" style="right: 20px; bottom: 20px;">
                                        <p class="price">${{ order.items[0].product.price }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="border-top p-2 position-relative">
                                <p class="w-100 mt-3 text-right">Tổng tiền: <span class="price">{{ order.total ? order.total.toFixed(2) : '0.00' }}$</span></p>
                                <a class="mt-3 text-decoration-none font-italic position-absolute cursor-pointer" style="top: 10px;"
                                    @click="confirmDetail(order)">Xem chi tiết</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-else class="mt-5">
                    <p class="h5 text-muted font-italic">Giỏ hàng hiện đang rỗng, hãy quay lại khi đã thêm sản phẩm vào!</p>

                </div>

            </div>
            <InputOrder :order="order" @close="closeModal" title="Thông tin đơn hàng"
            modalId="detail-order"/>

        </div>
    </div>
</template>

<script>
import OrderService from '@/services/order.service';
import InputOrder from '@/components/admin/InputOrder.vue';


export default {
    components: {
        InputOrder,
    },
    data(){
        return {
            orders: [],
            user: null,
            order: null,
            screenWidth: window.innerWidth,
        }
    },
    mounted() {
        this.user = this.$store.getters.getUser,
        this.retrieveOrders();
        window.addEventListener('resize', this.updateScreenWidth);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScreenWidth);
    },
    methods: {
        async retrieveOrders(){
            try {
                this.orders = await OrderService.getAllOfUser(this.user._id);

            }catch (error){
                this.orders = [],
                console.log(error);
            }
        },
        confirmDetail(order){
            this.order = order;
            $('#detail-order').modal('show');
        },
        closeModal() {
            $('#detail-order').modal('hide');
            this.retrieveOrders();
        },
        showStatus(status) {
            switch (status) {
                case 'Pending':
                    return 'Đang xử lý';
                case 'Confirmed':
                    return 'Đã xác nhận';
                case 'Shipping':
                    return 'Đang vận chuyển';
                case 'Done':
                    return 'Đã vận chuyển';
                default:
                    return 'Trạng thái không xác định';
            }
        },
        updateScreenWidth() {
            this.screenWidth = window.innerWidth;
        },
    },
}
</script>