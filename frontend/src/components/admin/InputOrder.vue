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
                                <input class="form-control" id="name" name="name" v-model="orderLocal.name" type="text" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="status">Trạng thái</label>
                                <select class="form-control " name="status" v-model="orderLocal.status">
                                    <option value="Pending">Chờ xử lý</option>
                                    <option value="Confirmed">Đã xác nhận</option>
                                    <option value="Shipping">Đang giao</option>
                                    <option value="Done">Đã giao</option>
                                </select>
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="createdAt">Ngày đặt</label>
                                <input class="form-control" id="createdAt" name="createdAt" v-model="orderLocal.createdAt" type="text" />
                            </div>

                            <div class="col-lg-6 form-group">
                                <label for="phone">Số điện thoại</label>
                                <input class="form-control" id="phone" name="phone" v-model="orderLocal.phone" type="text" />
                            </div>

                            <div class="col-lg-12 form-group">
                                <label for="address">Địa chỉ</label>
                                <textarea class="form-control" id="address" name="address" v-model="orderLocal.address"
                                    type="text" />
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            <button type="submit" class="btn btn-primary">Lưu</button>
                        </div>
                    </form>
                    <div>
                        <p>Đơn hàng gồm:</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import OrderService from '@/services/order.service';

export default {
    components: {
        
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
        submitOrder() {
            const status = {status: this.orderLocal.status};
            this.$emit('submit:order', status);
            this.$emit('close');
        },
    },

};
</script>
  

<style>

.btn:focus {
    outline: none !important;
    box-shadow: none !important;
}
</style>