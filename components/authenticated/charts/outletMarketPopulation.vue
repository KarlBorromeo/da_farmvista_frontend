<template>
	<v-col cols="12" lg="4" class="mt-2">
		<v-card
			class="pa-3 text-center rounded-lg"
            style="height: 100%"
		>
      <menu-dropdown-provinces />
      <v-row justify="center">
        <v-col cols="11">
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
	computed: {
		series() {
			return [44, 55, 13, 33,12,123,12]
		},
		options() {
			return {
				title: {
					text: 'Outlet Market Population',
					align: 'center',
				},
				chart: {
					type: 'donut',
					width: '150%',
				},
				colors: chartPallet(),
                labels: ['Apple', 'Mango', 'Orange', 'Watermelon','jaja','Mango', 'Orange', 'Watermelon','jaja'],
				stroke: {
					width: 2,
				},
				legend: {
					position: 'right',
				},
				dataLabels: {
					enabled: true,
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
                        fontSize:  '15px',
                        color:  '#ffffff'
                    },
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
