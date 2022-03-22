<template>
<div>
  <v-form
    ref="question"
    v-model="valid"
    lazy-validation
    method="post"
    @submit.prevent="submitForm"
    >
    <div id="question">
      <div id="sample">
        $$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$
      </div>
    </div>
    <v-radio-group v-model="answer" mandatory column>
      <v-radio
        label="\( \pi \)"
        value="A"></v-radio>
      <v-radio
        label="\( 2\pi \)"
        value="B"></v-radio>
      <v-radio
        label="\( 3\pi \)"
        value="C"></v-radio>
      <v-radio
        label="\( 4\pi \)"
        value="D"></v-radio>
    </v-radio-group>
    <v-btn
      type="submit">
      submit
    </v-btn>
</v-form>
</div>
</template>

<script>
window.onload = function() {
    MathJax.typeset(); // eslint-disable-line
}
export default {
    name: "Test",
    data: function() {
        return {
            valid: true,
        }
    },
    methods: {
        submitForm() {
            console.log(this);
            if (this.$refs.question.validate()){
                alert("Submitted");
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@use '../style/base';
#login {
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
}
</style>
