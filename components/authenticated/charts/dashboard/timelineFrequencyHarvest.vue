<template>
  <v-col cols="12" lg="4">
    <div id="custom-card">
      <v-row justify="end" class="ma-0 pa-0" style="flex-grow: 0!important">
        <v-col cols="1" id="year-dropdown" class="ma-0 pa-0">
          <v-menu bottom left class="ma-0 pa-0" style="border: 1px solid black">
            <template v-slot:activator="{ on, attrs }">
              <v-icon class="ma-0 pa-0" v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item
                v-for="(year, index) in years"
                :key="index"
                color="white"
                @click="changeYear(year)"
              >
                {{ year }}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <chart-title :title="title"/>
      <v-spacer />
      <v-row align="start" class="mt-2">
        <v-col cols="12" >
          <apexchart :options="options" :series="series"/>
        </v-col>
      </v-row>
      <v-spacer />
      <chart-recommendation :text="recommendation" />
    </div>
  </v-col>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import { chartPallet } from '~/chart_config/chart'
import chartTitle from '../chartTitle.vue'
import chartRecommendation from '../chartRecommendation.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    chartTitle,
    chartRecommendation
  },
  methods: {
    changeYear(year) {
      this.$store.commit('dashboard/changeTimelineFrequencySelected', year)
    },
  },
  computed: {
    title(){
      if(this.$store.getters['dashboard/data'].timelineFrequencyOfHarvestPerYear.title){
        return this.$store.getters['dashboard/data']
                .timelineFrequencyOfHarvestPerYear.title +
              ' - ' +
              this.$store.getters['dashboard/timelineFrequencySelected'].year        
      }else{
        return ''
      }

    },
    recommendation(){
      return this.$store.getters['dashboard/timelineFrequencySelected'].recommendation
    },
    years() {
      return this.$store.getters['dashboard/data']
        .timelineFrequencyOfHarvestPerYear.years
    },
    series() {
      return this.$store.getters['dashboard/timelineFrequencySelected'].series
    },
    options() {
      return {
        chart: {
          type: 'area',
          height: 800,
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: false,
            },
          },
        },
        yaxis: {
          title: {
            text: this.$store.getters['dashboard/data']
              .timelineFrequencyOfHarvestPerYear.yLabel,
          },
        },
        dataLabels: {
          enabled: true,
          offsetY: -5,
          style: {
            colors: ['#000'],
          },
          formatter: function (value) {
            return value === 0 ? '' : value
          },
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories:
            this.$store.getters['dashboard/data']
              .timelineFrequencyOfHarvestPerYear.categories,
        },
        colors: chartPallet(),
      }
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
#year-dropdown {
  z-index: 20 !important;
  display: flex;
  justify-content: center;
}
</style>
