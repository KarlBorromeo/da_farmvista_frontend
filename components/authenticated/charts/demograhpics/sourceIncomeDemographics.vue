<template>
  <v-col
    cols="10"
    lg="6"
    class="mt-2"
    style="display: flex; flex-direction: column; justify-content: center"
  >
    <div id="custom-card">
      <v-spacer />
      <apexchart :options="options" :series="series" />
      <v-spacer />
      <p>{{ recommendation }}</p>
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
      return this.$store.getters['analytics/demographics']
        .farmSourceIncomeDistribution.series
    },
    options() {
      return {
        title: {
          text: this.$store.getters['analytics/demographics']
            .farmSourceIncomeDistribution.title,
          align: 'center',
        },
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: true,
          },
        },
        // responsive: [
        // 	{
        // 		breakpoint: 480,
        // 		options: {
        // 			legend: {
        // 				position: 'bottom',
        // 				offsetX: -10,
        // 				offsetY: 0,
        // 			},
        // 		},
        // 	},
        // ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            borderRadiusApplication: 'end', // 'around', 'end'
            borderRadiusWhenStacked: 'last', // 'all', 'last'
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          categories:
            this.$store.getters['analytics/demographics']
              .farmSourceIncomeDistribution.categories,
        },
        legend: {
          position: 'bottom',
          offsetY: 0,
        },
        colors: chartPallet(),
        fill: {
          opacity: 1,
        },
      }
    },
    recommendation() {
      return this.$store.getters['analytics/demographics']
        .farmSourceIncomeDistribution.recommendation
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
