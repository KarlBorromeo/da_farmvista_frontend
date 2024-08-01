<template>
	<v-col>
		<v-card
			style="height: 100%; border-radius: .3rem"
			class="d-flex justify-center align-center card"
		>
			<v-container class="d-flex justify-center align-center" color="red">
				<v-spacer />
				<v-icon class="white--text">mdi-account-badge-outline</v-icon>
				<v-spacer />
				<v-card
					class="elevation-0 rounded-xl"
					style="background-color: transparent"
				>
					<p
						class="text-center my-0 py-0 subtitle font-weight-normal white--text"
					>
						{{ name }}
					</p>
					<v-row class="ma-0 pa-0 mt-1">
						<v-col cols="6" class="ma-0 pa-0">
              <p
								class="text-center my-0 py-0 caption font-weight-light white--text"
							>
								Active
							</p>
							<p
								class="text-center my-0 py-0 font-weight-bold white--text"
							>
								{{ active }}
							</p></v-col
						>
						<v-col cols="6" class="ma-0 pa-0">
              <p
								class="text-center my-0 py-0 caption font-weight-light white--text"
							>
								Inactive
							</p>
							<p
								class="text-center my-0 py-0 font-weight-bold white--text"
							>
								{{ inactive }}
							</p></v-col
						>
					</v-row>
				</v-card>
				<v-spacer />
			</v-container>
		</v-card>
	</v-col>
</template>

<script>
export default {
	props: ['name', 'active','inactive'],
}
</script>

<style scoped>
.card {
	background: rgb(26, 115, 88);
	background: linear-gradient(
		90deg,
		rgba(26, 115, 88, 1) 0%,
		rgba(99, 210, 176, 1) 100%
	);
}
p{
  padding: 0!important;
  margin: 0!important;
}
</style>
