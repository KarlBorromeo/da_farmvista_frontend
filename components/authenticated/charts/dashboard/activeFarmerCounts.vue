<template>
	<v-col cols="12" lg="6">
		<v-card class="pa-3 text-center rounded-lg" style="height: 100%">
			<menu-dropdown-provinces @emitChangeProvince="changeProvince" />
      <chart-title :title="title" />
			<v-row justify="center" class="ma-0 pa-0">
				<v-col cols="12" sm="10" class="ma-0 pa-0">
					<apexchart
						:options="options"
						:series="series"
						style="
							height: 100%;
							display: flex;
							justify-content: center;
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
import { chartPallet, titleStyle } from '~/chart_config/chart'
import menuDropdownProvinces from '../../menuDropdownProvinces.vue'
import chartRecommendation from '../chartRecommendation.vue'
import chartTitle from '../chartTitle.vue'
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
				stateName: 'activeFarmerCountByProvince',
				stateNameSelected: 'activeFarmerCountByProvinceSelected',
			}
			this.$store.commit('dashboard/changeProvince', obj)
		},
	},
	computed: {
    title(){
      return this.$store.getters['dashboard/data']
							.activeFarmerCountByProvince.title +
						' - ' +
						this.$store.getters[
							'dashboard/activeFarmerCountByProvinceSelected'
						].count
    },
		recommendation() {
			return this.$store.getters[
				'dashboard/activeFarmerCountByProvinceSelected'
			].recommendation
		},
		series() {
			return this.$store.getters[
				'dashboard/activeFarmerCountByProvinceSelected'
			].series
		},
		options() {
			return {
				chart: {
					type: 'pie',
				},
				colors: chartPallet(),
				labels: this.$store.getters[
					'dashboard/activeFarmerCountByProvinceSelected'
				].categories,
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
