<template>
    <div class="container-fluid pb-4" style="background-color: lightcyan;">
        <div class="row">
            <DashBoard type="Product" />
            <div id="dv" class="col-lg-9 col-11 admin-content">
                <h1 class="mb-4">Quản Lý Sản Phẩm </h1>
                <div class="row mt-4">
                    <div class="mb-3 col-lg-3 col-md-6">
                        <div class="card analytics-number1 rounded-0 shadow text-primary">
                            <div class="card-body">
                                <h5 class="card-title">Tổng</h5>
                                <p class="card-text">{{ products.length }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3 col-md-6">
                        <div class="card analytics-number2 rounded-0 shadow text-success">
                            <div class="card-body">
                                <h5 class="card-title">Áo</h5>
                                <p class="card-text">{{ getCategoryCount('Shirt') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3 col-md-6">
                        <div class="card analytics-number3 rounded-0 shadow text-info">
                            <div class="card-body">
                                <h5 class="card-title">Quần</h5>
                                <p class="card-text">{{ getCategoryCount('Pant') }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3 col-lg-3 col-md-6">
                        <div class="card analytics-number4 rounded-0 shadow text-warning">
                            <div class="card-body">
                                <h5 class="card-title">Khác</h5>
                                <p class="card-text">{{ getCategoryCount('Other') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Thêm sản phẩm  -->
                <button class="btn btn-primary mb-3" data-toggle="modal" data-target="#add-product">Thêm
                    Sản phẩm</button>

                <button class="btn mb-3 ml-3 m" style="box-shadow: none;" @click="refreshList()">
                    <i class="main-hover fa-solid fa-rotate-right" style="font-size: 24px;"></i></button>

                <InputSearch v-model="searchText" />

                <table class="table shadow bg-white">
                    <thead class="thead-light">
                        <tr>
                            <th class="align-middle text-center">STT</th>
                            <th><a class="cursor-pointer text-decoration-none"
                                    style="color: #495057; user-select: none;" @click="sortProductsByName()">Tên</a>
                            </th>
                            <th><a class="cursor-pointer text-decoration-none"
                                    style="color: #495057; user-select: none;"
                                    @click="sortProductsByCategory()">Loại</a></th>
                            <th>Giá</th>
                            <th>Ngày thêm</th>
                            <th class="cursor-pointer" @click="sortDate()" style="user-select: none;">Ngày sửa</th>
                            <th class="align-middle text-center">Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <div v-if="products.length === 0">No products available.</div>
                    <tbody v-else>

                        <tr v-for="(product, index) in filteredProducts" :key="product._id" class="product-item">
                            <td class="align-middle text-center">{{ index + 1 }}</td>
                            <td>
                                <router-link :to="{ name: 'Detail', params: { id: product._id } }" class=" main-hover">
                                    {{ product.name }}
                                </router-link>
                            </td>
                            <td>{{ product.category }}</td>
                            <td>{{ product.price }}</td>
                            <td>{{ formatDate(product.createdAt) }}</td>
                            <td>{{ formatDate(product.updatedAt) }}</td>

                            <td class="align-middle text-center">{{ product.inventory }}</td>
                            <td>
                                <a class="cursor-pointer mr-2" data-toggle="modal" data-target="#update-product"
                                    @click="confirmUpdate(product)">Sửa</a>
                                <a class="cursor-pointer" data-toggle="modal" data-target="#delete-product"
                                    @click="confirmDelete(product)">Xóa</a>
                            </td>
                        </tr>

                    </tbody>

                </table>
                <!-- Thêm sản phẩm -->
                <InputProduct :product="newProduct" @submit:product="createProduct" @close="closeModal"
                    title="Thêm Sản Phẩm" modalId="add-product" />

                <!-- Sửa sản phẩm -->
                <InputProduct :product="product" @submit:product="updateProduct" @close="closeModal"
                    title="Chỉnh Sửa Sản Phẩm" modalId="update-product" />

                <!-- Thông báo -->
                <NotificationModal modalId="delete-product" title="Xác Nhận Xóa" :message="message"
                    :confirmAction="deleteProduct" :idToDelete="productToDelete" />
            </div>
        </div>
    </div>
</template>

<script>
import { format } from 'date-fns';
import ProductService from '@/services/product.service';
import InputSearch from '@/components/InputSearch.vue';
import InputProduct from '@/components/admin/InputProduct.vue';
import NotificationModal from '@/components/NotificationModal.vue';
import DashBoard from './DashBoard.vue';

export default {
    components: {
        DashBoard,
        InputSearch,
        InputProduct,
        NotificationModal,
    },
    data() {
        return {
            products: [],
            activeIndex: -1,
            searchText: "",
            newProduct: {
                name: "",
                price: 0,
                inventory: 0,
                category: "",
                imgURL: "",
                description: "",
            },
            product: null,
            message: "",
            productToDelete: null,
            sortByDateAsc: true,
            sortByNameAsc: true,
            sortByCategoryAsc: false,
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        productStrings() {
            return this.products.map((product) => {
                const { name, category, description } = product;
                return [name.toLowerCase(), category.toLowerCase(), description.toLowerCase()].join("");
            });
        },
        filteredProducts() {
            if (!this.searchText.trim()) return this.products;
            return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.searchText.toLocaleLowerCase())
            );
        },
    },
    async created() {
        this.retrieveProducts();

    },
    methods: {
        refreshList() {
            this.retrieveProducts();
            this.activeIndex = -1;
            this.searchText = "";
            this.newProduct = {
                name: "",
                price: 0,
                inventory: 0,
                category: "",
                imgURL: "",
                description: "",
            };
        },
        closeModal() {
            $('#add-product').modal('hide');
            $('#update-product').modal('hide');
        },

        getCategoryCount(category) {
            return this.products.filter(product => product.category == category).length;
        },

        formatDate(date) {
            const formattedDate = format(new Date(date), "dd/MM/yyyy HH:mm");
            return formattedDate;
        },

        // Sắp xếp
        sortProductsByName() {
            this.products.sort((a, b) => {
                if (this.sortByNameAsc) {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
            this.sortByNameAsc = !this.sortByNameAsc;
        },
        sortProductsByCategory() {
            this.products.sort((a, b) => {
                if (this.sortByCategoryAsc) {
                    return a.category.localeCompare(b.category);
                } else {
                    return b.category.localeCompare(a.category);
                }
            });
            this.sortByCategoryAsc = !this.sortByCategoryAsc;
        },

        sortDate() {
            this.products.sort((a, b) => {
                const dateA = new Date(a.updatedAt);
                const dateB = new Date(b.updatedAt);
                if (this.sortByDateAsc) {
                    return dateA - dateB;
                } else {
                    return dateB - dateA;
                }
            });
            this.sortByDateAsc = !this.sortByDateAsc;
        },
        confirmDelete(product) {
            this.productToDelete = product._id;
            this.message = `Bạn có chắn chắn muốn xóa sản phẩm \"${product ? product.name : ''}\" ?`;
        },
        confirmUpdate(product) {
            this.product = product;
            // console.log(this.product);
        },

        // Lấy hết Product
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();

            } catch (error) {
                console.log(error);
            }
        },

        // Tạo product
        async createProduct(data) {
            try {
                await ProductService.create(data);
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        },

        // Sửa product
        async updateProduct(data) {
            try {
                await ProductService.update(this.product._id, data);
                this.refreshList();
            } catch (error) {
                console.log(error);
            }
        }
        ,

        // Xóa product
        async deleteProduct(id) {
            try {
                await ProductService.delete(id);
                this.retrieveProducts();
            } catch (error) {
                console.log(error);
            }
        },

    },
    mounted() {
        this.refreshList();
    }
};
</script>
<style></style>