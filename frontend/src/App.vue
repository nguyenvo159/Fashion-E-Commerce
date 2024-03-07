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
           || currentRouteName === 'OrderManager';
    },
  }
  
}
</script>

<template>
  <Header  v-if="!isAdmin"/>

  <div id="app">
    <router-view />
  </div>

  <Footer />
</template>

<style></style>
