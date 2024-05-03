<template>
  <h1>
    MY PROFILE
  </h1>
</template>

<script>
export default {
    beforeMount() {
		this.$store.commit('udpateHeaderTitle', 'PROFILE')
	},
}
</script>

<style>

</style>