

<template>
  <div class="mt-5">
    <v-data-table
      class="pt-1 pb-3 elevation-2"
      :headers="headers"
      :items="items"
      item-key="name"
      :search="search"
      :custom-filter="transformedSearchText"
      :items-per-page="itemPerPage"
      :loading="loading"
      loading-text="Loading... Please wait"
      hide-default-footer
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search here the record"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <v-container class="text-center">
          <v-icon v-if="item.status" color="success">mdi-check-circle</v-icon>
          <v-icon v-else color="red">mdi-alert</v-icon>
        </v-container>
      </template>
    </v-data-table>
    <v-divider />
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        :circle="true"
      ></v-pagination>
    </div>
    <v-dialog v-if="dialog" v-model="dialog" width="700">
      <questionnaire-vue :id="id" :commodityProp="commodity" />
    </v-dialog>
    <snackbar ref="snackbar" />
  </div>

</template>

<script>
import snackbar from '../snackbar.vue'
export default {
  emits: ['switchCommodity'],
  components: { snackbar,},
  data() {
    return {
      dialog: false,
      search: '',
      itemPerPage: 5, // number of rows per page
      loading: false, // toggle the loading of the table
      page: 1, // current page number
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Performer', value: 'performer' },
        { text: `Details`, value: 'details'},
        { text: `Date`, value: 'date'},
        { text: `Time`, value: 'time'},
        { text: 'Affected', value: 'affected'},
        { text: 'Status', value: 'status', sortable: false, align:'center'},
      ]
    },
    pageCount() {
      return this.$store.getters['logs/countPages']
    },
    items(){
      return this.$store.getters['logs/logs']
    }, 
  },
  methods: {
    /* 
      this function is responsible for the search of all values in the table data, 
      and displays the records matching the search value 
    */
    transformedSearchText(value, search, item) {
      search = search.toString().toLowerCase()
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLowerCase().indexOf(search) !== -1
      )
    },

    /* fetch the survey records */
    async fetchAllLogs() {
      try {
        this.loading = true
        await this.$store.dispatch('logs/fetchAllLogs', {
          page: this.page,
          limit: this.itemPerPage,
        })
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.loading = false
      },
    },

  /* before mounting the component first http request to fetch the records */
  async beforeMount() {
    await this.fetchAllLogs()
  },

  watch: {
    /* execute the fetching everytime navigating to other page numbers */
    async page(newVal, oldVal) {
      if (newVal !== oldVal) {
        await this.fetchAllLogs()
      }
    },
  },
}
</script>
