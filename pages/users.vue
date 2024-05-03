<template>
	<tab-description
		icon="mdi-account-group"
		title="Users"
		:description="description"
	>
		<v-container class="mt-4">
			<v-row>
				<v-col cols="12" sm="6" class="">
					<v-dialog v-model="dialog" width="700">
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								block
								color="success"
								large
								v-bind="attrs"
								v-on="on"
							>
								<v-icon class="mr-2">mdi-plus</v-icon>
								Create an Account
							</v-btn>
						</template>
						<create-user />
					</v-dialog>
				</v-col>
			</v-row>
		</v-container>
	</tab-description>
</template>

<script>
import CreateUser from '~/components/authenticated/modal/createUser.vue'
import TabDescription from '~/components/authenticated/TabDescription.vue'
export default {
	components: { TabDescription, CreateUser },
	data() {
		return {
			dialog: false,
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis corporis natus nostrum magnam nesciunt quos accusamus, nisi libero nemo delectus sint sequi, debitis nam saepe culpa velit voluptatem veritatis accusantium!',
		}
	},
	beforeMount() {
		this.$store.commit('udpateHeaderTitle', 'USERS')
	},
}
</script>

<style>
</style>