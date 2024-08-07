<template>
  <v-col cols="12" lg="6">
    <v-card
      class="pa-3 rounded-lg"
      style="height: 100%"
    >
      <menu-dropdown-provinces @emitChangeProvince="changeProvince" />
      <chart-title :title="title" />
      <apexchart :options="options" :series="series" />
      <chart-recommendation :text="recommendation"/>
    </v-card>
    
  </v-col>
</template>
<script>
import { chartPallet, titleStyle } from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts'
import MenuDropdownProvinces from '../../menuDropdownProvinces.vue'
import chartTitle from '../chartTitle.vue'
import chartRecommendation from '../chartRecommendation.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    MenuDropdownProvinces,
    chartTitle,
    chartRecommendation
  },
  methods: {
    changeProvince(province) {
      const obj = {
        province,
        stateName: 'profileStatusCountByProvince',
        stateNameSelected: 'profileStatusCountByProvinceSelected',
      }
      this.$store.commit('dashboard/changeProvince', obj)
    },
  },
  computed: {
    title(){
      return this.$store.getters['dashboard/data'].profileStatusCountByProvince
              .title +
            ' - ' +
            this.$store.getters['dashboard/profileStatusCountByProvinceSelected']
              .province
    },
    recommendation(){
      return this.$store.getters[
        'dashboard/profileStatusCountByProvinceSelected'
      ].recommendation 
    },
    series() {
      return this.$store.getters[
        'dashboard/profileStatusCountByProvinceSelected'
      ].series
    },
    options() {
      return {
        chart: {
          type: 'bar',
          toolbar: {
            show: false,
          },
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
          show: true,
        },
        xaxis: {
          categories:
            this.$store.getters['dashboard/profileStatusCountByProvinceSelected']
              .categories,
        },
        colors: chartPallet(),
        yaxis: {
          title: {
            text: this.$store.getters['dashboard/data']
              .profileStatusCountByProvince.yLabel,
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
        responsive: [
          {
            breakpoint: 960,
            options: {
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
            },
          },
        ],
        noData: {
          text: 'No Data Available!',
          align: 'center',
          verticalAlign: 'middle',
        },
      }
    },
  },
}
</script>
