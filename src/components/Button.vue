<template>
<div class="button">
  <v-btn type="Submit" fixed rounded>{{msg}}</v-btn>
</div>
</template>

<script>
export default {
    name: 'MathButton',
    props: {
        msg: String,
    },
}
</script>

<style lang='scss' scoped>
@use '../style/base';
.button {
    text-align: center;
}
</style>
