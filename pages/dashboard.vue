<template>
    <tab-contents>
      <v-row class="ma-5" justify="center" style="border: 1px solid black">
          <active-farmers  
            :name="provinces[0].name"
            :count="provinces[0].count"
          />
          <v-spacer />
          <active-farmers  
            :name="provinces[1].name"
            :count="provinces[1].count"
          />
          <v-spacer />
          <active-farmers  
            :name="provinces[2].name"
            :count="provinces[2].count"
          />
          <v-spacer />
          <active-farmers  
            :name="provinces[3].name"
            :count="provinces[3].count"
          />
          <v-spacer />
          <active-farmers  
            :name="provinces[4].name"
            :count="provinces[4].count"
          />
      </v-row>      
    </tab-contents>

</template>

<script>
import ActiveFarmers from '~/components/authenticated/charts/activeFarmers.vue'
import SampleChart from '~/components/authenticated/charts/sampleChart.vue'
import TabContents from '~/components/authenticated/tabContents.vue'
export default {
  components: {SampleChart, TabContents, ActiveFarmers},
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'DASHBOARD')
  },
  data(){
    return{
      provinces: [
        {
          name: 'Surigao Del Sur',
          count: 1222
        },
        {
          name: 'Surigao Del Norte',
          count: 86
        },
        {
          name: 'Agusan Del Sur',
          count: 712
        },
        {
          name: 'Agusan Del Norte',
          count: 787
        },
        {
          name: 'Province of Dinagat Island',
          count: 70
        }
      ]
    }
  }
}
</script>
