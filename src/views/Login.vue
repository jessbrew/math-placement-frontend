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
    <v-btn
      type="submit"
      >
      submit
    </v-btn>
</v-form>
</div>
</template>

<script>
export default {
    name: "Login",
    data: function() {
        return {
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
            id: '',
            idrules: [
                v => !!v || 'Id is required',
                v => parseInt(v) > 999999 && parseInt(v) < 10000000 || 'Invalid ID number'
            ]
        }
    },
    methods: {
        validate() {
            this.$refs.login.validate();
        },
        submitForm() {
            console.log(this);
            if (this.$refs.login.validate()){
                alert('submitted');
                this.$router.push("/questionnaire");
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
