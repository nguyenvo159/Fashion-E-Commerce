<template>
    <div class="container-fluid">
        <div v-if="product" class=" col-lg-10 offset-lg-1 row">
            <div class="mt-3 mb-3 col-12">
                <h2>Sản phẩm
                    / {{ product.category }}
                </h2>
            </div>

            <!-- Ảnh  -->
            <div class="col-lg-7 col-12 mr-3">
                <div id="carouselExampleControls" class="carousel slide border" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item">
                            <img :src="product.imgURL" class="d-block w-100" style="height: 500px; object-fit: contain;"
                                alt="image">
                        </div>
                        <div class="carousel-item active">
                            <img :src="product.imgURL" class="d-block w-100" style="height: 500px; object-fit: contain;"
                                alt="image">
                        </div>
                        <div class="carousel-item">
                            <img :src="product.imgURL" class="d-block w-100" style="height: 500px; object-fit: contain;"
                                alt="image">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-target="#carouselExampleControls"
                        data-slide="prev">
                        <span class="" aria-hidden="true">
                            <i class="fa-solid fa-chevron-left" style="color: #000;"></i>
                        </span>
                        <span class="sr-only">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-target="#carouselExampleControls"
                        data-slide="next">
                        <span class="" aria-hidden="true">
                            <i class="fa-solid fa-chevron-right" style="color: #000;"></i>
                        </span>
                        <span class="sr-only">Next</span>
                    </button>
                </div>
            </div>


            <div class="m-4 col-lg-4 col-12">
                <h3 class="card-title main-hover">{{ product.name }}</h3>
                <hr>
                <h4><span class="price">${{ product.price }}</span></h4> <br>
                <div>
                    <p>Thông tin sản phẩm: <br>
                        {{ product.description }}</p>
                </div>
                <br>
                <div class="form-check d-flex p-0 mb-3">
                    <p class="pr-3 mb-2">Kích thước: </p>
                    <div v-if="product.category != 'Other'" class="d-flex">
                        <div class="">
                            <label class="form-check-label size" for="S" @click="selectSize('S')"
                                :class="{ 'selected-size': selectedSize === 'S' }">S</label>
                            <input class="form-check-input d-none" type="radio" name="size" id="S" value="S">
                        </div>

                        <div class="ml-4">
                            <input class="form-check-input d-none" type="radio" name="size" id="M" value="M">
                            <label class="form-check-label size" for="M" @click="selectSize('M')"
                                :class="{ 'selected-size': selectedSize === 'M' }">M</label>
                        </div>

                        <div class="ml-4">
                            <input class="form-check-input d-none" type="radio" name="size" id="L" value="L">
                            <label class="form-check-label size" for="L" @click="selectSize('L')"
                                :class="{ 'selected-size': selectedSize === 'L' }">L</label>
                        </div>
                    </div>

                    <div v-else class="ml-4">
                        <span>
                            <i>Free size</i>
                        </span>
                    </div>

                </div>
                <p><a data-toggle="modal" data-target="#instruction"
                        class="cursor-pointer text-decoration-none error-feedback"> + Hướng dẫn chọn size</a></p>


                <p>Số lượng:</p>
                <div class="row d-flex w-100 ml-1">
                    <div class="input-group mb-3" style="width: 130px;">

                        <input type="hidden" name="productID" :value="product._id">

                        <div class="input-group-prepend">
                            <button class="btn border rounded-0 decrease-quantity" @click="decreaseQuantity">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" id="quantityDetail" name="quantity" class="form-control input-number text-center"
                            value="1" min="1" max="100">
                        <div class="input-group-append">
                            <button class="btn border rounded-0 increase-quantity" @click="increaseQuantity">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>

                    </div>
                    <span v-if="product.inventory > 0" class="ml-3 pt-2" style="color: #757575;"> Còn hàng</span>
                    <span v-else class="ml-3 pt-2" style="color: #757575;"> Hết hàng</span>
                </div>

                <button v-if="product.inventory > 0" class="addFromDetai btn btn-dark pl-3 p-2 pr-3 rounded-0">Thêm vào
                    giỏ</button>
                <button v-else class="addFromDetai btn btn-dark pl-3 p-2 pr-3 rounded-0">Hết hàng</button>

                <!-- </form> -->

                <br> <br>

            </div>
            <div class="col-lg-7 col-12 mt-4">
                <div class="p-2">
                    <b>Mô tả:</b> <br> <br>
                    <p class="text-justify">Thông tin sản phẩm: <br>
                        {{ product.description }}</p>
                </div>
                <p class="p-2 text-justify"><b>Hướng dẫn bảo quản sản phẩm:</b> <br><br>

                    - Ngâm áo vào NƯỚC LẠNH có pha giấm hoặc phèn chua từ trong 2 tiếng đồng hồ<br><br>

                    - Giặt ở nhiệt độ bình thường, với đồ có màu tương tự.<br><br>

                    - Không dùng hóa chất tẩy.<br><br>

                    - Hạn chế sử dụng máy sấy và ủi (nếu có) thì ở nhiệt độ thích hợp.<br><br><br>


                    <b>Chính sách bảo hành:</b><br><br>

                    - Miễn phí đổi hàng cho khách mua ở shop trong trường hợp bị lỗi từ nhà sản xuất, giao nhầm hàng, bị hư
                    hỏng
                    trong quá trình vận chuyển hàng.<br><br>

                    - Sản phẩm đổi trong thời gian 3 ngày kể từ ngày nhận hàng<br><br>

                    - Sản phẩm còn mới nguyên tem, tags và mang theo hoá đơn mua hàng, sản phẩm chưa giặt và không dơ bẩn,
                    hư
                    hỏng bởi những tác nhân bên ngoài cửa hàng sau khi mua hàng.
                </p>
            </div>

        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        <div class="modal fade" id="instruction" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="w-100 text-center" id="exampleModalLabel">Hướng dẫn chọn size</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img class="w-100 img-fruid"
                            src="https://vuanem.com/blog/wp-content/uploads/2022/11/size-quan-ao-nam-owen.jpg" alt="">
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import ProductService from "@/services/product.service";

export default {
    data() {
        return {
            product: null,
            selectedSize: null,
        };
    },
    methods: {
        selectSize(size) {
            // Set selectedSize to the clicked size
            this.selectedSize = size;
        },
        // async addToCart() {
        //     try {
        //         const userId = localStorage.getItem('userId');
        //         const productId = this.product._id;
        //         const quantity = parseInt(document.getElementById('quantityDetail').value);

        //         await CartService.addToCart(userId, productId, quantity);
        //         const updatedCart = await CartService.getCart(userId);
        //         localStorage.setItem("cart", JSON.stringify(updatedCart));
        //         window.location.href = "/cart";
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        decreaseQuantity() {
            const quantityInput = document.getElementById('quantityDetail');
            let currentQuantity = parseInt(quantityInput.value);
            if (currentQuantity > 1) {
                currentQuantity--;
                quantityInput.value = currentQuantity;
            }
        },
        increaseQuantity() {
            const quantityInput = document.getElementById('quantityDetail');
            let currentQuantity = parseInt(quantityInput.value);
            currentQuantity++;
            quantityInput.value = currentQuantity;
        },
    },
    async mounted() {
        // Lấy thông tin sản phẩm từ API sử dụng ProductService
        try {
            const id = this.$route.params.id;
            this.product = await ProductService.get(id);
        } catch (error) {
            console.error(error);
        }
    },
};
</script>
  

<style>
.size {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #75757520;
    cursor: pointer;
}

.selected-size {
    background-color: #000;
    color: #fff;
}
</style>