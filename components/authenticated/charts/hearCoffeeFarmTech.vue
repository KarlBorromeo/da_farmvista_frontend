<template>
	<v-col cols="12" lg="4" class="mt-2">
		<v-card
			class="pa-3 text-center"
			style="height: 100%"
		>
			<apexchart
				:options="options"
				:series="series"
				style="height:100%; display: flex; justify-content: center; align-items:center"
			/>
		</v-card>
	</v-col>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
export default {
	components: {
		apexchart: VueApexCharts,
	},
	data() {
		return {
			pallete: '',
		}
	},
	computed: {
		series() {
			return [this.$store.getters['dashboard/data'].haveHeardFarmTechFarmerCount]
		},
		options() {
			return {
				title: {
					text: 'Have heard coffe farm tech',
					align: 'center',
				},
				chart: {
					type: 'radialBar',
					width: '100%',
				},
				colors: ['#1a7358', '#d3e8d3', '#d9d9d9', '#008000', '#F7F5F2'],
				labels: ['Yes'],
				stroke: {
					width: 5,
				},
				legend: {
					position: 'bottom',
				},
				dataLabels: {
					enabled: true,
					style: {
						colors: ['black'],
						fontWeight: 'normal',
					},
				},
				tooltip: {
					enabled: true
				},
				subtitle: {
      				text: 'Percentage of yes',
					align: 'center'
				},
				responsive: [
					{
						breakpoint: 405,
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

<style scoped>
/* Add any custom styles for your chart here */
</style>
