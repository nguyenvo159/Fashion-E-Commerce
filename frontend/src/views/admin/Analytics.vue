<template>
    <div class="container-fluid pb-4" style="background-color: lightcyan;">
        <div class="row">
            <DashBoard type="Analytics" />
            <div id="dv" class="col-lg-9 col-11 admin-content">
                <h1 class="mb-4">Thống Kê</h1>



                <!-- Hiển thị biểu đồ và dữ liệu thống kê -->
                <div class="row mt-4">
                    <div class="mb-3 col-lg-3 col-12">
                        <div class="card analytics-number1 rounded-0 shadow text-primary">
                            <div class="card-body">
                                <h5 class="card-title">Đơn Hàng Hôm Nay</h5>
                                <p class="card-text">{{ result[0] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3 col-12">
                        <div class="card analytics-number2 rounded-0 shadow text-success">
                            <div class="card-body">
                                <h5 class="card-title">Doanh Thu Hôm Nay</h5>
                                <p class="card-text">{{ result[1] }} $</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3 col-12">
                        <div class="card analytics-number3 rounded-0 shadow text-info">
                            <div class="card-body">
                                <h5 class="card-title">Đơn Hàng Tháng Này</h5>
                                <p class="card-text">{{ result[2] }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3 col-12">
                        <div class="card analytics-number4 rounded-0 shadow text-warning">
                            <div class="card-body">
                                <h5 class="card-title">Doanh Thu Tháng Này</h5>
                                <p class="card-text">{{ result[3] }} $</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4">
                    <form @submit="handleSubmit" class="row">
                        <div class="form-group mb-3 col-lg-3">
                            <select class="form-control" id="selectMonth" v-model="selectedMonth"
                                @change="handleSubmit">
                                <option v-for="month in months" :value="month">Tháng {{ month }}</option>
                            </select>
                        </div>
                        <div class="form-group mb-3 col-lg-3">
                            <select class="form-control" id="selectYear" v-model="selectedYear" @change="handleSubmit">
                                <option v-for="year in years" :value="year">{{ year }}</option>
                            </select>
                        </div>
                        <!-- <div>
                            <button type="submit" class="btn btn-primary">Thống kê</button>
                        </div> -->
                    </form>
                </div>


                <!-- Biểu đồ -->
                <div class="row">
                    <h2 class="mt-4">Doanh Thu Tháng {{ selectedMonth }}/{{ selectedYear }}: <span class="price">{{
                                    revenueMonth }}$</span></h2>
                    <div class="col-lg-12" style="width: 100%; height: 400px;">
                        <canvas class="bg-white shadow p-4" id="areaChart"></canvas>
                        <p class="mt-2 w-100 text-muted text-center font-italic"> Biểu đồ doanh thu tháng
                            {{ selectedMonth }}</p>
                    </div>
                </div>
                <div class="row mt-3">
                    <h2 class="mt-4 w-100">Số Liệu Sản Phẩm</h2>
                    <div class="col-lg-8" style="width: 100%; height: 400px;">
                        <canvas class="bg-white shadow p-4" id="orderChart" style="width: auto;"></canvas>
                        <p class="mt-2 w-100 text-muted text-center font-italic"> Biểu đồ số sản phẩm đã bán</p>
                    </div>
                    <div class="col-lg-4">
                        <canvas class="bg-white shadow p-4" id="pieChart" style="width: auto;"></canvas>
                        <p class="mt-2 w-100 text-muted text-center font-italic"> Biểu đồ tỉ lệ sản phẩm đã bán</p>
                    </div>
                </div>



            </div>
        </div>
    </div>
</template>

<script>
import DashBoard from './DashBoard.vue';
import AnalyticsService from '@/services/analytics.service';
import OrderService from '@/services/order.service';

export default {
    components: {
        DashBoard,
    },
    data() {
        return {
            selectedMonth: new Date().getMonth() + 1,
            selectedYear: new Date().getFullYear(),
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            years: [2022, 2023, 2024],
            areaChartData: {},
            orderChartData: {},
            pieChartData: {},
            result: [0, 0, 0, 0],
            revenueMonth: 0,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async calculate() {
            const orders = await OrderService.getAll();
            const today = new Date();
            const todayOrders = orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate.getDate() === today.getDate() &&
                    orderDate.getMonth() === today.getMonth() &&
                    orderDate.getFullYear() === today.getFullYear();
            });
            this.result[0] = todayOrders.length;

            let todayRevenue = 0;
            todayOrders.forEach(order => {
                todayRevenue += order.total;
            });
            this.result[1] = todayRevenue;

            const monthOrders = orders.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate.getMonth() === today.getMonth() &&
                    orderDate.getFullYear() === today.getFullYear();
            });
            this.result[2] = monthOrders.length;

            let monthRevenue = 0;
            monthOrders.forEach(order => {
                monthRevenue += order.total;
            });
            this.result[3] = monthRevenue;
        }
        ,
        async handleSubmit(event) {
            event.preventDefault();

            this.fetchData();
        },
        async fetchData() {
            try {
                this.calculate();
                const revenue = await AnalyticsService.getRevenue(this.selectedMonth, this.selectedYear);
                const productRatio = await AnalyticsService.getProductRatio(this.selectedMonth, this.selectedYear);

                this.revenueMonth = 0;
                for (let key in revenue) {
                    this.revenueMonth += revenue[key];
                }

                console.log(revenue);
                console.log(productRatio);

                this.updateChartData(revenue, productRatio);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        },
        updateChartData(revenueData, productRatioData) {
            if (this.areaChart) this.areaChart.destroy();
            if (this.orderChart) this.orderChart.destroy();
            if (this.pieChart) this.pieChart.destroy();

            const total = productRatioData[0];
            productRatioData.shift();
            const percentages = productRatioData.map(quantity => (quantity / total) * 100);

            //  biểu đồ miền 
            this.areaChartData = {
                labels: Object.keys(revenueData),
                datasets: [{
                    label: '$',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    data: Object.values(revenueData),
                }]
            };

            // biểu đồ cột 
            this.orderChartData = {
                labels: ['Áo', 'Quần', 'Phụ Kiện'],
                datasets: [{
                    label: 'Cái',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: productRatioData,
                }]
            };

            // biểu đồ tròn 
            this.pieChartData = {
                labels: ['Áo', 'Quần', 'Phụ Kiện'],
                datasets: [{
                    label: "%",
                    data: percentages,
                    backgroundColor: ['#ffcc00', '#ff6666', '#99ff99'],
                    borderWidth: 1,
                }]
            };

            // Vẽ biểu đồ 
            var ctxArea = document.getElementById('areaChart').getContext('2d');
            this.areaChart = new Chart(ctxArea, {
                type: 'line',
                data: this.areaChartData,
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            var ctxOrder = document.getElementById('orderChart').getContext('2d');
            this.orderChart = new Chart(ctxOrder, {
                type: 'bar',
                data: this.orderChartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            var ctxPie = document.getElementById('pieChart').getContext('2d');
            this.pieChart = new Chart(ctxPie, {
                type: 'doughnut',
                data: this.pieChartData,
            });
        },

    },
};
</script>

<style>
.analytics-number1 {
    border-left: 10px blue solid !important;
}

.analytics-number2 {
    border-left: 10px green solid !important;
}

.analytics-number3 {
    border-left: 10px pink solid !important;
}

.analytics-number4 {
    border-left: 10px yellow solid !important;
}
</style>
