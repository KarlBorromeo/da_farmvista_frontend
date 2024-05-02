<template>
	<v-row class="d-flex align-center justify-center fill-height">
		<v-col
			cols="10"
			class="pa-4 rounded-sm"
			style="background-color: white"
		>
			<v-file-input
				id="my-file-input"
				v-model="files"
				color="primary secondary"
				counter
				label="File input"
				multiple
				placeholder="Select your files"
				prepend-icon="mdi-paperclip"
				outlined
				:show-size="1000"
				class=""
			>
				<template v-slot:selection="{ index, text }">
					<v-chip
						v-if="index < 2"
						color="deep-purple accent-4"
						dark
						label
						small
					>
						{{ text }}
					</v-chip>

					<span
						v-else-if="index === 2"
						class="text-overline grey--text text--darken-3 mx-2"
					>
						+{{ files.length - 2 }} File(s)
					</span>
				</template>
			</v-file-input>
		</v-col>
	</v-row>
</template>

<script>
export default {
	name: 'InspirePage',
	beforeMount() {
		this.$store.commit('udpateHeaderTitle', 'UPLOAD FILE')
	},
}
</script>

<style scoped>
.v-file-input__input {
	background-color: white; /* Style the input element */
}
</style>