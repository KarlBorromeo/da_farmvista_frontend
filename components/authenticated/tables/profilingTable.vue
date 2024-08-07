<template>
  <div class="mt-5">
    <v-data-table
      class="pt-1 pb-3 elevation-2 text-capitalize"
      :headers="headers"
      :items="items"
      item-key="name"
      :items-per-page="itemPerPage"
      :loading="loading"
      loading-text="Loading... Please wait"
      :hide-default-footer="true"
    >
      <template v-slot:top>
        <div style="display: flex; justify-content: end">
          <commodity-dropdown @switchCommodity="switchCommodity" class="mt-0" />
        </div>
        <v-text-field
          v-model="search"
          label="Search here the record"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.validated`]="{ item }">
        <p
          class="text-center"
          :class="item.status === 'active' ? 'black--text' : 'red--text'"
        >
          {{ item.status }}
        </p>
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
    <v-dialog v-if="isEditing" v-model="dialog" width="2000">
      <questionnaire-vue :id="id" :commodityProp="commodity" />
    </v-dialog>
    <snackbar ref="snackbarUpdate" />
  </div>
</template>

<script>
import snackbar from '../../snackbar.vue'
import CommodityDropdown from '../commodityDropdown.vue'
import questionnaireVue from '../modal/questionnaire.vue'
export default {
  emits: ['switchCommodity'],
  components: { snackbar, CommodityDropdown, questionnaireVue },
  data() {
    return {
      dialog: false,
      search: '',
      // items: [],
      itemPerPage: 10, // number of rows per page
      loading: true, // toggle the loading of the table
      page: 1, // current page number
      commodity: 'coffee',
      id: '', // this is used for specific fetch record
    }
  },
  computed: {
    /* basis to re-render the modal if isEditing is toggles */
    isEditing(){
      return this.$store.getters['profiling/isEditingMode']
    },
    /* basis to close the modal */
    doneSubmitFormStatus(){
      return this.$store.getters['questionnaire/doneSubmit']
    },
    headers() {
      return [
        // { text: 'ID.', align: 'start', value: 'id' },
        { text: 'Survey No.', align: 'start', value: 'surveyNo' },
        // { text: `Date Interview (YYYY/MM/DD)`, value: 'dateInterview' },
        { text: `Farmer's Name`, value: 'farmerName' },
        { text: `Farmer's Code`, value: 'farmerCode' },
        { text: 'Region/Province', value: 'regionProvince' },
        { text: 'City/Municipality', value: 'cityMunicipality' },
        { text: 'Barangay', value: 'barangay' },
        { text: 'Organization/Institution', value: 'nameOrganization' },
        { text: 'Status', value: 'validated', align: 'center' },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    },
    pages() {
      return this.$store.getters['profiling/countPages']
    },
    items(){
      return this.$store.getters['profiling/items']
    }
  },
  methods: {
    /* when edit button is clicked, open the modal for the whole record of this specific id, and enable editing mode and disabling create mode*/
    editItem(id) {
      this.$store.commit('profiling/toggleEditingMode', true)
      this.$store.commit('questionnaire/toggleIsInterviewed', false)
      this.$store.commit('questionnaire/toggleDoneSubmit', false)
      this.dialog = true
      this.id = id
    },

    /* when delete button is clicked, delete the specific record using its id */
    async deleteItem(id) {
      const confirmed = confirm('Are you sure to delete this record?')
      if (confirmed) {
        try {
          const res = await this.$store.dispatch('profiling/deleteSurvey', id)
          this.$refs.snackbarUpdate.showBar(res, 'success')
        } catch (error) {
          this.$refs.snackbarUpdate.showBar(error, 'red')
        }
      }
    },

    /* fetch the survey records */
    async fetchAllSurvey() {
      try {
        this.loading = true
        // this.items = []
        await this.$store.dispatch('profiling/fetchAllSurvey', {
          search: this.search.toLowerCase(),
          page: this.page,
          limit: this.itemPerPage,
        })
        // this.items = this.$store.getters['profiling/items']
      } catch (error) {
        this.$refs.snackbarUpdate.showBar(error, 'red')
      }
      this.loading = false
    },

    /* this method will be triggered when switching the commodity, via emits */
    async switchCommodity(commodity) {
      this.$store.commit('profiling/changeCommodityType',commodity)
      await this.fetchAllSurvey()
    },
  },

  /* before mounting the component first http request to fetch the records */
  async beforeMount() {
    this.loading = true;
    await this.fetchAllSurvey()
  },

  watch: {
    doneSubmitFormStatus: {
      handler: async function (val) {
        const isEditing = this.$store.getters['profiling/isEditingMode']
        if(val && isEditing){
          this.dialog = false
          this.$refs.snackbarUpdate.showBar('Succesfully updated', 'success')

          /* fetch all profiling surveys after closing the dialog */
          await this.$store.dispatch('profiling/fetchAllSurvey', {
            page: 1,
            limit: 10,
          })

          this.page = 1

        }
      }
    },
    /* execute the fetching everytime navigating to other page numbers */
    async page(newVal, oldVal) {
      if (newVal !== oldVal) {
        await this.fetchAllSurvey()
      }
    },
    /* delete the selected id, if the modal is closed */
    dialog(val) {
      if (!val) {
        this.id = ''
        this.$store.commit('questionnaire/resetTabsValidity')
      }
    },
    async search() {
      await new Promise((resolve) => setTimeout(resolve, 500))
      this.page = 1
      await this.fetchAllSurvey() // fetch the all list with filter search value
    },
  },
}
</script>
