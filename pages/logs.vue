<template>
  <div>
    <page-description
      icon="mdi-history"
      title="Logs"
      :description="description"
    />
    <page-contents>
      <logs-table />
    </page-contents>
  </div>
</template>

<script>
import LogsTable from '~/components/authenticated/tables/logsTable.vue'
import PageContents from '~/components/authenticated/pageContents.vue'
import PageDescription from '~/components/authenticated/pageDescription.vue'
export default {
  middleware: 'authSuperadmin',
  components: { PageDescription, PageContents, LogsTable },
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
