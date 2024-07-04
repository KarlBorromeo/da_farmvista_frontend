<template>
  <v-col
    cols="10"
    lg="6"
    class="mt-2"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div id="custom-card">
      <apexchart :options="options" :series="series" />
      <v-spacer />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro sit,
        at excepturi esse hic nulla ex eaque perferendis cupiditate!
      </p>
    </div>
  </v-col>
</template>
<script>
import { chartPallet } from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    series() {
      return [
        {
          name: 'Funnel Series',
          data: [1380, 1100, 990, 880, 740, 548, 330, 200],
        },
      ]
    },
    options() {
      return {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 0,
            horizontal: true,
            barHeight: '80%',
            isFunnel: true,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
          },
          dropShadow: {
            enabled: true,
          },
        },
        title: {
          text: 'Best Commodity Intercropped',
          align: 'center',
        },
        xaxis: {
          categories: [
            'Sourced',
            'Screened',
            'Assessed',
            'HR Interview',
            'Technical',
            'Verify',
            'Offered',
            'Hired',
          ],
        },
        colors: chartPallet(),
        legend: {
          show: false,
        },
      }
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
