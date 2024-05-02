<template>
	<v-app>
		<v-app-bar
			color="white"
			elevate-on-scroll
			scroll-target="#scrolling-techniques-7"
			align="center"
			height="80"
		>
			<v-spacer class="hidden-sm-and-down"></v-spacer>

			<the-logo />

			<v-toolbar-title class="ml-2 hidden-xs-only"
				>FarmVista</v-toolbar-title
			>
			<v-spacer class="hidden-sm-and-down"></v-spacer>
			<div class="hidden-sm-and-down">
				<v-btn flat elevation="0" color="white" small>Home</v-btn>
				<v-btn flat elevation="0" color="white" small>Home</v-btn>
				<v-btn flat elevation="0" color="white" small>Home</v-btn>
				<v-btn flat elevation="0" color="white" small>Home</v-btn>
			</div>
			<v-spacer></v-spacer>
			<v-btn small to="/auth" elevation="1" color="primary">
				Log In
				<v-icon>mdi-account-arrow-right</v-icon>
			</v-btn>

			<the-menu class="hidden-md-and-up" />

			<v-spacer class="hidden-sm-and-down"></v-spacer>
		</v-app-bar>
		<v-sheet
			id="scrolling-techniques-7"
			class="overflow-y-auto"
			max-height="600"
		>
			<v-main style="height: 1500px">
				<nuxt />
			</v-main>
		</v-sheet>
	</v-app>
</template>

<script>
import TheMenu from '~/components/main_page_components/TheMenu.vue'
import TheLogo from '~/components/main_page_components/TheLogo.vue'

export default {
	components: { TheMenu, TheLogo },
}
</script>
<style scoped>
@import url('~/assets/css/fonts.css');
</style>
