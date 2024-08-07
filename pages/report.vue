<template>
  <div>
    <v-container class="mb-0">
      <v-row>
          <v-spacer />
          <commodity-change @switchCommodity="switchCommodity"/>
      </v-row>   
    </v-container>
    <page-description
      icon="mdi-chart-box"
      title="Report"
      :description="description"
    />
  </div>
</template>

<script>
import commodityChange from '~/components/authenticated/commodityChangeCogs.vue'
import PageDescription from '~/components/authenticated/pageDescription.vue'
export default {
  middleware: 'authSuperadminAdmin',
  components: { PageDescription, commodityChange },
  data() {
    return {
      description: 'This module is for reporting chuchcuchcuchcuc.',
    }
  },
  methods:{
    switchCommodity(commodity){
      alert(commodity)
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'REPORT')
  },
}
</script>

<style></style>
