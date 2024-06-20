<template>
	<v-col
		cols="10"
		lg="6"
		class="mt-2"
		style="display: flex; flex-direction: column; justify-content: center"
	>
		<div id="custom-card">
			<v-row justify="center">
				<v-col
					cols="10"
					style="
						display: flex !important;
						flex-direction: column !important;
					"
				>
					<apexchart :options="options" :series="series" />
					<v-spacer />
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Eius porro sit, at excepturi esse hic nulla ex eaque
						perferendis cupiditate!
					</p>
				</v-col>
			</v-row>
		</div>
	</v-col>
</template>
<script>
import { chartPallet } from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts'
export default {
	components: {
		apexchart: VueApexCharts,
	},
	computed: {
		series() {
			return [44, 55, 41, 17, 15]
		},
		options() {
			return {
				chart: {
					width: 380,
					type: 'donut',
				},
				plotOptions: {
					pie: {
						startAngle: -90,
						endAngle: 270,
					},
				},
				dataLabels: {
					enabled: false,
				},
				fill: {
					type: 'gradient',
				},
				legend: {
					formatter: function (val, opts) {
						return (
							val +
							' - ' +
							opts.w.globals.series[opts.seriesIndex]
						)
					},
				},
				title: {
					text: 'Cropping System Count',
					align: 'center',
				},
				colors: chartPallet(),
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 200,
							},
							legend: {
								position: 'bottom',
							},
						},
					},
				],
			}
		},
	},
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
