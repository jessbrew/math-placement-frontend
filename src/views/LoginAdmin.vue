<template>
<div id="login">
  <v-form
    ref="login"
    lazy-validation
    method="post"
    @submit.prevent="submitForm"
    v-model="valid">
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      label="User Name"
      required
      validate-on-blur></v-text-field>
    <v-text-field
      v-model="password"
      type="password"
      label="Password"
      :rules="passwordRules"
      required
      validate-on-blur></v-text-field>
    <math-button msg="Login"></math-button>
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
            username: "",
            usernameRules: [
                v => !!v || "Please enter your username"
            ],
            password: "",
            passwordRules: [
                v => !!v || "Please enter your password"
            ]
        }
    },
    components: {
        MathButton,
    },
    methods: {
        submitForm() {
            if (this.$refs.login.validate()) {
                console.log([this.username,this.password]); // Replace with submission to server
                this.$router.replace("/Admin");
            }
            else {
                alert("Please enter a valid username/password");
            }
        },
    }
}
</script>

<style lang='scss' scoped>
#login {
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
}
</style>
