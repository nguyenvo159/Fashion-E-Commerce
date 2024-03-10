
<template>
      <nav class="navbar navbar-expand-lg navbar-light bg-light position-relative">
        <a class="h4 p-2 ml-3 navbar-brand m-0 p-3" href="/" style="letter-spacing: 10px;">AMIRI</a>
        <button class="navbar-toggler border-0" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-auto collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="mx-auto navbar-nav">
                <li class="p-2 mr-3 ml-3 nav-item">
                    <router-link  :to="{name: 'Home'}" class="main-hover f-24">
                        TRANG CHỦ
                    </router-link>
                </li>

                <li class="p-2 mr-3 ml-3 nav-item dropdown">
                    <a class="main-hover f-24 " href="#" role="button" data-toggle="dropdown"
                        aria-expanded="false">
                        SẢN PHẤM
                    </a>
                    <div class="pb-0 mt-2 dropdown-menu border-0 rounded-0 bg-light">
                        <router-link :to="{ name: 'Product' }" class="dropdown-item">
                            All Collection
                        </router-link>
                        <router-link  :to="{name: 'Shirt'}" class="dropdown-item">
                            Áo
                        </router-link>
                        <router-link  :to="{name: 'Pant'}" class="dropdown-item">
                            Quần
                        </router-link>
                        <router-link  :to="{name: 'Other'}" class="dropdown-item">
                            Phụ Kiện
                        </router-link>
                        

                    </div>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item">
                    <router-link :to="{name: 'About'}" class="main-hover f-24">ABOUT US</router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item">
                    <a  class="main-hover f-24">LIÊN HỆ</a>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="isAdmin">
                    <router-link :to="{name: 'UserManager'}" class="main-hover f-24" >QUẢN TRỊ</router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <router-link :to="{name: 'Login'}" class="main-hover f-24">ĐĂNG NHẬP </router-link>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <router-link :to="{name: 'Register'}" class="main-hover f-24">ĐĂNG KÝ</router-link>
                </li>
            </ul>
        </div>

        <div class="icon-nav d-flex justify-content-center align-items-center position-absolute mr-5"
            style="right: 35px; top: 30px;">

            <div class=" d-flex align-items-center">
                <div class="dropdown">

                <a id="search-btn" class="ml-3 text-dark" href="#"><i class="fa-solid fa-magnifying-glass fa-lg"></i></a>

                <router-link :to="{name: 'Cart'}" class="ml-3 text-dark">
                    <i class="fa-solid fa-cart-shopping fa-lg"></i>
                </router-link>

                
                    <a  class="ml-3 text-dark" v-if="isLoggedIn" role="button" data-toggle="dropdown"
                        aria-expanded="false">
                            <i class="fa-solid fa-user-gear fa-lg"></i>                            
                    </a>
                    <div class="w-100 pb-0 mt-3 dropdown-menu border-0 rounded-0 bg-light" v-if="isLoggedIn">
                        <router-link class="dropdown-item pt-1 pb-1" :to="{name: 'Profile'}">
                            <i class="fa-solid fa-user"></i>
                            &nbsp Tài Khoản</router-link>
                        <div class="m-0 dropdown-divider"></div>
                        <router-link class="dropdown-item pt-1 pb-1" :to="{name: 'Order'}">
                            <i class="fa-solid fa-clipboard-list"></i>
                            &nbsp&nbsp&nbsp Đơn Hàng</router-link>
                        <div class="m-0 dropdown-divider"></div>
                        <a class="dropdown-item pt-1 pb-1 cursor-pointer" @click="logout" >
                            <i class="fa-solid fa-right-from-bracket"></i>
                            &nbsp&nbsp Đăng Xuất</a>
                    </div>
                </div>
            </div>

        </div>
    </nav>
    <!-- <div v-if="user">
        <p>Tên người dùng: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Admin: {{ user.isAdmin }}</p>
        <p>Admin: {{ this.$store.getters.isAdmin }}</p>
        
    </div> -->

</template>

<script>
import UserService from '@/services/user.service';
export default {
    computed: {
        
        isLoggedIn(){
            return this.$store.getters.isLoggedIn;
        },
        isAdmin(){
            return this.$store.getters.isAdmin;
        },
        user(){
            return this.$store.getters.getUser;
        }


    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$store.commit('LOGOUT');
            this.$router.push("/");
        },
    }
}
</script>

<style>

</style>