<template>
<div id='login'>
  <v-form
    ref="login"
    v-model="valid"
    lazy-validation
    method="post"
    @submit.prevent="submitForm"
    >
    <v-text-field
      v-model="fname"
      :rules="nameRules"
      label="First Name"
      required
      validate-on-blur
      ></v-text-field>
    <v-text-field
      v-model="lname"
      :rules="nameRules"
      label="Last name"
      required
      validate-on-blur
      ></v-text-field>
    <v-text-field
      v-model="id"
      label="Student ID"
      :rules="idrules"
      required
      validate-on-blur
      ></v-text-field>
    <math-button msg="Submit"/>
</v-form>
</div>
</template>

<script>
import MathButton from '@/components/Button.vue';
export default {
    name: "Login",
    data: function() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                // Name cannot be whitespace
                v => !/^\s*$/g.test(v) || 'Name is required',
                // No numbers in name
                v => /^\D*$/g.test(v) || 'Name is required',
            ],
            id: '',
            idrules: [
                v => !!v || 'Id is required',
                v => parseInt(v) > 999999 && parseInt(v) < 10000000 || 'Invalid ID number'
            ],
        }
    },
    components: {
        MathButton
    },
    methods: {
        validate() {
            this.$refs.login.validate();
        },
        submitForm() {
            if (this.$refs.login.validate()){
                // Replace with submission to server
                alert('submitted');
                console.log(this.fname,this.lname,this.id);
                this.$router.replace("/Questionnaire");
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
