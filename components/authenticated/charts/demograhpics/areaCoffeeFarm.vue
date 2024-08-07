<template>
  <v-col
    cols="10"
    lg="12"
    class="mt-2"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div id="custom-card">
      <v-row justify="center">
        <v-col cols="12" lg="8">
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
      return [
        {
          name: 'series1',
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          data: [11, 32, 45, 32, 34, 52, 41],
        },
        {
          name: 'series3',
          data: [30, 10, 2, 51, 2, 19, 10],
        },
        {
          name: 'series4',
          data: [21, 33, 42, 32, 34, 55, 11],
        },
      ]
    },
    recommendation(){
      return 'fdsafsd fdsf dsaf dsafdsafdas f'
    },
    title(){
      return 'Area Coffee Farm'
    },
    options() {
      return {
        // title: {
        //   text: 'Area Coffee Farm',
        //   align: 'center',
        // },
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
          ],
        },
        colors: chartPallet(),
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      }
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
