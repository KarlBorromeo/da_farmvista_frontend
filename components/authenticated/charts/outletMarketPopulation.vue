<template>
	<v-col cols="12" lg="4" class="mt-2">
		<v-card
			class="pa-3 text-center rounded-lg"
            style="height: 100%"
		>
      <menu-dropdown-provinces />
      <v-row justify="center">
        <v-col cols="9" lg="12">
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
					width: '100%'
				},
				colors: chartPallet(),
                labels: ['Apple', 'Mango', 'Orange', 'Watermelon','Mango', 'Orange', 'Watermelon'],
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
								position: 'right',
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
