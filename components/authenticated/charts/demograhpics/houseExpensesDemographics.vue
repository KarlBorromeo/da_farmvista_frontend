<template>
	<v-col cols="10" lg="6" class="mt-2" style="display:flex; flex-direction: column; justify-content:center">
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
import {chartPallet} from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts';
export default {
  components: {
    apexchart: VueApexCharts,
  },
  computed:{
    series(){
      return [{
            name: 'Series 1',
            data: [20, 100, 40, 30, 50, 80, 33, 20, 100, 40, 30, 50, 80, 33],
          }]
    },
    options(){
      return {
        chart: {
            height: 350,
            type: 'radar',
        },
        dataLabels: {
            enabled: true
        },
        plotOptions: {
            radar: {
            size: 140,
            polygons: {
                strokeColors: '#e9e9e9',
                fill: {
                colors: ['#f8f8f8', '#fff']
                }
            }
            }
        },
        title: {
            text: 'Household Expenses',
            align: 'center'
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
            formatter: function(val) {
                return val
            }
            }
        },
        xaxis: {
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday2', 'Monday2', 'Tuesday2', 'Wednesday2', 'Thursday2', 'Friday2', 'Saturday2']
        },
        yaxis: {
            labels: {
            formatter: function(val, i) {
                if (i % 2 === 0) {
                return val
                } else {
                return ''
                }
            }
            }
        }
        }
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
