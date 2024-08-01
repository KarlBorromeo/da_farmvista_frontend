<template>
  <div>
    <v-container v-if="fetching">
      <v-skeleton-loader
        type="article, actions,image"
        v-for="i in 3"
        :key="i"
        class="mb-4"
      />
    </v-container>
    <div v-else>
      <v-container class="mb-0">
        <v-row>
            <v-spacer />
            <commodity-change @switchCommodity="switchCommodity"/>
        </v-row>   
      </v-container>
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
          <v-tab-item v-for="item in items" :key="item">
            <!-- <v-card
              flat
              class="elevation-0"
            > -->
            <component :is="components[tab]"></component>
            <!-- </v-card> -->
          </v-tab-item>
        </v-tabs-items>
      </page-contents>      
    </div>
    
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
import commodityChange from '~/components/authenticated/commodityChangeCogs.vue'
export default {
  middleware: 'authSuperadminAdmin',
  components: {
    PageDescription,
    PageContents,
    Demographics,
    PestDiseases,
    Infrastructure,
    MarketAccess,
    AccessResources,
    commodityChange
  },
  data() {
    return {
      comp: 'logsTable',
      description:
        'This module offers critical analytics capabilities, empowering users to gain valuable insights from data, optimize performance, and make informed decisions to drive success.',
      tab: 0,
      items: [
        'Demographics',
        'Pest and Diseases',
        'Infrastructure',
        'Market access',
        'Access Resources',
      ],
      components: [
        'Demographics',
        'PestDiseases',
        'Infrastructure',
        'MarketAccess',
        'AccessResources',
      ],
      commodity: 'coffee',
      fetching: true
    }
  },
  methods: {
    async switchCommodity(commodity){
      this.commodity = commodity
    },
    async fetchDemographics(){
      this.fetching = true
      try {
        await this.$store.dispatch('analytics/fetchDemographics',this.commodity)
      } catch (err) {
        console.error(err)
      }    
      this.fetching = false  
    }
  },
  beforeMount() {
    this.fetching = true;
    this.$store.commit('udpateHeaderTitle', 'ANALYTICS')
  },
  async mounted() {
    await this.fetchDemographics()
  },
  watch: {
    tab(val) {},
  },
}
</script>

<style></style>
