<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div id="dv" class="col-lg-10 col-11">
                <h4 class="mt-3 mb-3">Kết quả tìm kiếm: {{ query ? query : "Từ khóa bị lỗi" }}</h4>

                <ProductList v-if="filteredProducts && filteredProducts.length > 0" :products="filteredProducts" />

                <div v-else>
                    <h5 class="mt-5 mb-5 text-center">Không có dữ liệu.</h5>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ProductList from "@/components/product/ProductList.vue";
import ProductService from "@/services/product.service";

export default {
    data() {
        return {
            products: [],
        };
    },
    mounted() {
        this.retrieveProducts();
    },
    components: {
        ProductList,
    },
    props: {
        query: { type: String, required: true },
    },
    computed: {
        productStrings() {
            return this.products.map((product) => {
                let type = '';
                switch (product.category) {
                    case 'Shirt':
                        type = 'Áo';
                        break;
                    case 'Pant':
                        type = 'Quần';
                        break;
                    case 'Other':
                        type = 'Phụ kiện';
                        break;
                    default:
                        type = product.category;
                }
                const { name, description } = product;
                return [name.toLowerCase(), type.toLowerCase(), description.toLowerCase()].join("");
            });
        },
        filteredProducts() {
            if (!this.query.trim()) return this.products;
            return this.products.filter((_product, index) =>
                this.productStrings[index].includes(this.query.toLocaleLowerCase())
            );
        },
    },
    methods: {
        async retrieveProducts() {
            try {
                this.products = await ProductService.getAll();
                this.sortProductsByCategory();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
    }

};
</script>
