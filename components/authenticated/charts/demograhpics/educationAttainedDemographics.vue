<template>
	<v-col cols="10" lg="4" class="mt-2" style="display:flex; flex-direction: column; justify-content:center">
    <div id="custom-card">
      <apexchart
        :options="options"
        :series="series"
      />
      <v-spacer />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro sit, at excepturi esse hic nulla ex eaque perferendis cupiditate!
      </p>
    </div>
	</v-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { chartPallet } from '~/chart_config/chart'
export default {
	components: {
		apexchart: VueApexCharts,
	},
	computed: {
		series() {
			return [76, 67, 61, 90]
		},
		options() {
			return {
        title:{
          text: 'Highest Education Attained',
          align: 'center'
        },
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
              size: '30%',
              background: 'transparent',
              image: undefined,
            },
            dataLabels: {
              name: {
                show: true,
              },
              value: {
                show: true,
              }
            },
            barLabels: {
              enabled: true,
              useSeriesColors: true,
              margin: 8,
              fontSize: '16px',
              formatter: function(seriesName, opts) {
                return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
            },
          }
        },
        colors: chartPallet(),
        labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
		  }
    }
	}
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
