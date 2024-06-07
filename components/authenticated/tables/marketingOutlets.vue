<template>
  <v-col cols="12" lg="4" class="mt-5">
    <v-data-table
      style="min-height:600px; max-height:600px; overflow:auto"
      class="pt-1 pb-3 elevation-2"
      :headers="headers"
      :items="items"
      item-key="id"
      :search="search"
      :custom-filter="transformedSearchText"
      :items-per-page="itemPerPage"
      :loading="loading"
      loading-text="Loading... Please wait"
      :hide-default-footer='false'
    >
      <template v-slot:top>
        <h2 class="title text-center mt-3">Marketing Outlets</h2>
        <v-text-field
          v-model="search"
          label="Search here the record"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
    <v-divider />
  </v-col>

</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      search: '',
      itemPerPage: 10, // number of rows per page
      loading: false,  // toggle the loading of the table
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Quality Preference', value: 'qualityPreference' },
        { text: 'Count', value: 'count' }
      ]
    },
    items(){
      return this.$store.getters['dashboard/data'].marketingOutletFarmerCount
    }
  },
  methods: {
    transformedSearchText(value, search, item) {
      console.log('val:',value)
      search = search.toString().toLowerCase()
      return (
        value != null &&
        search != null &&
        value.toString().toLowerCase().indexOf(search) !== -1
      )
    },
  },
}
</script>
