<template>
	<v-col cols="12" lg="4" class="mt-2">
		<v-card
			class="pa-3 text-center rounded-lg"
            style="height: 100%; overflow: auto"
		>
		<menu-dropdown-provinces @emitChangeProvince="changeProvince"/>
		<v-row justify="center">
			<v-col cols="12" >
			<apexchart
				:options="options"
				:series="series"
				style="height:100%; display: flex; justify-content: center; align-items:center"
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
    menuDropdownProvinces
	},
  methods: {
    changeProvince(province){
      const obj = {
        province,
        stateName: 'marketingOutletFarmerCount',
        stateNameSelected: 'marketingOutletFarmerCountSelected' 
      }
      this.$store.commit('dashboard/changeProvince',obj)
    }
  },
	computed: {
		series() {
			return this.$store.getters['dashboard/marketingOutletFarmerCountSelected'].series
		},
		options() {
			return {
				title: {
					text: this.$store.getters['dashboard/data'].marketingOutletFarmerCount.title + ' - ' + this.$store.getters['dashboard/marketingOutletFarmerCountSelected'].province,
					align: 'center',
				},
				chart: {
					type: 'donut',
				},
				colors: chartPallet(),
                labels: this.$store.getters['dashboard/marketingOutletFarmerCountSelected'].categories,
				stroke: {
					width: 2,
				},
				legend: {
					position: 'bottom',
				},
				dataLabels: {
					enabled: false,
					offsetX: 15,
  					offsetY: 20,
					style: {
						colors: ['black'],
						fontWeight: 'bold',
						fontSize: '13px'
					},
					dropShadow: {
						enabled: false,
					}
				},
				tooltip: {
					enabled: true
				},
                subtitle: {
					text: 'a',
                    style: {
                        // fontSize:  '17px',
                        color:  '#ffffff'
                    },
				},
				responsive: [
					{
						breakpoint: 320,
						options: {
							chart: {
								width: '200%',
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
								width: '160%',
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
								width: '150%',
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
        }
			}
		},
	},
}
</script>
