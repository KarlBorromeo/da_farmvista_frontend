<template>
  <div>
    <tab-description
      icon="mdi-history"
      title="Logs"
      :description="description"
    />    
    <tab-contents>
      <logs-table />
    </tab-contents>
  </div>

</template>

<script>
import LogsTable from '~/components/authenticated/logsTable.vue'
import TabContents from '~/components/authenticated/tabContents.vue'
import TabDescription from '~/components/authenticated/tabDescription.vue'
export default {
  middleware :'authSuperadmin',
  components: { TabDescription, TabContents, LogsTable },
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
