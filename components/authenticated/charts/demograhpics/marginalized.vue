<template>
  <v-col
    cols="10"
    lg="6"
    class="mt-2"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div id="custom-card">
      <chart-title :title="title" />
      <apexchart :options="options" :series="series" />
      <v-spacer />
      <chart-recommendation :text="recommendation" />
    </div>
  </v-col>
</template>
<script>
import { chartPallet } from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts'
import chartTitle from '../chartTitle.vue'
import chartRecommendation from '../chartRecommendation.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    chartTitle,
    chartRecommendation
  },
  computed: {
    series() {
      return this.$store.getters['analytics/demographics']
        .marginalizedSectorDistribution.series
    },
    title(){
      return this.$store.getters['analytics/demographics']
            .marginalizedSectorDistribution.title
    },
    options() {
      return {
        // title: {
        //   text: this.$store.getters['analytics/demographics']
        //     .marginalizedSectorDistribution.title,
        //   align: 'center',
        // },
        chart: {
          type: 'polarArea',
        },
        labels:
          this.$store.getters['analytics/demographics']
            .marginalizedSectorDistribution.categories,
        fill: {
          opacity: 1,
        },
        stroke: {
          width: 1,
          colors: undefined,
        },
        yaxis: {
          show: false,
        },
        legend: {
          position: 'bottom',
        },
        dataLabels: {
          enabled: true,
          offsetX: 15,
          offsetY: 20,
          style: {
            colors: ['black'],
            fontWeight: 'bold',
            // fontSize: '14px',
          },
          dropShadow: {
            enabled: false,
          },
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 1,
            },
            spokes: {
              strokeWidth: 2,
            },
          },
        },
        tooltip: {
          enabled: true,
          formatter: (seriesName) => seriesName,
          style: {
            color: '#292929',
            fontFamily: undefined,
          },
        },
        colors: chartPallet(),
      }
    },
    recommendation() {
      return this.$store.getters['analytics/demographics']
        .marginalizedSectorDistribution.recommendation
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
