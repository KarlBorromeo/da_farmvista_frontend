<template>
  <page-description
    icon="mdi-google-maps"
    title="Maps"
    :description="description"
  />
</template>

<script>
import PageDescription from '~/components/authenticated/pageDescription.vue'
export default {
  middleware: 'authSuperadminAdmin',
  components: { PageDescription },
  data() {
    return {
      description:
        'This module facilitates the location of coffee information, farmers, and other relevant points of interest, enhancing accessibility and connectivity within the agricultural community.',
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'MAPS')
  },
}
</script>

<style></style>
