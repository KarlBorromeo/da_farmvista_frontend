<template>
  <v-col cols="12" lg="6" class="mt-2">
    <v-card id="active-inactive-comparison" style="width: 100%" class="pt-4 pl-2"></v-card>    
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
          text: 'Active and Inactive Coffee Farmers',
          align: 'center'
        },
        series: [
          { name: 'Inactive', data: [478, 0, 0, 26, 0]},
          { name: 'Active', data: [547, 0, 0, 8, 0] },
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
            text: 'Active and Inactive Coffee Farmers',
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

      const chart = new ApexCharts(document.querySelector('#active-inactive-comparison'), options);
      chart.render();
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for your chart here */
</style>
