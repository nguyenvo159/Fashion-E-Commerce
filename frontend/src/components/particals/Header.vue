
<template>
      <nav class="navbar navbar-expand-xl navbar-light bg-light position-relative">
        <a class="h4 p-2 ml-3 navbar-brand m-0 p-3" href="/" style="letter-spacing: 10px;">AMIRI</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="mx-auto collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="mx-auto navbar-nav">
                <li class="p-2 mr-3 ml-3 nav-item">
                    <router-link  :to="{name: 'Home'}" class="main-hover f-24">
                        Trang Chủ
                    </router-link>
                </li>

                <li class="p-2 mr-3 ml-3 nav-item dropdown">
                    <a class="main-hover f-24 dropdown-toggle" href="#" role="button" data-toggle="dropdown"
                        aria-expanded="false">
                        Sản Phẩm
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
                    <a href="/about" class="main-hover f-24">About us</a>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="isLoggedIn">
                    <a href="/" class="main-hover f-24"> Quản trị</a>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <a href="/login" class="main-hover f-24">Đăng nhập </a>
                </li>
                <li class="p-2 mr-3 ml-3 nav-item" v-if="!isLoggedIn">
                    <a href="/register" class="main-hover f-24">Register</a>
                </li>

                <li class="p-2 mr-3 ml-3 nav-item" v-if="isLoggedIn">
                    <a href="/" class="main-hover f-24"><i class="fa-solid fa-right-from-bracket"></i>
                        Logout</a>
                </li>
            </ul>
        </div>

        <div class="icon-nav d-flex justify-content-center align-items-center position-absolute mr-5"
            style="right: 35px; top: 30px;">

            <div class=" d-flex align-items-center">
                <a id="search-btn" class="ml-3 text-dark" href="#"><i class="fa-solid fa-magnifying-glass fa-lg"></i></a>

                <a  class="ml-3 text-dark">
                    <i class="fa-solid fa-cart-shopping fa-lg"></i>
                </a>

                <a  class="ml-3 text-dark" v-if="isLoggedIn">
                    <i class="fa-solid fa-user fa-lg"></i>
                </a>
            </div>

        </div>
    </nav>
    <button @click="getUser" class="ml-3 text-dark" v-if="isLoggedIn">
        <i class="fa-solid fa-user fa-lg"></i>
    </button>
    <div v-if="user">
        <p>Tên người dùng: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        
    </div>

</template>

<script>
import UserService from '@/services/user.service';
export default {
    computed: {
        
        isLoggedIn(){
            return this.$store.getters.isLoggedIn;
        },
        user(){
            return this.$store.getters.getUser;
        }


    },
    methods: {
        logout(){
            localStorage.removeItem('token');
            this.$store.commit('LOGOUT');
            this.$router.push('/');
        },
    }
}
</script>

<style>

</style>