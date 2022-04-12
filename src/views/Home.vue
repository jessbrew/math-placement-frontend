<template>
  <div class="home">
    <instructions/>
    <v-form
      ref="button"
      @submit.prevent="submitForm"
      >
      <math-button msg="Begin Test"/>
    </v-form>
    <app-footer></app-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import Instructions from '@/components/Instructions.vue';
import MathButton from '@/components/Button.vue';
import AppFooter from "@/components/AppFooter.vue";
export default {
    name: 'Home',
    components: {
        Instructions,
        MathButton,
        AppFooter
    },
    methods: {
        submitForm() {
            this.$router.replace('Login');
        }
    }
};
</script>

<style lang='scss' scoped>
.home {
    margin-left: 10vw;
    margin-right: 10vw;
}
</style>
