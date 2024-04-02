<template>
    <nav class="navbar navbar-expand-xl navbar-light bg-light position-relative">
        <a class="h4 p-2 ml-3 navbar-brand m-0 p-3" href="/" style="letter-spacing: 10px;">AMIRI</a>
        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-auto collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="mx-auto navbar-nav">
                <li class="p-2 mr-3 ml-3 nav-item">
                    <router-link :to="{ name: 'Home' }" class="main-hover f-24">
                        TRANG CHỦ
                    </router-link>
                </li>

                <li class="p-2 mr-3 ml-3 nav-item dropdown">
                    <a class="main-hover f-24 " href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                        SẢN PHẤM
                    </a>
                    <div class="pb-0 mt-2 dropdown-menu border-0 rounded-0 bg-light">
                        <router-link :to="{ name: 'Product' }" class="dropdown-item">
                            All Collection
                        </router-link>
                        <router-link :to="{ name: 'Shirt' }" class="dropdown-item">
                            Áo
                        </router-link>
                        <router-link :to="{ name: 'Pant' }" class="dropdown-item">
                            Quần
                        </router-link>
                        <router-link :to="{ name: 'Other' }" class="dropdown-item">
                            Phụ Kiện
                        </router-link>


                    </div>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item">
                    <router-link :to="{ name: 'About' }" class="main-hover f-24">ABOUT US</router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item">
                    <router-link :to="{ name: 'Contact' }" class="main-hover f-24">LIÊN HỆ</router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="isAdmin">
                    <router-link :to="{ name: 'Analytics' }" class="main-hover f-24">QUẢN TRỊ</router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <router-link :to="{ name: 'Login' }" class="main-hover f-24">ĐĂNG NHẬP </router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <router-link :to="{ name: 'Register' }" class="main-hover f-24">ĐĂNG KÝ</router-link>
                </li>
            </ul>
        </div>

        <div class="icon-nav d-flex justify-content-center align-items-center position-absolute mr-5"
            style="right: 35px; top: 30px;">

            <div class=" d-flex align-items-center">
                <div class="dropdown">

                    <a id="search-btn" class="ml-3 text-dark cursor-pointer" @click="toggleShowInputSearch">
                        <i class="fa-solid fa-magnifying-glass fa-lg"></i></a>

                    <router-link :to="{ name: 'Cart' }" class="ml-3 text-dark">
                        <i class="fa-solid fa-cart-shopping fa-lg"></i>
                    </router-link>


                    <a class="ml-3 text-dark" v-if="isLoggedIn" role="button" data-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-user-gear fa-lg"></i>
                    </a>
                    <div class="w-100 pb-0 mt-3 dropdown-menu border-0 rounded-0 bg-light" v-if="isLoggedIn">
                        <router-link class="dropdown-item pt-1 pb-1" :to="{ name: 'Profile' }" style="user-select: none;">
                            <i class="fa-solid fa-user"></i>
                            &nbsp Tài Khoản</router-link>
                        <div class="m-0 dropdown-divider"></div>
                        <router-link class="dropdown-item pt-1 pb-1" :to="{ name: 'Order' }" style="user-select: none;">
                            <i class="fa-solid fa-clipboard-list"></i>
                            &nbsp&nbsp&nbsp Đơn Hàng</router-link>
                        <div class="m-0 dropdown-divider"></div>
                        <a class="dropdown-item pt-1 pb-1 cursor-pointer" @click="logout" style="user-select: none;">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            &nbsp&nbsp Đăng Xuất</a>
                    </div>
                </div>
            </div>

        </div>
    </nav>

    <div class="pt-4 bg-light" v-if="showInputSearch">
        <div class="row w-100 justify-content-center">
            <div id="search-input" class="mb-4 col-lg-7 col-10 input-group">
                <input type="text" class="form-control rounded-0" placeholder="Nhập thông tin cần tìm..."
                    v-model="query" @keyup.enter="searchQuery" style="box-shadow: none;" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchQuery">
                        <i class="fas fa-search"></i> Tìm
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import UserService from '@/services/user.service';
import InputSearch from '@/components/InputSearch.vue';
export default {
    data() {
        return {
            showInputSearch: false,
            query: '',
        }
    },
    components: {
        InputSearch,
    },
    computed: {

        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        isAdmin() {
            return this.$store.getters.isAdmin;
        },
        user() {
            return this.$store.getters.getUser;
        }


    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$store.commit('LOGOUT');
            this.$router.push("/");
        },
        toggleShowInputSearch() {
            this.showInputSearch = !this.showInputSearch;
        },
        searchQuery() {
            if (this.query) {
                this.$router.push({ name: 'Search', query: { q: this.query } });
                this.showInputSearch = false;
                this.query = '';
            }
        },
    }
}
</script>

<style></style>