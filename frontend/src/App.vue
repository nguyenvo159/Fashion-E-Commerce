<script>
import Header from "@/components/particals/Header.vue";
import Footer from "@/components/particals/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
}
</script>

<template>
  <Header />

  <div id="app">
    <router-view />
  </div>

  <Footer />
</template>

<style></style>
