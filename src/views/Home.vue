<template>
  <div class="home">
    <instructions/>
	<div id='Button'>
      <math-button route='/Login' msg="Begin Test"/>
	</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Instructions from '@/components/Instructions.vue'
import MathButton from '@/components/Button.vue'

export default {
  name: 'Home',
  components: {
      Instructions,
      MathButton
  }
}
</script>

<style lang='scss' scoped>
.home {
    margin-left: 10vw;
    margin-right: 10vw;
}
#Button {
	text-align: center;
	margin-top: 1rem;
}
</style>
