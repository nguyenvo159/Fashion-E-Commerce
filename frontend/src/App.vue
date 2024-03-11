<script>
import Header from "@/components/particals/Header.vue";
import Footer from "@/components/particals/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
  computed: {
    isAdmin(){
      const currentRouteName = this.$route.name;
      return currentRouteName === 'UserManager' || currentRouteName === 'ProductManager'
           || currentRouteName === 'OrderManager'|| currentRouteName ==='Analytics';
    },
  }
  
}
</script>

<template>
  <Header  v-if="!isAdmin"/>

  <div id="app">
    <router-view />
      <div class="position-fixed bottom-0 right-0 p-3" style="z-index: 99; right: 0; top: 80px;">
        <div id="addToCartToasts" class="toast hide" role="alert" aria-live="assertive" aria-atomic="true" data-delay="1500">
            <div class="toast-header">
            <strong class="mr-auto h5 p-2 text-warning">
                <i class="fa-regular fa-circle-check "></i> &nbsp; Successfully,</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="toast-body">
                <p class="text-muted p-2 m-0" style="font-size: large; width: 300px;">Đã thêm thành công.
                  <router-link class="text-decoration-none" :to="{name: 'Cart'}">Đến giỏ hàng.</router-link>
                </p>
            </div>
        </div>
    </div>
  </div>

  <Footer />
</template>

<style></style>
