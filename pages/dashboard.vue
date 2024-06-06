<template>
    <tab-contents class="mt-3 elevation-0" style="background-color: transparent!important">
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
          <total-coffee-farmers />
      </v-row>
      <v-row>
        <sold-coffee-provinces />
      </v-row>
      <v-row>
          <coffee-production />
          <hear-coffee-farm-tech />
          <hear-coffee-farm-tech />
      </v-row>
      <v-row>
          <marketing-outlets />
          <farm-organizations />
      </v-row>
    </tab-contents>
</template>

<script>
import ActiveFarmers from '~/components/authenticated/charts/activeFarmers.vue'
import TabContents from '~/components/authenticated/tabContents.vue'
import FarmerStatusPopulation from '~/components/authenticated/charts/farmerStatusPopulation.vue'
import totalCoffeeFarmers from '~/components/authenticated/charts/totalCoffeeFarmers.vue'
import coffeeProduction from '~/components/authenticated/charts/coffeeProduction.vue'
import soldCoffeeProvinces from '~/components/authenticated/charts/soldCoffeeProvinces.vue'
import hearCoffeeFarmTech from '~/components/authenticated/charts/hearCoffeeFarmTech.vue'
import farmOrganizations from '~/components/authenticated/tables/farmOrganizations.vue'
import marketingOutlets from '~/components/authenticated/tables/marketingOutlets.vue'
export default {
  components: {TabContents, ActiveFarmers, FarmerStatusPopulation, totalCoffeeFarmers, coffeeProduction, soldCoffeeProvinces, hearCoffeeFarmTech, farmOrganizations, marketingOutlets},
  async beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'DASHBOARD')
    try{
      await this.$store.dispatch('dashboard/dashboardFetch')
    }catch(err){
      console.error(err);
    }
  },
  data(){
    return{
      styles: [
        `background-image: linear-gradient( 135deg, #dcdfe3 10%, #1a7358 100%)`,
        `background-image: linear-gradient( 135deg, #dcdfe3 10%, #d3e8d3 100%)`,
        `background-image: linear-gradient( 135deg, #dcdfe3 10%, #d9d9d9 100%)`,
        `background-image: linear-gradient( 135deg, #dcdfe3 10%, #008000 100%)`,
        `background-image: linear-gradient( 135deg, #dcdfe3 10%, #F7F5F2 100%)`,
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
