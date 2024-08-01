<template>
  <v-col cols="12" lg="4">
    <div id="custom-card">
      <menu-dropdown-provinces @emitChangeProvince="changeProvince" />
      <chart-title :title="title" />
      <v-spacer />
      <v-row justify="center" class="ma-0 pa-0">
        <v-col cols="12" class="ma-0 pa-0">
          <apexchart
            :options="options"
            :series="series"
            style="
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            "
          />
        </v-col>
      </v-row>
      <v-spacer />
      <chart-recommendation :text="recommendation" />
    </div>
  </v-col>
</template>
../../menuDropdownProvinces.vue
<script>
import VueApexCharts from 'vue-apexcharts'
import { chartPallet, titleStyle } from '~/chart_config/chart'
import menuDropdownProvinces from '../../menuDropdownProvinces.vue'
import chartTitle from '../chartTitle.vue'
import chartRecommendation from '../chartRecommendation.vue'
export default {
  components: {
    apexchart: VueApexCharts,
    menuDropdownProvinces,
    chartTitle,
    chartRecommendation
  },
  methods: {
    changeProvince(province) {
      const obj = {
        province,
        stateName: 'marketingOutletFarmerCount',
        stateNameSelected: 'marketingOutletFarmerCountSelected',
      }
      this.$store.commit('dashboard/changeProvince', obj)
    },
  },
  computed: {
    recommendation(){
      return this.$store.getters['dashboard/marketingOutletFarmerCountSelected']
        .recommendation
    },
    series() {
      return this.$store.getters['dashboard/marketingOutletFarmerCountSelected']
        .series
    },
    title(){
      if(this.$store.getters['dashboard/data'].marketingOutletFarmerCount.title){
        return this.$store.getters['dashboard/data'].marketingOutletFarmerCount
                .title +
              ' - ' +
              this.$store.getters['dashboard/marketingOutletFarmerCountSelected']
                .province        
      }else{
        return ''
      }
    },
    options() {
      return {
        chart: {
          type: 'donut',
        },
        colors: chartPallet(),
        labels:  this.$store.getters['dashboard/marketingOutletFarmerCountSelected']
              .categories,
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 2,
        },
        legend: {
          show: false,
          position: 'bottom',
        },
        dataLabels: {
          enabled: false,
          offsetX: 15,
          offsetY: 20,
          style: {
            colors: ['black'],
            fontWeight: 'bold',
            fontSize: '13px',
          },
          dropShadow: {
            enabled: false,
          },
        },
        tooltip: {
          enabled: true,
        },
        subtitle: {
          text: 'a',
          style: {
            color: '#ffffff',
          },
        },
        responsive: [
          {
            breakpoint: 320,
            options: {
              chart: {
                width: '140%',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 450,
            options: {
              chart: {
                width: '110%',
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
                width: '90%',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
          {
            breakpoint: 1904,
            options: {
              chart: {
                width: '110%',
              },
              legend: {
                position: 'bottom',
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
@import url('~/assets/css/analytics.css');
</style>
