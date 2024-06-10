<template>
  <v-col cols="12" lg="6" class="mt-2">
    <v-card class="pa-3 rounded-lg" style="height: 100%; display:flex; flex-direction: column;">
      <menu-dropdown-provinces/>
      <apexchart :options="options" :series="series"/>    
    </v-card>
  </v-col>
</template>

<script>
import {chartPallet} from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts';
import MenuDropdownProvinces from '../menuDropdownProvinces.vue';
export default {
  components: {
    apexchart: VueApexCharts,
    MenuDropdownProvinces,
  },
  computed:{
    provinces(){
      return this.$store.getters['dashboard/data'].soldCommodityByProvince.provinces
    },
    series(){
      return this.$store.getters['dashboard/data'].intervieweeStatusByProvince.series
    },
    options(){
      return {
        title: {
          text: this.$store.getters['dashboard/data'].intervieweeStatusByProvince.title,
          align: 'center'
        },
        chart: {
          type: 'bar',
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
          categories: this.$store.getters['dashboard/data'].intervieweeStatusByProvince.categories,
        },
        colors: chartPallet(),
        yaxis: {
          title: {
            text: this.$store.getters['dashboard/data'].intervieweeStatusByProvince.yLabel,
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
            },
        }],
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
