<template>
  <span id="footer">
    <a v-on:click="$router.push('admin')">Administrator Tools</a>
  </span>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style lang='scss' scoped>
@use '../style/base';
#footer a {
  color: base.$link-color;
  text-decoration: none;
  font-size: 0.8rem;
  padding: 0.3rem;
}
#footer {
    text-align: right;
    background-color: base.$alternate-background-color;
    width: auto;
    position: fixed;
    right: 0px;
    bottom: 0px;
    border: 1px solid base.$alternate-background-color;
    border-radius: 10px 0px 0px 0px;
}
</style>
