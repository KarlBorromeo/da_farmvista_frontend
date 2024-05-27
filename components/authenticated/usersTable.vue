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
export default {
  emits: ['switchCommodity'],
  components: { snackbar },
  data() {
    return {
      search: '',
      items: [
        {
          fullname: 'Karl Borromeo',
          gender: 'Male',
          type: 'Admin',
          email: 'aw@gmail.com',
          mobileNumber: '09123456789',
          company: 'CSU',
          companyPosition: 'Dev'
        },
        {
          fullname: 'Karl Borromeo',
          gender: 'Male',
          type: 'Admin',
          email: 'aw@gmail.com',
          mobileNumber: '09123456789',
          company: 'CSU',
          companyPosition: 'Dev'
        }
      ],
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
        { text: 'Fullname', align: 'start', value: 'fullname' },
        { text: `Gender`, value: 'gender' },
        { text: `Type`, value: 'type' },
        { text: `Email`, value: 'email' },
        { text: 'Mobile Number', value: 'mobileNumber' },
        { text: 'Company', value: 'company' },
        { text: 'Company Position', value: 'companyPosition' },
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
  },
}
</script>
