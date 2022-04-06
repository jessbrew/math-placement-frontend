<template>
<div id='questionnaire'>
  <v-form
    ref="questionnaire"
    v-model="valid"
    lazy-validation
    method="post"
    @submit.prevent="submitForm"
    >
    <b>I have completed, or nearly completed (check all that apply)</b>
    <v-flex>
      <v-col>
        <v-checkbox
          v-model="classTaken"
          label="A course involving trigonometry: sine, cosine, tangent, etc."
          value="trig"
          :rules="classRules"
          dense
          ></v-checkbox>
        <v-checkbox
          v-model="classTaken"
          label="A first course in calculus: Calculus AB in high school or first college calculus course (NOT PRECALCULUS)"
          value="ab"
          :rules="classRules"
          dense
          ></v-checkbox>
        <v-checkbox
          v-model="classTaken"
          label="A second course in calculus: Calculus BC in high school or second college calculus course"
          value="bc"
          :rules="classRules"
          dense
          ></v-checkbox>
        <v-checkbox
          v-model="classTaken"
          label="None of the above"
          value="none"
          :rules="classRules"
          dense
          ></v-checkbox>
      </v-col>
    </v-flex>
    <b>Have you taken a math course in the past 12 months?</b>
    <v-radio-group v-model="recent" mandatory row>
      <v-radio
        label="yes"
        value="yes"
        ></v-radio>
      <v-radio
        label="no"
        value="no"
        ></v-radio>
    </v-radio-group>
    <b>What is the lowest grade you received in a high school math class?</b>
    <v-radio-group v-model="lowestGrade" mandatory row>
      <v-radio
        label="A+"
        value="A+"
        ></v-radio>
      <v-radio
        label="A"
        value="A"
        ></v-radio>
      <v-radio
        label="A-"
        value="A-"
        ></v-radio>
      <v-radio
        label="B+"
        value="B+"
        ></v-radio>
      <v-radio
        label="B"
        value="B"
        ></v-radio>
      <v-radio
        label="B-"
        value="B-"
        ></v-radio>
      <v-radio
        label="C+"
        value="C+"
        ></v-radio>
      <v-radio
        label="C"
        value="C"
        ></v-radio>
      <v-radio
        label="C-"
        value="C-"
        ></v-radio>
      <v-radio
        label="D+"
        value="D+"
        ></v-radio>
      <v-radio
        label="D"
        value="D"
        ></v-radio>
      <v-radio
        label="D-"
        value="D-"
        ></v-radio>
      <v-radio
        label="F"
        value="F"
        ></v-radio>
    </v-radio-group>
    <math-button msg="submit"></math-button>
  </v-form>
</div>
</template>

<script>
import MathButton from '@/components/Button.vue';
export default {
    name: "Questionnaire",
    data: function() {
        return {
            recent: 'yes',
            classTaken: [],
            classRules: [
                v => !!v || "Please select an option",
                v => v.length!=0 || "Please select an option",
                v => !(v.includes('none') && v.length != 1) || "None cannot be selected with another answer",
            ],
        }
    },
    components: {
        MathButton
    },
    methods: {
        submitForm() {
            if (this.$refs.questionnaire.validate()){
                // replace with submitting data to server
                alert('submitted');
                console.log(this.classTaken,this.recent,this.lowestGrade);
                this.$router.replace("/Test");
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@use '../style/base';
#questionnaire {
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
}
</style>
