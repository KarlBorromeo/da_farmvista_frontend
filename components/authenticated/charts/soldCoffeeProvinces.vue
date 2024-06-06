<template>
  <v-col cols="12" class="mt-2">
    <v-card class="pa-3" style="height:100%">
      <v-row justify="end">
        <v-col cols="1" id="year-dropdown">
          <v-menu offset-y left>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item
                v-for="(province, index) in provinces"
                :key="index"
                color="white"
                @click="changeprovince(province)"
              >
              {{province}}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <apexchart :options="options" :series="series" style="max-height:300px; display:flex; align-items:center"/>       
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
  methods: {
    changeprovince(province){
      this.$store.commit('dashboard/changeSoldCommodityByProvinceSelected',province)
    }
  },
  computed:{
    provinces(){
      return this.$store.getters['dashboard/data'].soldCommodityByProvince.provinces
    },
    series(){
      return this.$store.getters['dashboard/soldCommodityByProvinceSelected'].series
    },
    options(){
      return {
        title: {
          text: this.$store.getters['dashboard/data'].soldCommodityByProvince.title + ' - ' + this.$store.getters['dashboard/soldCommodityByProvinceSelected'].province,
          align: 'center'
        },
        chart: {
          stacked: true,
          height: 400,
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
          categories: this.$store.getters['dashboard/soldCommodityByProvinceSelected'].categories,
        },
        colors: ['#1a7358', '#d3e8d3', '#d9d9d9', '#008000', '#F7F5F2'],
        yaxis: {
          title: {
            text: this.$store.getters['dashboard/data'].soldCommodityByProvince.yLabel,
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} kg`,
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
        theme: {
          mode: 'light', 
          palette: chartPallet(), 
        }
      }
    }
  }
}
</script>

<style scoped>
#year-dropdown{
  z-index: 20!important;
  display: flex;
  justify-content: center;
}
</style>
