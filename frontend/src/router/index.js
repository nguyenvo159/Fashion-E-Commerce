import { createWebHistory, createRouter } from "vue-router";

import ProductManager from "@/views/admin/DashBoard.vue";
import Product from "@/views/product/Product.vue";

const routes = [
    {
        path: "/admin/product",
        name: "ProductManager",
        component: ProductManager,
    },
    {
        path: "/product",
        name: "Product",
        component: Product,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;