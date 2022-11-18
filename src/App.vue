<template>
  <div id="app">
    <div id="preloader" v-show="isLoading">
      <i>.</i>
      <i>.</i>
      <i>.</i>
    </div>
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      time: 100,
      show: 1,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
body {
  font-family: "Manrope", sans-serif !important;
}
.form-control {
  border: 1px solid #f1f1f1 !important;
}
</style>
