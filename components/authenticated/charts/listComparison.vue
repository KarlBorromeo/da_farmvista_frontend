<template>
  <v-col cols="12" lg="6" class="mt-2">
    <v-card id="list-comparison" style="width: 100%" class="pt-4 pl-2"></v-card>    
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
          text: 'Farmer Population Comparison',
          align: 'center'
        },
        series: [
          { name: 'Dept. of Agricluture List', data: [1222, 86, 712, 787, 70]},
          { name: 'Actual List', data: [1174, 86, 712, 764, 70] },
        ],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false,
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '65%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['white'],
        },
        legend: {
          show: true
        },
        xaxis: {
          categories: ['Surigao del Sur','Surigao del Norte','Agusan del Sur','Agusan del Norte','Dinagat Island'],
        },
        yaxis: {
          title: {
            text: 'Coffee Farmer Population',
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} farmers`,
          },
        },
        responsive: [{
            breakpoint: 960,
            options: {
              plotOptions: {
                  bar: {
                      horizontal: true
                  },
              },
              //modify the options here, this modification will be applied below the breakpoint value provided
            },
        }],
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

      const chart = new ApexCharts(document.querySelector('#list-comparison'), options);
      chart.render();
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for your chart here */
</style>
