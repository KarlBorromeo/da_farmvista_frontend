<template>
	<v-alert style="background-color: #e9f5ea; color: green" class="ma-2">
		<v-row align="center">
			<v-col cols="12" sm="1" class="text-center">
				<v-icon class="green--text">mdi-check-circle</v-icon>
			</v-col>
			<v-col cols="12" sm="11">
				<p class="text-center text-sm-start ">{{text}}</p>
			</v-col>
		</v-row>
	</v-alert>
</template>

<script>
export default {
	props: ['text'],
}
</script>

<style scoped>
</style>