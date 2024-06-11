<template>
	<v-col cols="12" lg="4" class="mt-2">
		<v-card class="pa-3 rounded-lg" style="height: 100%; display:flex; flex-direction: column">
      <v-row justify="end">
        <v-col cols="1" id="year-dropdown">
          <v-menu offset-y left>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
            </template>
            <v-list>
              <v-list-item
                v-for="(year, index) in years"
                :key="index"
                color="white"
                @click="changeYear(year)"
              >
              {{year}}
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row style="height: 100%" align-content="center">
        <v-col cols="12">
          <apexchart
            :options="options"
            :series="series"
            style="height: 100%;"
          />          
        </v-col>
      </v-row>
		</v-card>  
	</v-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { chartPallet } from '~/chart_config/chart';
export default {
	components: {
		apexchart: VueApexCharts,
	},
  methods:{
    changeYear(year){
      this.$store.commit('dashboard/changeTimelineFrequencySelected',year);
    }
  },
	computed: {
		years() {
			return this.$store.getters['dashboard/data'].timelineFrequencyOfHarvestPerYear.years
		},
		series() {
			return this.$store.getters['dashboard/timelineFrequencySelected'].series
		},
		options() {
			return {
				chart: {
					type: 'area',
					toolbar: {
            show: false,
						tools: {
							download: false,
              selection: false,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: false 
						},
					},
				},
        title:{
          text: this.$store.getters['dashboard/data'].timelineFrequencyOfHarvestPerYear.title + ' - '+ this.$store.getters['dashboard/timelineFrequencySelected'].year,
          align: 'center'
        },
        yaxis: {
          title: {
            text: this.$store.getters['dashboard/data'].timelineFrequencyOfHarvestPerYear.yLabel,
          },
        },
				dataLabels: {
					enabled: true,
          offsetY: -5, 
          style: {
            colors: ['#000']
          },
          formatter: function(value) {
            return value === 0 ? '' : value;
          }
				},
				stroke: {
					curve: 'smooth',
				},
				xaxis: {
					categories: this.$store.getters['dashboard/data'].timelineFrequencyOfHarvestPerYear.categories,
				},
        colors: chartPallet(),
			}
		},
	},
}
</script>

<style scoped>
#year-dropdown{
  z-index: 20!important;
  display: flex;
  justify-content: center;
}
</style>
