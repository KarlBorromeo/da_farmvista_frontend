
<template>
	<v-col cols="10" lg="4" class="mt-2">
    <apexchart
      :options="options"
      :series="series"
      style="height: 80%!important; border: 1px solid black; min-height: 250px!important"
    />      
    <v-card style="height: 20%!important; overflow: auto" >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro sit, at excepturi esse hic nulla ex eaque perferendis cupiditate!
    </v-card>    
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
          height: '250px',
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
        yaxis: {
          title: {
            text: 'count',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} counts`,
          },
        },
        // responsive: [{
        //     breakpoint: 960,
        //     options: {
        //         plotOptions: {
        //             bar: {
        //                 horizontal: true
        //             },
        //         },
        //     },
        // }],
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
*{
  box-sizing: border-box!important;
}
</style>
