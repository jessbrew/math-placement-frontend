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

<style scoped>
button a {
	color: #006643;
	background-color: rgb(188,190,192);
	margin: 1rem;
	padding: 0.4rem;
	border-radius: 1rem;
	font-size: 1.5rem;
	text-decoration: none;
    transition: background-color 0.2s, color 0.2s;
}
button a:hover {
    background-color: #006643;
	color: rgb(188,190,192);
}
</style>
