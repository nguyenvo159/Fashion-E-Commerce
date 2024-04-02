<template>
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit="submitOrder">
                        <div class="row">
                            <div class="col-lg-6 form-group">
                                <label for="name">Tên</label>
                                <input class="form-control" id="name" name="name" v-model="orderLocal.name" type="text"
                                    readonly />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="status">Trạng thái</label>
                                <select class="form-control " name="status" v-model="orderLocal.status"
                                    :disabled="isOrderRoute" :readonly="!isAdmin">
                                    <option value="Pending">Chờ xử lý</option>
                                    <option value="Confirmed">Đã xác nhận</option>
                                    <option value="Shipping">Đang giao</option>
                                    <option value="Done">Đã giao</option>
                                </select>
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="createdAt">Ngày đặt</label>
                                <input class="form-control" id="createdAt" name="createdAt"
                                    :value="formatDate(orderLocal.createdAt)" type="text" readonly />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="phone">Số điện thoại</label>
                                <input class="form-control" id="phone" name="phone" v-model="orderLocal.phone"
                                    type="text" readonly />
                            </div>

                            <div class="col-lg-12 form-group">
                                <label for="address">Địa chỉ</label>
                                <textarea class="form-control" id="address" name="address" v-model="orderLocal.address"
                                    type="text" readonly />
                            </div>
                            <div class="col-lg-12">
                                <p class="text-muted font-italic"><strong>Note: </strong> {{ orderLocal.note ?
        orderLocal.note : 'Không có ghi chú' }}</p>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="deleteOrder"
                                :disabled="orderLocal.status != 'Pending' && orderLocal.status != 'Confirmed'">Xóa đơn
                                hàng</button>
                            <button type="submit" class="btn btn-primary" v-if="isAdmin && !isOrderRoute">Lưu</button>
                        </div>
                    </form>
                    <div class="row container-fluid">
                        <p class="w-100">Đơn hàng gồm:</p>
                        <div class="card mb-3 rounded-0 flex-row col-12" v-for="(item, index) in orderLocal.items"
                            :key="index">
                            <div class="card-img-left d-flex align-items-center">
                                <img :src="item.product.imgURL" style="width:80px; height: 80px; object-fit: contain;"
                                    class="img-fluid" alt="Ảnh sản phẩm">
                            </div>
                            <div class="pl-3 card-body position-relative p-2">
                                <strong class="card-title main-hover">{{ item.product.name }}</strong>

                                <p class="text-muted font-italic mb-2" style="font-size: 12px;">Size: {{ item.size }}
                                </p>
                                <p class="price card-text"> <i>${{ item.product.price }}</i> </p>

                                <div class="position-absolute" style="right: 20px; bottom: 10px;">
                                    <p class="">x{{ item.quantity }}</p>
                                </div>
                            </div>

                        </div>
                        <p class="w-100 text-right">Thành tiền: <span class="price">
                                {{ orderLocal.total ? (orderLocal.total < 52 ? (orderLocal.total - 3).toFixed(2) :
        orderLocal.total.toFixed(2)) : '0.00' }}$ </span>
                        </p>
                        <p class="w-100 text-right">Phí vận chuyển: <span class="price">
                                {{ orderLocal.total ? (orderLocal.total < 52 ? '3.00' : '0.00') : '0.00' }}$ </span>
                        </p>
                        <p class="w-100 text-right">Tổng tiền: <span class="price">
                                {{ orderLocal.total ? orderLocal.total.toFixed(2) : '0.00' }}$
                            </span></p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
import OrderService from '@/services/order.service';


export default {
    computed: {
        isAdmin() {
            return this.$store.getters.isAdmin;
        },
        isOrderRoute() {
            return this.$route.path === '/order';
        }
    },
    emits: ['submit:order'],
    props: {
        order: { type: Object, required: true },
        modalId: { type: String, required: true },
        title: { type: String, required: true }
    },
    watch: {
        order: {
            handler(newVal) {
                this.orderLocal = { ...newVal };
            },
            deep: true
        }
    },
    data() {
        return {
            orderLocal: { ...this.order },
        };
    },
    methods: {
        formatDate(date) {
            if (!date) return '';
            const formattedDate = format(new Date(date), "HH:mm dd/MM/yyyy");
            return formattedDate;
        },
        submitOrder(event) {
            event.preventDefault();
            const status = { status: this.orderLocal.status };
            this.$emit('submit:order', status);
            this.$emit('close');
        },
        async deleteOrder() {
            try {
                // console.log(this.orderLocal);
                await OrderService.delete(this.orderLocal._id);
                this.$emit('close');

            } catch (error) {
                console.log(error);
            }
        }
    },

};
</script>


<style>
.btn:focus {
    outline: none !important;
    box-shadow: none !important;
}
</style>