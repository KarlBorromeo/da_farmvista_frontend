<template>
  <page-contents
    class="mt-3 elevation-0"
    style="background-color: transparent !important"
  >
    <div v-if="fetching">
      <v-skeleton-loader
        type="article, actions,image"
        v-for="i in 3"
        :key="i"
        class="mb-4"
      />
    </div>
    <div v-else>
      <v-row>
        <v-spacer />
        <commodity-change @switchCommodity="switchCommodity"/>
      </v-row>
      <v-row justify="center">
        <farmer-counts
          v-for="(prov, ind) in provinces"
          :key="ind"
          :name="prov.provinceName"
          :active="prov.activeCount"
          :inactive="prov.inactiveCount"
        />
     </v-row> 
     <v-row justify="center">
        <caraga-provinces :commodity="commodity"/>
      </v-row>
     <v-row justify="center">
        <profile-status-count />
        <active-farmer-counts />
      </v-row>
      <v-row justify="center">
        <sold-coffee-variety />
      </v-row>
    
       <v-row>
        <outlet-market-population />
        <timeline-frequency-harvest />
         <hear-coffee-farm-tech />
      </v-row>
   
      <v-row>
        <marketing-outlets />
        <farm-organizations />
      </v-row> 
    </div>
  </page-contents>
</template>

<script>
import farmerCounts from '~/components/authenticated/charts/dashboard/farmerCounts.vue'
import PageContents from '~/components/authenticated/pageContents.vue'
import profileStatusCount from '~/components/authenticated/charts/dashboard/profileStatusCount.vue'
import activeFarmerCounts from '~/components/authenticated/charts/dashboard/activeFarmerCounts.vue'
import timelineFrequencyHarvest from '~/components/authenticated/charts/dashboard/timelineFrequencyHarvest.vue'
import soldCoffeeVariety from '~/components/authenticated/charts/dashboard/soldCoffeeVariety.vue'
import hearCoffeeFarmTech from '~/components/authenticated/charts/dashboard/hearCoffeeFarmTech.vue'
import farmOrganizations from '~/components/authenticated/tables/farmOrganizations.vue'
import marketingOutlets from '~/components/authenticated/tables/marketingOutlets.vue'
import OutletMarketPopulation from '~/components/authenticated/charts/dashboard/outletMarketPopulation.vue'
import caragaProvinces from '~/components/authenticated/map/dashboard/caragaProvinces.vue'
import commodityChange from '~/components/authenticated/commodityChangeCogs.vue'
export default {
  components: {
    PageContents,
    farmerCounts,
    profileStatusCount,
    activeFarmerCounts,
    timelineFrequencyHarvest,
    soldCoffeeVariety,
    hearCoffeeFarmTech,
    farmOrganizations,
    marketingOutlets,
    OutletMarketPopulation,
    commodityChange,
    caragaProvinces
  },
  async beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'DASHBOARD')
    await this.fetchDashboard('coffee')
  },
  created(){
    this.fetching = true;
  },
  data() {
    return {
      fetching: true,
      commodity: 'coffee'
    }
  },
  methods: {
    async switchCommodity(commodity){
      await this.fetchDashboard(commodity)
    },
    async fetchDashboard(commodity){
      try {
        this.fetching = true
        await this.$store.dispatch('dashboard/dashboardFetch',commodity)
        this.commodity = commodity
      } catch (err) {
        console.error(err)
        alert('something went wrong fetching the dashboard for commodity type:' + commodity)
      }
      this.fetching = false
    }
  },
  computed: {
    provinces() {
      const activeFarmers =
        this.$store.getters['dashboard/data'].farmersCountByProvince
      const provinces = activeFarmers.map(
        data => data = { ...data }
      )
      return provinces
    }
  },
}
</script>
