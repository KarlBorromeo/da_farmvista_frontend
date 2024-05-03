<template>
	<v-card id="container" class="ma-5 pb-1 white rounded-lg" elevation="2">
		<v-container class="mb-0">
			<v-card class="d-flex align-center" elevation="0">
				<v-icon>{{ icon }}</v-icon>
				<v-icon> mdi-slash-forward </v-icon>
				<p class="ma-0 subheadingtext-uppercase">{{ title }} Module</p>
			</v-card>
		</v-container>
		<v-container class="pt-0 pb-5">
			<v-card color="accent">
				<v-row class="ma-0 pa-0">
					<v-col
						cols="1"
						class="pa-0 hidden-sm-and-down"
						style="
							display: flex;
							align-items: center;
							justify-content: center;
						"
					>
						<v-icon color="primary"
							>mdi-alert-circle-outline</v-icon
						>
					</v-col>
					<v-col cols="12" md="11" class="pa-4">{{
						description
					}}</v-col>
				</v-row>
			</v-card>
			<slot />
		</v-container>
	</v-card>
</template>

<script>
export default {
	props: ['icon', 'title', 'description'],
}
</script>