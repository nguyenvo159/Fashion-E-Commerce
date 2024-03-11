import { createWebHistory, createRouter } from "vue-router";
import store from "@/store/index.js";

import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Contact from "@/views/Contact.vue";
import Search from "@/views/Search.vue";

import Analytics from "@/views/admin/Analytics.vue";
import ProductManager from "@/views/admin/ProductManager.vue";
import UserManager from "@/views/admin/UserManager.vue";
import OrderManager from "@/views/admin/OrderManager.vue";

import Product from "@/views/product/Product.vue";
import Shirt from "@/views/product/Shirt.vue";
import Pant from "@/views/product/Pant.vue";
import Other from "@/views/product/Other.vue";
import Detail from "@/components/product/ProductDetail.vue";


import Cart from "@/views/cart/Cart.vue";
import Order from "@/views/order/Order.vue";

// Auth
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import Profile from "@/views/auth/Profile.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
    },
    {
        path: "/search",
        name: "Search",
        component: Search,
        props: route => ({ query: route.query.q })
    },

    // Admin
    {
        path: "/admin/analytics",
        name: "Analytics",
        component: Analytics,
        meta: { requiresAuth: true, requiresAdmin: true }
    },

    {
        path: "/admin/product",
        name: "ProductManager",
        component: ProductManager,
        meta: { requiresAuth: true, requiresAdmin: true }
    },

    {
        path: "/admin/user",
        name: "UserManager",
        component: UserManager,
        meta: { requiresAuth: true, requiresAdmin: true }
    },

    {
        path: "/admin/order",
        name: "OrderManager",
        component: OrderManager,
        meta: { requiresAuth: true, requiresAdmin: true }
    },

    // Product
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
    {
        path: "/:id",
        name: "Detail",
        component: Detail,
    },

    // Auth
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: { requiresAuth: true }
    },

    // Cart
    {
        path: "/cart",
        name: "Cart",
        component: Cart,
        meta: { requiresAuth: true }

    },

    //Order
    {
        path: "/order",
        name: "Order",
        component: Order,
        meta: { requiresAuth: true }

    },


]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isLoggedIn = store.getters.isLoggedIn;
    const isAdmin = store.getters.isAdmin;

    if (to.meta.requiresAuth) {
        if (!isLoggedIn) {
            next({ name: "Login" });
        } else {
            if (to.meta.requiresAdmin && !isAdmin) {
                next({ name: "Home" });
            } else {
                next();
            }
        }
    } else {
        next();
    }
});
export default router;