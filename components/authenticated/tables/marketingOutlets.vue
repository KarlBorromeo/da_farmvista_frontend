<template>
  <v-col cols="12" lg="4" class="mt-5">
    <v-data-table
      style="min-height:600px; max-height:600px; overflow:auto"
      class="pa-2 pt-1 pb-3 elevation-2 rounded-lg"
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
        <v-container>
          <menu-dropdown-provinces @emitChangeProvince="changeProvince"/>
        </v-container>
        
        <h2 class="title text-center mt-1">Marketing Outlets - {{ province }}</h2>
        <v-text-field
          v-model="search"
          label="Search here the record"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
  </v-col>

</template>

<script>
import menuDropdownProvinces from '~/components/authenticated/menuDropdownProvinces.vue'
export default {
  components: {
    menuDropdownProvinces
  },
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
        { text: 'Commonly Produced', value: 'commonlyProduced' },
        { text: 'Price Range', value: 'priceRange' }
      ]
    },
    province(){
      return this.$store.getters['dashboard/marketingOutletInfoSelected'].province
    },
    items(){
      return this.$store.getters['dashboard/marketingOutletInfoSelected'].data
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
    changeProvince(province){
      const obj = {
        province,
        stateName: 'marketingOutletInfo',
        stateNameSelected: 'marketingOutletInfoSelected',
        isTable: true
      }
      this.$store.commit('dashboard/changeProvince',obj)
    }
  },
}
</script>
