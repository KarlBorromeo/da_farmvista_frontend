<template>
  <v-col cols="12" lg="4">
    <v-card class="pa-3 rounded-lg" style="height: 100%">
      <menu-dropdown-provinces @emitChangeProvince="changeProvince" />
      <chart-title :title="title" />
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" class="ma-0 pa-0">
          <apexchart
            :options="options"
            :series="series"
            style="
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: start;
            "
          />
        </v-col>
      </v-row>
      <chart-recommendation :text="recommendation" />
    </v-card>
  </v-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
// import { chartPallet } from '~/chart_config/chart'
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
        stateName: 'haveHeardFarmTechFarmerCount',
        stateNameSelected: 'haveHeardFarmTechFarmerCountSelected',
      }
      this.$store.commit('dashboard/changeProvince', obj)
    },
  },
  computed: {
    title(){
      return this.$store.getters['dashboard/data'].haveHeardFarmTechFarmerCount
              .title +
            ' - ' +
            this.$store.getters[
              'dashboard/haveHeardFarmTechFarmerCountSelected'
            ].province
    },
    recommendation(){
        return this.$store.getters['dashboard/haveHeardFarmTechFarmerCountSelected']
          .recommendation
    },
    series() {
      return [
        this.$store.getters['dashboard/haveHeardFarmTechFarmerCountSelected']
          .percentage,
      ]
    },
    options() {
      return {
        chart: {
          type: 'radialBar',
        },
        colors: ['#f55525'],
        plotOptions: {
          radialBar: {
            hollow: {
              size: '50%',
            },
          },
        },
        labels: ['Yes'],
        stroke: {
          width: 2,
        },
        legend: {
          position: 'bottom',
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['black'],
            fontWeight: 'normal',
          },
        },
        tooltip: {
          enabled: true,
        },
        responsive: [
          {
            breakpoint: 405,
            options: {
              chart: {
                width: '100%',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 650,
            options: {
              chart: {
                width: '120%',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 1264,
            options: {
              chart: {
                width: '110%',
              },
              legend: {
                position: 'right',
              },
            },
          },
        ],
      }
    },
  },
}
</script>
