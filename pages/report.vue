<template>
  <page-description
    icon="mdi-chart-box"
    title="Report"
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
            'This module is for reporting chuchcuchcuchcuc.',
        }
    },
    beforeMount() {
        this.$store.commit('udpateHeaderTitle', 'REPORT')
    },
}
</script>

<style></style>