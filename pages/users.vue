<template>
  <h1>USERS</h1>
</template>

<script>
export default {
    beforeMount() {
		this.$store.commit('udpateHeaderTitle', 'USERS')
	},  
}
</script>

<style>

</style>