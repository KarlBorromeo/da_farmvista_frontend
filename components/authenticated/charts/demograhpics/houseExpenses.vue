<template>
  <v-col
    cols="10"
    lg="6"
    class="mt-2"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div id="custom-card">
      <chart-title :title="title" />
      <v-spacer />
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
        .householdExpenseDistribution.series
    },
    title(){
      return this.$store.getters['analytics/demographics']
            .householdExpenseDistribution.title
    },
    options() {
      return {
        chart: {
          // height: 350,
          type: 'radar',
        },
        dataLabels: {
          enabled: true,
        },
        plotOptions: {
          radar: {
            // size: 140,
            polygons: {
              strokeColors: '#e9e9e9',
              fill: {
                colors: ['#fff'],
              },
            },
          },
        },
        // title: {
        //   text: this.$store.getters['analytics/demographics']
        //     .householdExpenseDistribution.title,
        //   align: 'center',
        // },
        dataLabels: {
          enabled: false,
        },
        colors: chartPallet(),
        markers: {
          size: 4,
          colors: chartPallet(),
          strokeColor: '#FF4560',
          strokeWidth: 2,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            },
          },
        },
        xaxis: {
          categories:
            this.$store.getters['analytics/demographics']
              .householdExpenseDistribution.categories,
        },
        yaxis: {
          labels: {
            formatter: function (val, i) {
              if (i % 2 === 0) {
                return val
              } else {
                return ''
              }
            },
          },
        },
      }
    },
    recommendation() {
      return this.$store.getters['analytics/demographics']
        .householdExpenseDistribution.recommendation
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
