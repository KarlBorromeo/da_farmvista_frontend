<template>
	<div>
		<img src="~/assets/images/logo.png" />
	</div>
</template>

<style scoped>
* {
	box-sizing: border-box;
}
img {
	width: 100%;
}
div {
	display: inline-block;
	width: 38px;
	height: 38px;
	border: 1px solid #1a7358;
	background-color: #d9d9d9;
	border-radius: 100%;
	padding: 0.1rem;
}
@media screen and (min-width: 960px) {
	div {
		width: 42px;
		height: 42px;
		padding-top: 0.1.7rem;
	}
}
</style>
