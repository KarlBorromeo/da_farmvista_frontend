<template>
	<v-col cols="10" lg="4" class="mt-2">
    <apexchart
      :options="options"
      :series="series"
      style="height: 80%!important; border: 1px solid black"
    />
     <v-card style="height: 20%!important; overflow: auto" class="text-center" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro sit, at excepturi esse hic nulla ex eaque perferendis cupiditate!</v-card>
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
