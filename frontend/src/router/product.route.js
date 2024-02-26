import { createWebHistory, createRouter } from "vue-router";

import Product from "@/views/product/Product.vue";

const routes = [
    {
        path: "/product",
        name: "GetProduct",
        component: Product,
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;