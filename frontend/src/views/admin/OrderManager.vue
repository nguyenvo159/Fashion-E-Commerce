<template>
    <div class="container-fluid pb-4" style="background-color: lightcyan;">
        <div class="row">
            <DashBoard type="Order" />
            <div id="dv" class="col-lg-9 col-11 admin-content">
                <h1 class="mb-4">Quản Lý Đơn Hàng </h1>
                <div class="d-flex">
                    <InputSearch v-model="searchText" />

                    <button class="btn pb-4 ml-3 m" style="box-shadow: none;" @click="refreshList()">
                        <i class="main-hover fa-solid fa-rotate-right" style="font-size: 24px;"></i></button>
                </div>


                <table class="table shadow bg-white">
                    <thead class="thead-light">
                        <tr>
                            <th class="align-middle text-center">STT</th>
                            <th>Mã</th>
                            <th>Tên</th>
                            <th>Liên hệ</th>
                            <th><a class="cursor-pointer text-decoration-none" @click="sortDate()"
                                    style="color: #495057; user-select: none;">Ngày đặt</a></th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <div v-if="orders.length == 0">No orders available.</div>
                    <tbody v-else>

                        <tr v-for="(order, index) in filteredOrders" :key="order._id" class="product-item">
                            <td class="align-middle text-center">{{ index + 1 }}</td>
                            <td class="pl-0 pr-0">{{ order._id }}</td>
                            <td>{{ order.name }}</td>
                            <td>{{ order.phone }}, {{ order.address }}</td>
                            <td>{{ formatDate(order.createdAt) }}</td>
                            <td>{{ order.total ? order.total.toFixed(2) : '0.00' }}</td>
                            <td class="text-center">
                                <a class="cursor-pointer font-italic text-decoration-none" data-toggle="modal"
                                    data-target="#update-order" @click="confirmUpdate(order)">{{ order.status }}</a>
                            </td>
                        </tr>

                    </tbody>

                </table>

                <InputOrder :order="order" @submit:order="updateOrder" @close="closeModal" title="Thông tin đơn hàng"
                    modalId="update-order" />
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
import OrderService from '@/services/order.service';
import DashBoard from './DashBoard.vue';
import InputSearch from '@/components/InputSearch.vue';
import InputOrder from '@/components/admin/InputOrder.vue';

export default {
    components: {
        DashBoard,
        InputSearch,
        InputOrder,
    },
    data() {
        return {
            orders: [],
            activeIndex: -1,
            searchText: "",
            order: null,
            sortByDateAsc: true
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        orderStrings() {
            return this.orders.map((order) => {
                const { _id, name, address, status, createdAt, phone } = order;
                const date = this.formatDate(createdAt);
                return [_id.toLocaleLowerCase(), name.toLowerCase(), address.toLowerCase(), status.toLowerCase(), date.toLowerCase(), phone].join("");
            });
        },
        filteredOrders() {
            if (!this.searchText.trim()) return this.orders;
            return this.orders.filter((_order, index) =>
                this.orderStrings[index].includes(this.searchText.toLocaleLowerCase())
            );
        },
    },
    async created() {
        this.retrieveOrders();

    },
    methods: {
        refreshList() {
            this.retrieveOrders();
            this.activeIndex = -1;
            this.searchText = "";
        },
        closeModal() {
            $('#update-order').modal('hide');
            this.retrieveOrders();
        },
        formatDate(date) {
            const formattedDate = format(new Date(date), "dd/MM/yyyy HH:mm");
            return formattedDate;
        },
        confirmUpdate(order) {
            this.order = order;
        },
        sortDate() {
            this.orders.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (this.sortByDateAsc) {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            });
            this.sortByDateAsc = !this.sortByDateAsc;
        },
        async retrieveOrders() {
            try {
                this.orders = await OrderService.getAll();
                this.orders.sort((a, b) => {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return dateB - dateA;
                });
            } catch (error) {
                console.log(error);
            }
        },
        async updateOrder(status) {
            try {
                await OrderService.update(this.order._id, status);
                this.retrieveOrders();
            } catch (error) {
                console.log(error);
            }
        },
        async delete() {
            try {
                await OrderService.delete(this.order._id);
                this.retrieveOrders();
            } catch (error) {
                console.log(error);
            }
        }

    },
    mounted() {
        this.refreshList();
    }
};
</script>
<style></style>