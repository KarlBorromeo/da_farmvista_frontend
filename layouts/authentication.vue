<template>
	<v-app>
		<v-main id="bg" style="z-index:0">
			<nuxt />
		</v-main>
	</v-app>
</template>
<style scoped>

#bg{
	position: relative;
	overflow: hidden;
	background-color: #1a7358;
}
#bg::before{
	content: '';
	position: absolute;
	top: 5%;
	left: -3rem;
	min-width: 150px;
	min-height: 150px;
	background-image: url('~/assets/images/shape.png');
	background-size: contain;
	scale: 4;
}
#bg::after{
	content: '';
	position: absolute;
	top: 95%;
	right: 0;
	min-width: 150px;
	height: 150px;
	background-image: url('~/assets/images/shape.png');
	background-size: contain;
	scale: 3;
}
@media screen and (max-width: 425px) {
	#bg::before{
		left: -20%;
	}
}
@media screen and (max-width: 600px) {
	#bg::before{
		left: -10%;
	}
}

</style>