import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home.vue";

import ProductManager from "@/views/admin/DashBoard.vue";

import Product from "@/views/product/Product.vue";
import Shirt from "@/views/product/Shirt.vue";
import Pant from "@/views/product/Pant.vue";
import Other from "@/views/product/Other.vue";

// Auth
import Register from "@/views/auth/Register.vue";
const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
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
    {
        path: "/shirt",
        name: "Shirt",
        component: Shirt,
    },
    {
        path: "/pant",
        name: "Pant",
        component: Pant,
    },
    {
        path: "/other",
        name: "Other",
        component: Other,
    },

    // Auth
    {
        path: "/register",
        name: "Register",
        component: Register,
    },

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;