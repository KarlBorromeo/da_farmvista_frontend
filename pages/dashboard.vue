<template>
    <page-contents class="mt-3 elevation-0" style="background-color: transparent!important">
      <div v-if="fetching">
        <v-skeleton-loader
          type="article, actions,image"
          v-for="i in 3"
          :key="i"     
          class="mb-4" 
        />        
      </div>
      <div v-else>
        <v-row justify="center">
          <active-farmers  
              v-for="prov,ind in provinces"
              :key="ind"
              :name="prov.provinceName"
              :count="prov.count"
              :styleProp="prov.style"
            />
        </v-row>
        <v-row justify="center">
            <farmer-status-population />
            <farmer-total-population />
        </v-row>
        <v-row justify="center">
            <sold-coffee-provinces />
        </v-row>
        <v-row>
            <outlet-market-population />
            <coffee-production />
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
import ActiveFarmers from '~/components/authenticated/charts/activeFarmers.vue'
import PageContents from '~/components/authenticated/pageContents.vue'
import FarmerStatusPopulation from '~/components/authenticated/charts/farmerStatusPopulation.vue'
import FarmerTotalPopulation from '~/components/authenticated/charts/farmerTotalPopulation.vue'
import coffeeProduction from '~/components/authenticated/charts/coffeeProduction.vue'
import soldCoffeeProvinces from '~/components/authenticated/charts/soldCoffeeProvinces.vue'
import hearCoffeeFarmTech from '~/components/authenticated/charts/hearCoffeeFarmTech.vue'
import farmOrganizations from '~/components/authenticated/tables/farmOrganizations.vue'
import marketingOutlets from '~/components/authenticated/tables/marketingOutlets.vue'
import OutletMarketPopulation from '~/components/authenticated/charts/outletMarketPopulation.vue'
export default {
  components: {PageContents, ActiveFarmers, FarmerStatusPopulation, FarmerTotalPopulation, coffeeProduction, soldCoffeeProvinces, hearCoffeeFarmTech, farmOrganizations, marketingOutlets, OutletMarketPopulation},
  async beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'DASHBOARD')
    try{
      this.fetching = true
      await this.$store.dispatch('dashboard/dashboardFetch')
    }catch(err){
      console.error(err);
    }
    this.fetching = false
  },
  data(){
    return{
      fetching: true,
      styles: [
        `background-color: #1a7358`,
        `background-color: #1a7358`,
        `background-color: #1a7358`,
        `background-color: #1a7358`,
        `background-color: #1a7358`,
      ],
    }
  },
  methods:{
    aw(){
      this.$store.commit('dashboard/modify')
    },
    ew(){
      this.$store.commit('dashboard/ew')
    }
  },
  computed:{
    provinces(){
      const activeFarmers = this.$store.getters['dashboard/data'].activeFarmersByProvince
      const provinces = activeFarmers.map((data,index) => data = {...data,style:this.styles[index]})
      return provinces
    }
  },
}
</script>
