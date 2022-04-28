<template>
<v-simple-table>
  <thead>
    <tr>
      <h2 class="text-center text-h2">Selection</h2>
    </tr>
  </thead>
  <tbody>
    <tr class="text-center text-h4" v-on:click="$router.push('Admin-Student-Overview')">
      Test Scores
    </tr>
    <tr class="text-center text-h4">
      Edit Questions
    </tr>
  </tbody>
</v-simple-table>
</template>

<script>
export default {
    name: "Administrator",
    data: function() {
        return {
            
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../style/base';
</style>
