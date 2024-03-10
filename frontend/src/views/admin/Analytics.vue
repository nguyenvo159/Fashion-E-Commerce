<template>
    <div class="container-fluid pb-4" style="background-color: lightcyan;">
        <div class="row" >
            <DashBoard type="Analytics"/>
            <div id="dv" class="col-lg-9 col-12 admin-content">
                <h1 class="mb-4">Thống Kê</h1>
        
                <!-- Thêm các điều khiển cho việc chọn tháng và năm -->
                <div class="row mt-4">
                    <div class="mb-3 col-lg-3">
                        <label for="selectMonth">Tháng:</label>
                        <select id="selectMonth" v-model="selectedMonth" @change="fetchData">
                            <option v-for="month in months" :value="month">{{ month }}</option>
                        </select>
                    </div>
                    <div class="mb-3 col-lg-3">
                        <label for="selectYear">Năm:</label>
                        <select id="selectYear" v-model="selectedYear" @change="fetchData">
                            <option v-for="year in years" :value="year">{{ year }}</option>
                        </select>
                    </div>
                </div>
                
                <!-- Hiển thị biểu đồ và dữ liệu thống kê -->
                <div class="row mt-4">
                    <div class="mb-3 col-lg-3">
                        <div class="card bg-primary text-white">
                            <div class="card-body">
                                <h5 class="card-title">Đơn Hàng Hôm Nay</h5>
                                <p class="card-text">0</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3">
                        <div class="card bg-success text-white">
                            <div class="card-body">
                                <h5 class="card-title">Doanh Thu Hôm Nay</h5>
                                <p class="card-text">0</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3">
                        <div class="card bg-info text-white">
                            <div class="card-body">
                                <h5 class="card-title">Đơn Hàng Tháng Này</h5>
                                <p class="card-text">0</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3">
                        <div class="card bg-warning text-white">
                            <div class="card-body">
                                <h5 class="card-title">Doanh Thu Tháng Này</h5>
                                <p class="card-text">0</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            
                <div class="row">
                    <div class="col-lg-12">
                        <h2 class="mt-4">Doanh Thu Tháng Này</h2>
                        <canvas id="areaChart" style="width: 100%; "></canvas>
                    </div>
                </div>
            
                <div class="row">
                    <h2 class="mt-4 w-100">Tỷ Lệ Sản Phẩm</h2>
                    <div class="col-lg-8">
                        <canvas id="orderChart" style="width: auto;"></canvas>
                    </div>
                    <div class="col-lg-4">
                        <canvas id="pieChart" style="width: auto;"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DashBoard from './DashBoard.vue';
import AnalyticsService from '@/services/analytics.service';

export default {
    components: {
        DashBoard,
    },
    data() {
        return {
            selectedMonth: 3,
            selectedYear: 2024,
            months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
            years: [2022, 2023, 2024], // Có thể thay đổi phù hợp với nhu cầu của bạn
            areaChartData: {},
            orderChartData: {},
            pieChartData: {},
        };
    },
    mounted() {
        // Ban đầu, lấy dữ liệu cho biểu đồ
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                // Gọi API để lấy dữ liệu thống kê
                const revenue = await AnalyticsService.getRevenue(this.selectedMonth, this.selectedYear);
                const productRatio = await AnalyticsService.getProductRatio(this.selectedMonth, this.selectedYear);
                console.log(revenue);
                console.log(productRatio);

                this.updateChartData(revenue, productRatio);
            } catch (error) {
                console.error('Error fetching analytics data:', error);
            }
        },
        updateChartData(revenueData, productRatioData) {
            const total = productRatioData[0];
            productRatioData.shift();
            const percentages = productRatioData.map(quantity => (quantity / total) * 100);
            // Cập nhật dữ liệu cho biểu đồ miền (area chart)
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

            // Cập nhật dữ liệu cho biểu đồ cột (bar chart)
            this.orderChartData = {
                labels: [ 'Áo', 'Quần', 'Phụ Kiện'],
                datasets: [{
                    label: 'Cái',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: productRatioData, 
                }]
            };

            // Cập nhật dữ liệu cho biểu đồ tròn (pie chart)
            this.pieChartData = {
                labels: [ 'Áo', 'Quần', 'Phụ Kiện'],
                datasets: [{
                    label: "%",
                    data: percentages,
                    backgroundColor: ['#ffcc00', '#ff6666', '#99ff99'],
                    borderWidth: 1,
                }]
            };

            

            // Sau khi cập nhật dữ liệu, bạn có thể vẽ lại biểu đồ tại đây nếu cần
            var ctxArea = document.getElementById('areaChart').getContext('2d');
            var areaChart = new Chart(ctxArea, {
                type: 'line',
                data: this.areaChartData,
                options: {
                scales: {
                    y: {
                    beginAtZero: true
                    }
                }
                }
            });

            var ctxOrder = document.getElementById('orderChart').getContext('2d');
            var orderChart = new Chart(ctxOrder, {
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
            var pieChart = new Chart(ctxPie, {
                type: 'doughnut',
                data: this.pieChartData,
            });
        },
    },
};
</script>

<style scoped>
/* Thêm CSS scoped nếu cần */
</style>
