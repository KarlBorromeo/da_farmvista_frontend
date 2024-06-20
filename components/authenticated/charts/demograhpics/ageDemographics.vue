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
import { chartPallet } from '~/chart_config/chart'
import VueApexCharts from 'vue-apexcharts'
export default {
  data(){
    return{
      height: 300
    }
  },
	components: {
		apexchart: VueApexCharts,
	},
   async mounted(){
    await new Promise(resolve => setTimeout(resolve, 100));
    this.height= 300
  },
	computed: {
		series() {
			return this.$store.getters['analytics/demographics']
						.ageDistribution.series
		},
		options() {
			return {
				title: {
					text: this.$store.getters['analytics/demographics']
						.ageDistribution.title,
					align: 'center',
				},
				chart: {
					type: 'bar',
					height: this.height,
					toolbar: {
						show: false,
					},
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '65%',
            barHeight: '70%',
						endingShape: 'rounded',
					},
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
						this.$store.getters['analytics/demographics']
							.ageDistribution.categories,
				},
				colors: chartPallet(),
				fill: {
					opacity: 1,
				},
				tooltip: {
					y: {
						formatter: (val) => `${val} counts`,
					},
				},
				noData: {
					text: 'No Data Available!',
					align: 'center',
					verticalAlign: 'middle',
				},
			}
		},
		recommendation() {
			return this.$store.getters['analytics/demographics'].ageDistribution
				.recommendation
		},
	},
}
</script>

<style scoped>
@import url('~/assets/css/analytics.css');
</style>
