<template>
  <h1>
    LOGS MONITORING
  </h1>
</template>

<script>
export default {
    beforeMount() {
		this.$store.commit('udpateHeaderTitle', 'LOGS')
	},
}
</script>

<style>

</style>