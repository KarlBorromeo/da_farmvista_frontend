<template>
  <v-col
    cols="10"
    lg="6"
    class="mt-2"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div id="custom-card">
      <v-row justify="center">
        <v-col
          cols="10"
          style="display: flex !important; flex-direction: column !important"
        >
          <chart-title :title="title" />
          <apexchart :options="options" :series="series" />
          <v-spacer />
          <chart-recommendation :text="recommendation" />
        </v-col>
      </v-row>
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
      return [44, 55, 41, 17, 15]
    },
    title(){
      return 'Cropping System Count'
    },
    recommendation(){
      return 'fdsfdas fdfa fdsaf f dsfasdf fas'
    },
    options() {
      return {
        chart: {
          width: 380,
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 270,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          formatter: function (val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
          },
        },
        // title: {
        //   text: 'Cropping System Count',
        //   align: 'center',
        // },
        colors: chartPallet(),
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      }
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
