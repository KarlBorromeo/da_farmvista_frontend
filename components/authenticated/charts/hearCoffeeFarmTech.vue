<template>
  <v-col cols="12" lg="4" class="mt-2">
    <v-card class="pa-3 text-center rounded-lg" style="height: 100%">
      <menu-dropdown-provinces @emitChangeProvince="changeProvince" />
      <v-row justify="center">
        <v-col cols="12">
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
    </v-card>
  </v-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { chartPallet } from '~/chart_config/chart'
import MenuDropdownProvinces from '../menuDropdownProvinces.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    MenuDropdownProvinces,
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
    series() {
      return [
        this.$store.getters['dashboard/haveHeardFarmTechFarmerCountSelected']
          .percentage,
      ]
    },
    options() {
      return {
        title: {
          text:
            this.$store.getters['dashboard/data'].haveHeardFarmTechFarmerCount
              .title +
            ' - ' +
            this.$store.getters[
              'dashboard/haveHeardFarmTechFarmerCountSelected'
            ].province,
          align: 'center',
          floating: true,
        },
        chart: {
          type: 'radialBar',
          // width: '120%',
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
                width: '100%',
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
                width: '70%',
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
