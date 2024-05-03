<template>
	<tab-description
		icon="mdi-account-circle-outline"
		title="My Profile"
		:description="description"
	></tab-description>
</template>

<script>
import TabDescription from '~/components/authenticated/TabDescription.vue'
export default {
	components: { TabDescription },
	data() {
		return {
			description:
				'Here, you can easily edit your personal details and update your profile picture, ensuring accurate information representation on your account.',
		}
	},
	beforeMount() {
		this.$store.commit('udpateHeaderTitle', 'PROFILE')
	},
}
</script>

<style>
</style>