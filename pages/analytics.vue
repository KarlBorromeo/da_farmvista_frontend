<template>
  <div>
    <page-description
      icon="mdi-finance"
      title="Analytics"
      :description="description"
    />  

    <v-card class="mx-5 elevation-0 my-0 py-0" color="transparent">
      <v-container class="mt-0">
        <v-tabs
            v-model="tab"
            background-color="transparent"
            show-arrows
            centered
            center-active
            light
            next-icon="mdi-arrow-right-bold-outline"
            prev-icon="mdi-arrow-left-bold-outline"
          >
      
            <v-tab
              v-for="item in items"
              :key="item"
              class="caption font-weight-bold my-0 py-0"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
      </v-container>
    </v-card>
    <page-contents class="mt-0">
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          <v-card
            flat
          >
             <component :is="components[tab]"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </page-contents>
  </div>



</template>

<script>
import PageContents from '~/components/authenticated/pageContents.vue'
import PageDescription from '~/components/authenticated/pageDescription.vue'
import Demographics from '~/components/authenticated/tabItems/analytics/demographics.vue'
import PestDiseases from '~/components/authenticated/tabItems/analytics/pestDiseases.vue'
import Infrastructure from '~/components/authenticated/tabItems/analytics/infrastructure.vue'
import MarketAccess from '~/components/authenticated/tabItems/analytics/marketAccess.vue'
import AccessResources from '~/components/authenticated/tabItems/analytics/accessResources.vue'




export default {
  middleware: 'authSuperadminAdmin',
  components: { PageDescription, PageContents, Demographics, PestDiseases, Infrastructure, MarketAccess, AccessResources},
  data() {
    return {
      comp: 'logsTable',
      description:
        'This module offers critical analytics capabilities, empowering users to gain valuable insights from data, optimize performance, and make informed decisions to drive success.',
        tab: 0,
        items: [
          'Demographics', 'Pest and Diseases', 'Infrastructure', 'Market access','Access Resources'
        ],
        components: ['Demographics', 'PestDiseases', 'Infrastructure', 'MarketAccess', 'AccessResources' ],
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'ANALYTICS')
  },
  watch:{
    tab(val){
      console.log(val);
    }
  }
}
</script>

<style></style>
