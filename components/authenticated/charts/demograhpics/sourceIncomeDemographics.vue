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
      return [
            {
            name: 'PRODUCT A',
            data: [44, 55, 41, 67, 22, 43]
            }, 
            {
            name: 'PRODUCT B',
            data: [13, 23, 20, 8, 13, 27]
            }, 
            {
            name: 'PRODUCT C',
            data: [11, 17, 15, 15, 21, 14]
            },
            {
            name: 'PRODUCT D',
            data: [21, 7, 25, 13, 22, 8]
            }
        ]
    },
    options(){
      return {
            title: {
                text: 'Source Income',
                align: 'center'
            },
            chart: {
              type: 'bar',
              height: 350,
              stacked: true,
              toolbar: {
                show: false
              },
              zoom: {
                enabled: true
              }
            },
            responsive: [{
              breakpoint: 480,
              options: {
                legend: {
                  position: 'bottom',
                  offsetX: -10,
                  offsetY: 0
                }
              }
            }],
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
                      fontSize: '13px',
                      fontWeight: 900
                    }
                  }
                }
              },
            },
            xaxis: {
              type: 'datetime',
              categories: ['01/01/2011 GMT', '01/02/2011 GMT', '01/03/2011 GMT', '01/04/2011 GMT',
                '01/05/2011 GMT', '01/06/2011 GMT'
              ],
            },
            legend: {
              position: 'bottom',
              offsetY: 0
            },
            colors: chartPallet(),
            fill: {
              opacity: 1
            }
          }
          
          
        
    }
  }
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
