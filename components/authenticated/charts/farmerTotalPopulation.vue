<template>
  <v-col cols="12" lg="6" class="mt-2" style="height: 100% !important">
    <v-card class="pa-3 text-center rounded-lg">
      <menu-dropdown-provinces @emitChangeProvince="changeProvince" />
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <apexchart
            :options="options"
            :series="series"
            style="height: 100%; display: flex; justify-content: center"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { chartPallet } from '~/chart_config/chart'
import menuDropdownProvinces from '../menuDropdownProvinces.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    menuDropdownProvinces,
  },
  methods: {
    changeProvince(province) {
      const obj = {
        province,
        stateName: 'totalFarmerCountByProvince',
        stateNameSelected: 'totalFarmerCountByProvinceSelected',
      }
      this.$store.commit('dashboard/changeProvince', obj)
    },
  },
  computed: {
    series() {
      // return []
      return this.$store.getters['dashboard/totalFarmerCountByProvinceSelected']
        .series
    },
    options() {
      return {
        title: {
          text:
            this.$store.getters['dashboard/data'].totalFarmerCountByProvince
              .title +
            ' - ' +
            this.$store.getters['dashboard/totalFarmerCountByProvinceSelected']
              .count,
          align: 'center',
        },
        chart: {
          type: 'pie',
        },
        colors: chartPallet(),
        labels:
          this.$store.getters['dashboard/totalFarmerCountByProvinceSelected']
            .categories,
        stroke: {
          width: 2,
        },
        legend: {
          position: 'bottom',
        },
        dataLabels: {
          enabled: true,
          offsetX: 15,
          offsetY: 20,
          style: {
            colors: ['black'],
            fontWeight: 'bold',
            fontSize: '14px',
          },
          dropShadow: {
            enabled: false,
          },
        },
        tooltip: {
          enabled: true,
        },
        subtitle: {
          text: this.$store.getters['dashboard/data'].totalFarmerCountByProvince
            .subtitle,
          align: 'center',
        },
        responsive: [
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
            breakpoint: 960,
            options: {
              chart: {
                width: '80%',
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
