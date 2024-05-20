<template>
	<div class="mt-5">
		<v-data-table
			class="pt-1 pb-3 elevation-3 text-capitalize"
			:headers="headers"
			:items="items"
			item-key="name"
			:search="search"
			:custom-filter="transofromedSearchText"
			:items-per-page="itemPerPage"
			:loading="loading"
			loading-text="Loading... Please wait"
			hide-default-footer
		>
			<template v-slot:top>
				<div
					style="
						display: flex;
						justify-content: end;
					"
				>
					<commodity-dropdown
						@switchCommodity="switchCommodity"
						class="mt-4"
					/>
				</div>

				<v-text-field
					v-model="search"
					label="Search here the record"
					class="mx-4"
				></v-text-field>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon small class="mr-2" @click="editItem(item.id)">
					mdi-pencil
				</v-icon>
				<v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
			</template>
		</v-data-table>
		<v-divider />
		<div class="text-center pt-2">
			<v-pagination
				v-model="page"
				:length="pages"
				:circle="true"
			></v-pagination>
		</div>
		<snackbar ref="snackbar" />
	</div>
</template>

<script>
import snackbar from '../snackbar.vue'
import CommodityDropdown from './commodityDropdown.vue'
export default {
	emits: ['switchCommodity'],
	components: { snackbar, CommodityDropdown },
	data() {
		return {
			search: '',
			items: [],
			itemPerPage: 20, // number of rows per page
			loading: false, // toggle the loading of the table
			page: 1, // current page number
			pageCount: 0, // number of how many pages
      commodity: 'coffee',
		}
	},
	computed: {
		headers() {
			return [
				{text: 'Survey No.',align: 'start',value: 'surveyNo',},
				{ text: `Date Interview (YYYY/MM/DD)`, value: 'dateInterview' },
				{ text: `Farmer's Name`, value: 'farmerName' },
				{ text: `Farmer's Code`, value: 'farmerCode' },
				{ text: 'Region/Province', value: 'regionProvince' },
				{ text: 'City/Municipality', value: 'cityMunicipality' },
				{ text: 'Barangay', value: 'barangay' },
				{ text: 'Organization/Institution', value: 'nameOrganization' },
				{ text: 'Actions', value: 'actions', sortable: false },
			]
		},
		pages() {
			return this.$store.getters['profiling/countPages']
		},
	},
	methods: {
		/* 
      this function is responsible for the search of all values in the table data, 
      and displays the records matching the search value 
    */
		transofromedSearchText(value, search, item) {
			search = search.toString().toLowerCase()
			return (
				value != null &&
				search != null &&
				typeof value === 'string' &&
				value.toString().toLocaleLowerCase().indexOf(search) !== -1
			)
		},

		/* when edit button is clicked, open the modal for the whole record of this specific id*/
		editItem(id) {
			alert('edit: ' + id)
		},

		/* when delete button is clicked, delete the specific record using its id */
		deleteItem(id) {
			alert('delete: ' + id)
		},

		/* fetch the survey records */
		async fetchSurveyRecord() {
			console.log(this.page)
			try {
				this.loading = true
				this.items = []
				await this.$store.dispatch('profiling/fetchSurvey', {
					type: this.commodity,
					page: this.page,
					limit: this.itemPerPage,
				})
				this.items = this.$store.getters['profiling/items']
			} catch (error) {
				this.$refs.snackbar.showBar(error, 'red')
			}
			this.loading = false
		},

		/* this method will be triggered when switching the commodity, via emits */
		async switchCommodity(commodity) {
      this.commodity = commodity
      await this.fetchSurveyRecord();
		},
	},

	/* before mounting the component first http request to fetch the records */
	async beforeMount() {
		await this.fetchSurveyRecord()
	},

	watch: {
		/* execute the fetching everytime navigating to other page numbers */
		async page(newVal, oldVal) {
			if (newVal !== oldVal) {
				await this.fetchSurveyRecord()
			}
		},
	},
}
</script>