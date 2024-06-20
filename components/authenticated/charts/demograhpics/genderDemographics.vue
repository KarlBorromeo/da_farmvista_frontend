<template>
	<v-col
		cols="10"
		lg="4"
		class="mt-2"
		style="display: flex; flex-direction: column; justify-content: center"
	>
		<div id="custom-card">
			<apexchart :options="options" :series="series" />
			<v-spacer />
			<p>{{ recommendation }}</p>
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
			return this.$store.getters['analytics/demographics']
				.genderDistribution.series
		},
		options() {
			return {
				title: {
					text: this.$store.getters['analytics/demographics']
						.genderDistribution.title,
					align: 'center',
				},
				chart: {
					type: 'pie',
				},
				colors: chartPallet(),
				labels: this.$store.getters['analytics/demographics']
					.genderDistribution.categories,
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
		recommendation() {
			return this.$store.getters['analytics/demographics']
				.genderDistribution.recommendation
		},
	},
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
