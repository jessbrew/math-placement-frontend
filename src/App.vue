<template>
  <v-app>
    <app-header></app-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MathJax from "@/assets/tex-svg.js"; // eslint-disable-line
import AppHeader from "@/components/AppHeader.vue";
export default {
  name: "App",
  components: {
    AppHeader,
  },
};
</script>

<style>

</style>
