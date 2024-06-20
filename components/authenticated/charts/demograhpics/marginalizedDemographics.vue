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
      return [42, 47, 52, 58, 65]
    },
    options(){
      return {
            title: {
                text: 'Marginalized Sectors',
                align: 'center'
            },
            chart: {
              width: 380,
              type: 'polarArea'
            },
            labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
            fill: {
              opacity: 1
            },
            stroke: {
              width: 1,
              colors: undefined
            },
            yaxis: {
              show: false
            },
            legend: {
              position: 'bottom'
            },
            dataLabels: {
                enabled: true,
                offsetX: 15,
                offsetY: 20,
                style: {
                    colors: ['black'],
                    fontWeight: 'bold',
                    fontSize: '14px',
                },
                dropShadow: {
                    enabled: false,
                },
            },
            plotOptions: {
              polarArea: {
                rings: {
                  strokeWidth: 0
                },
                spokes: {
                  strokeWidth: 0
                },
              }
            },
            tooltip: {
                enabled: true,
                formatter: (seriesName) => seriesName,
                style: {
                    color: '#292929',
                    fontFamily: undefined
                },
            },
            colors: chartPallet(),
          }
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
