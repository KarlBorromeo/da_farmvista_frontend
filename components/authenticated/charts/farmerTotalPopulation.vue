<template>
	<v-col cols="12" lg="6" class="mt-2" style="height:100%!important">
		<v-card
			class="pa-3 text-center rounded-lg"
		>
      <menu-dropdown-provinces />
      <v-row justify="center">
        <v-col cols="12" sm="10">
          <apexchart
            :options="options"
            :series="series"
            style=" height: 100%; display: flex; justify-content: center"
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
	computed: {
		series() {
			return this.$store.getters['dashboard/data'].totalFarmerCountByProvince.series
		},
		options() {
			return {
				title: {
					text: this.$store.getters['dashboard/data'].totalFarmerCountByProvince.title +' ' + this.$store.getters['dashboard/data'].totalFarmerCountByProvince.total,
					align: 'center',
				},
				chart: {
					type: 'pie',
					width: '40%',
				},
				colors: chartPallet(),
				labels: this.$store.getters['dashboard/data'].totalFarmerCountByProvince.labels,
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
						fontSize: '14px'
					},
					dropShadow: {
						enabled: false,
					}
				},
				tooltip: {
					enabled: true
				},
				subtitle: {
          text: 'Total of validated and non', //TODO: add get store here
					align: 'center'
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
			}
		},
	},
}
</script>
