<template>
<button>
  <router-link :to="route"><b>{{ msg }}</b></router-link>
</button>
</template>

<script>
export default {
    name: 'MathButton',
    props: {
        msg: String,
        route: String,
    }
}
</script>

<style lang='scss' scoped>
@use '../style/base';
button a {
	color: base.$alternate-foreground-color;
	background-color: base.$alternate-background-color;
	margin: 1rem;
	padding: 0.4rem;
	border-radius: 1rem;
	font-size: 1.5rem;
	text-decoration: none;
    transition: background-color 0.2s, color 0.2s;
}
button a:hover {
    background-color: base.$alternate-foreground-color;
	color: base.$alternate-background-color;
}
</style>
