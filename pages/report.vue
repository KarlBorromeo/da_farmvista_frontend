<template>
  <tab-description
    icon="mdi-chart-box"
    title="Report"
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
            'This module is for reporting chuchcuchcuchcuc.',
        }
    },
    beforeMount() {
        this.$store.commit('udpateHeaderTitle', 'REPORT')
    },
}
</script>

<style></style>