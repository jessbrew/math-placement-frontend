<template>
<div id="Admin-Selector">
  <h2 class="text-center text-h2">Selection</h2>
  <button class="text-center text-h4" v-on:click="$router.push('Admin-Student-Overview')">
    Test Scores
  </button>
  <br/>
  <button class="text-center text-h4">
    Edit Questions
  </button>
</div>
</template>

<script>
export default {
    name: "Administrator"
}
</script>

<style lang="scss" scoped>
@use '../style/base';
#Admin-Selector {
    width: 60vw;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}
#Admin-Selector h2 {
    margin-bottom: 2rem;
}
#Admin-Selector .text-h4 {
    border: 5px solid base.$foreground-color;
    display: block;
    transition: color 0.3s, background-color 0.4s;
    width: 60vw;
}
#Admin-Selector .text-h4:hover {
    background-color: base.$emphasis-color;
    color: base.$background-color;
}
</style>
