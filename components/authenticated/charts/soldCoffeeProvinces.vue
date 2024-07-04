<template>
  <v-col cols="12" class="mt-2">
    <v-card class="pa-3 rounded-lg">
      <menu-dropdown-provinces @emitChangeProvince="changeprovince" />
      <v-row justify="center">
        <v-col cols="12">
          <apexchart :options="options" :series="series" />
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import { chartPallet } from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts'
import MenuDropdownProvinces from '../menuDropdownProvinces.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    MenuDropdownProvinces,
  },
  methods: {
    changeprovince(province) {
      const obj = {
        province,
        stateName: 'soldCommodityByProvince',
        stateNameSelected: 'soldCommodityByProvinceSelected',
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
    provinces() {
      return this.$store.getters['dashboard/data'].soldCommodityByProvince
        .provinces
    },
    series() {
      return this.$store.getters['dashboard/soldCommodityByProvinceSelected']
        .series
    },
    options() {
      return {
        title: {
          text:
            this.$store.getters['dashboard/data'].soldCommodityByProvince
              .title +
            ' - ' +
            this.$store.getters['dashboard/soldCommodityByProvinceSelected']
              .province,
          align: 'center',
        },
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
            this.$store.getters['dashboard/soldCommodityByProvinceSelected']
              .categories,
        },
        colors: chartPallet(),
        yaxis: {
          title: {
            text: this.$store.getters['dashboard/data'].soldCommodityByProvince
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
