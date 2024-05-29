<template>
  <tab-description
    icon="mdi-google-maps"
    title="Maps"
    :description="description"
  ></tab-description>
</template>

<script>
import TabDescription from '~/components/authenticated/tabDescription.vue'
export default {
  middleware: 'authSuperadminAdmin',
  components: { TabDescription },
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
