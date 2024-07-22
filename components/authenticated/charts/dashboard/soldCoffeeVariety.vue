<template>
  <v-col cols="12" class="mt-2">
    <v-card class="pa-3 rounded-lg">
      <menu-dropdown-provinces @emitChangeProvince="changeprovince" />
      <chart-title :title="title"/>
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" class="ma-0 pa-0">
          <apexchart :options="options" :series="series" />
        </v-col>
      </v-row>
      <chart-recommendation :text="recommendation" />
    </v-card>
  </v-col>
</template>

<script>
import { chartPallet, titleStyle } from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts'
import menuDropdownProvinces from '../../menuDropdownProvinces.vue'
import chartTitle from './chartTitle.vue'
import chartRecommendation from './chartRecommendation.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    menuDropdownProvinces,
    chartTitle,
    chartRecommendation
  },
  methods: {
    changeprovince(province) {
      const obj = {
        province,
        stateName: 'soldCoffeeVarietyByProvince',
        stateNameSelected: 'soldCoffeeVarietyByProvinceSelected',
      }
      this.$store.commit('dashboard/changeProvince', obj)
    },
  },
  data() {
    return {
      height: 300,
    }
  },
  async mounted() {
    await new Promise((resolve) => setTimeout(resolve, 100))
    this.height = 500
  },
  computed: {
    title(){
      return this.$store.getters['dashboard/data'].soldCoffeeVarietyByProvince
              .title +
            ' - ' +
            this.$store.getters['dashboard/soldCoffeeVarietyByProvinceSelected']
              .province
    },
    recommendation(){
      return this.$store.getters['dashboard/soldCoffeeVarietyByProvinceSelected']
        .recommendation
    },
    provinces() {
      return this.$store.getters['dashboard/data'].soldCoffeeVarietyByProvince
        .provinces
    },
    series() {
      return this.$store.getters['dashboard/soldCoffeeVarietyByProvinceSelected']
        .series
    },
    options() {
      return {
        chart: {
          height: this.height,
          stacked: true,
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
            this.$store.getters['dashboard/soldCoffeeVarietyByProvinceSelected']
              .categories,
        },
        colors: chartPallet(),
        yaxis: {
          title: {
            text: this.$store.getters['dashboard/data'].soldCoffeeVarietyByProvince
              .yLabel,
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
        responsive: [
          {
            breakpoint: 1264,
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

<style scoped>
#year-dropdown {
  z-index: 20 !important;
  display: flex;
  justify-content: center;
}
</style>
