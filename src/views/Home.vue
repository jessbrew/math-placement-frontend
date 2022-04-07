<template>
  <div class="home">
    <instructions/>
    <v-form
      ref="button"
      @submit.prevent="submitForm"
      >
      <math-button msg="Begin Test"/>
    </v-form>
  </div>
</template>

<script>
// @ is an alias to /src
import Instructions from '@/components/Instructions.vue';
import MathButton from '@/components/Button.vue';

export default {
    name: 'Home',
    components: {
        Instructions,
        MathButton
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
