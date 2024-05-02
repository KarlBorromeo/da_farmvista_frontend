<template>
	<v-row class="ma-5">
		<v-col
			cols="12"
			style="height: 400px; border: 2px solid white; padding: 1rem"
			class="mb-4"
		>
			<v-card class="card"> fdsfa </v-card>
		</v-col>
		<v-col
			cols="12"
			md="4"
			style="height: 300px; border: 2px solid white; padding: 1rem"
			class="mb-4"
		>
			<v-card class="card"> fdsfa </v-card>
		</v-col>
		<v-col
			cols="12"
			md="4"
			style="height: 300px; border: 2px solid white; padding: 1rem"
			class="mb-4"
		>
			<v-card class="card"> fdsfa </v-card>
		</v-col>
		<v-col
			cols="12"
			md="4"
			style="height: 300px; border: 2px solid white; padding: 1rem"
			class="mb-4"
		>
			<v-card class="card"> fdsfa </v-card>
		</v-col>
		<v-col
			cols="12"
			md="7"
			style="height: 300px; border: 2px solid white; padding: 1rem"
			class="mb-4"
		>
			<v-card class="card"> fdsfa </v-card>
		</v-col>
		<v-col
			cols="12"
			md="5"
			style="height: 300px; border: 2px solid white; padding: 1rem"
			class="mb-4"
		>
			<v-card class="card"> fdsfa </v-card>
		</v-col>
	</v-row>
</template>

<script>
export default {
	beforeMount() {
		this.$store.commit('udpateHeaderTitle', 'DASHBOARD')
	},
}
</script>

<style scoped>
.card {
	background-color: #27293d;
	height: 100%;
}
</style>