<template>
  <tab-description
    icon="mdi-finance"
    title="Analytics"
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
        'This module offers critical analytics capabilities, empowering users to gain valuable insights from data, optimize performance, and make informed decisions to drive success.',
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'ANALYTICS')
  },
}
</script>

<style></style>
