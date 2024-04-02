<template>
    <div class="container-fluid row justify-content-center m-0 p-0">
        <div id="carouselExampleIndicators" class="col-11 carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1" class=""></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2" class=""></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100"
                        src="https://amiri.com/cdn/shop/files/DESKTOP_-slideshow-banner_desktop_core.png"
                        alt="First slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100"
                        src="https://amiri.com/cdn/shop/files/Slideshow-Banner_Desktop_AW23-Mens-6D.jpg"
                        alt="Second slide">
                </div>
                <div class="carousel-item">
                    <img class="d-block w-100"
                        src="https://amiri.com/cdn/shop/files/Slideshow-Banner_Desktop_AW23-Womens-1.jpg"
                        alt="Third slide">
                </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>

        <div class="container-fluid mt-5 mb-5 d-flex justify-content-center">
            <div class="row justify-content-center align-items-center w-50">
                <h2>Enjoy Your Youth!</h2>
                <div class="col-12 text-center text-justify">
                    <p class="">Không chỉ là thời trang, Amiri còn là “phòng thí nghiệm” của tuổi trẻ - nơi
                        nghiên cứu và cho ra đời nguồn năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên
                        những trải nghiệm vui vẻ, năng động và trẻ trung.</p>
                    <br>
                </div>
            </div>
            <br><br><br><br>
        </div>
        <div class="row mt-0 p-0 w-100">
            <div class="col-10 offset-1">
                <router-link :to="{ name: 'Shirt' }" class="main-hover">
                    <h4 class="mt-3">
                        Áo thun
                    </h4>
                </router-link>

                <ProductList v-if="shirts.length > 0" :products="shirts" />
                <p v-else>Don't have any shirt.</p>


                <router-link :to="{ name: 'Pant' }" class="main-hover">
                    <h4 class="mt-3">
                        Quần
                    </h4>
                </router-link>
                <ProductList v-if="pants.length > 0" :products="pants" />
                <p v-else>Don't have any pant.</p>

                <router-link :to="{ name: 'Other' }" class="main-hover">
                    <h4 class="mt-3">
                        Phụ kiện
                    </h4>
                </router-link>
                <!-- </router-link> -->
                <ProductList v-if="others.length > 0" :products="others" />
                <p v-else>Don't have any other.</p>
            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "@/components/product/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
    components: {
        ProductList,
    },
    data() {
        return {
            shirts: [],
            pants: [],
            others: [],
            maxProductsToShow: 8, // Số lượng sản phẩm tối đa để hiển thị
        };
    },
    async created() {
        this.retrieveShirts();
        this.retrievePants();
        this.retrieveOthers();
    },
    methods: {
        async retrieveShirts() {
            try {
                this.shirts = await ProductService.getCategory('Shirt');
                this.shirts = this.shirts.slice(0, this.maxProductsToShow);
            } catch (error) {
                console.log(error);
            }
        },
        async retrievePants() {
            try {
                this.pants = await ProductService.getCategory('Pant');
                this.pants = this.pants.slice(0, this.maxProductsToShow);
            } catch (error) {
                console.log(error);
            }
        },
        async retrieveOthers() {
            try {
                this.others = await ProductService.getCategory('Other');
                this.others = this.others.slice(0, this.maxProductsToShow);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveShirts();
            this.retrievePants();
            this.retrieveOthers();
        },
    },
    mounted() {
        console.log("Component is mounted!");
        this.refreshList();
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>