<template>
  <v-col
    cols="10"
    lg="4"
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
  computed: {
    series() {
      return this.$store.getters['analytics/demographics']
        .educationalBackgroundDistribution.series
    },
    title(){
      return this.$store.getters['analytics/demographics']
            .educationalBackgroundDistribution.title
    },
    options() {
      return {
        // title: {
        //   text: this.$store.getters['analytics/demographics']
        //     .educationalBackgroundDistribution.title,
        //   align: 'center',
        // },
        chart: {
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
              margin: 5,
              size: '10%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                },
              },
            },
          },
        },
        colors: chartPallet(),
        labels:
          this.$store.getters['analytics/demographics']
            .educationalBackgroundDistribution.categories,
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'center',
          floating: false,
          formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
          },
        },
      }
    },
    recommendation() {
      return this.$store.getters['analytics/demographics']
        .educationalBackgroundDistribution.recommendation
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
