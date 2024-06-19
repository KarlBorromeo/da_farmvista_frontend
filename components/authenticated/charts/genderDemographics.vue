<template>
	<v-col cols="10" lg="4" class="mt-2">
    <apexchart
      :options="options"
      :series="series"
      style="height: 80%!important;border: 1px solid black"
    />          
     <v-card style="height: 20%!important; overflow: auto" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius porro sit, at excepturi esse hic nulla ex eaque perferendis cupiditate!</v-card>
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
				// responsive: [
				// 	{
				// 		breakpoint: 650,
				// 		options: {
				// 			chart: {
				// 				width: '100%',
				// 			},
				// 			legend: {
				// 				position: 'bottom',
				// 			},
				// 		},
				// 	},
				// 	{
				// 		breakpoint: 960,
				// 		options: {
				// 			chart: {
				// 				width: '80%',
				// 			},
				// 			legend: {
				// 				position: 'bottom',
				// 			},
				// 		},
				// 	},
				// 	{
				// 		breakpoint: 1264,
				// 		options: {
				// 			chart: {
				// 				width: '70%',
				// 			},
				// 			legend: {
				// 				position: 'right',
				// 			},
				// 		},
				// 	},
				// ],
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
