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
import {chartPallet} from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts';
export default {
  components: {
    apexchart: VueApexCharts,
  },
  computed:{
    series(){
      return [{
            name: 'Inflation',
            data: [25,68,100,23]
          }]
    },
    options(){
      return {
        title: {
          text: 'Age',
          align: 'center'
        },
        chart: {
          type: 'bar',
          height: 450,
          toolbar: {
            show: false,
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '65%',
            endingShape: 'rounded',
          },
        },
        // dataLabels: {
        //   enabled: true,
        // },
        stroke: {
          show: true,
          width: 1,
          colors: ['white'],
        },
        legend: {
          show: true
        },
        xaxis: {
          categories:  ['range1','range2','range3','range4']
        },
        colors: chartPallet(),
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} counts`,
          },
        },
        noData: {
          text: 'No Data Available!',
          align: 'center',
          verticalAlign: 'middle',
        },
      }
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
