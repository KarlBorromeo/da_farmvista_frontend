<template>
  <v-col cols="12" lg="6" class="mt-2">
    <v-card id="total-farmers" style="width: 100%" class="pt-4" />  
  </v-col>

</template>

<script>
import {chartPallet} from '~/chart_config/chart'
import ApexCharts from 'apexcharts';
export default {
  mounted() {
    this.palette = chartPallet()
    this.renderChart();
  },
  data(){
    return{
      pallete: '',
    }
  },
  methods: {
    renderChart() {
      const options = {
        title: {
          text: 'Total Coffee Farmer Population 456',
          align: 'start'
        },
        series: [44, 55, 41, 17, 15],
        labels: ['SDS', 'SDN', 'AGN', 'AGS','DINAGAT'],
        chart: {
          type: 'pie',
          align: 'center',
          height: 350,
          toolbar: {
            show: false,
          }
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['white'],
        },
        legend: {
          show: true
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} farmers`,
          },
        },
        noData: {
          text: 'No Data Available!',
          align: 'center',
          verticalAlign: 'middle',
        },
        theme: {
          mode: 'light', 
          palette: this.palette, 
        }
      };

      const chart = new ApexCharts(document.querySelector('#total-farmers'), options);
      chart.render();
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for your chart here */
</style>
