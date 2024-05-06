<template>
  <tab-description
    icon="mdi-history"
    title="Logs"
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
        'This module facilitates efficient monitoring of activity logs, providing users with comprehensive insights and oversight into system activities and operations.',
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'LOGS')
  },
}
</script>

<style></style>
