<template>
    <tab-contents class="mt-3 elevation-0" style="background-color: transparent!important">
      <v-row justify="center">
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
      <v-row justify="center">
          <list-comparison />
          <active-incative-comparison />
          <total-coffee-farmers />
      </v-row>  
    </tab-contents>

</template>

<script>
import ActiveFarmers from '~/components/authenticated/charts/activeFarmers.vue'
import TabContents from '~/components/authenticated/tabContents.vue'
import listComparison from '~/components/authenticated/charts/listComparison.vue'
import ActiveIncativeComparison from '~/components/authenticated/charts/activeIncativeComparison.vue'
import totalCoffeeFarmers from '~/components/authenticated/charts/totalCoffeeFarmers.vue'
export default {
  components: {TabContents, ActiveFarmers, listComparison, ActiveIncativeComparison, totalCoffeeFarmers},
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
