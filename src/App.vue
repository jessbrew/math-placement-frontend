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
    beforeMount () {
        window.addEventListener('beforeunload', function(event) {
            console.log("User tried to leave the page."); // Replace with something else
            event.returnValue="Are you sure you want to leave the test?"; // Older browsers apparently show this on prompt
            event.preventDefault();
        });
    }
};



</script>

<style>

</style>
