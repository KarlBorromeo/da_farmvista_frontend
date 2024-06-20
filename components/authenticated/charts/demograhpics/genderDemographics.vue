<template>
	<v-col cols="10" lg="4" class="mt-2" style="display:flex; flex-direction: column; justify-content:center">
		<div id="custom-card">
			<apexchart
			:options="options"
			:series="series"
			/>          
			<v-spacer />
			<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro sit, at excepturi esse hic nulla ex eaque perferendis cupiditate!
			</p>
		</div>
	</v-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { chartPallet } from '~/chart_config/chart'
export default {
	components: {
		apexchart: VueApexCharts,
	},
	computed: {
		series() {
			return [44, 55, 13, 43, 22]
		},
		options() {
			return {
				title: {
					text: 'Gender',
					align: 'center',
				},
				chart: {
					type: 'pie',
				},
				colors: chartPallet(),
				labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
