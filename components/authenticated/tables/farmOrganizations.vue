<template>
  <v-col cols="12" lg="8" class="mt-5">
    <v-data-table
      style="min-height: 600px; max-height: 600px; overflow: auto"
      class="pa-2 pt-1 pb-3 elevation-2 rounded-lg"
      :headers="headers"
      :items="items"
      item-key="id"
      :search="search"
      :custom-filter="transformedSearchText"
      :items-per-page="itemPerPage"
      :loading="loading"
      loading-text="Loading... Please wait"
      :hide-default-footer="false"
    >
      <template v-slot:top>
        <menu-dropdown-provinces
          class="mt-2"
          @emitChangeProvince="changeProvince"
        />
        <chart-title :title="title" />
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
import chartTitle from '../charts/chartTitle.vue'
export default {
  components: {
    menuDropdownProvinces,
    chartTitle
  },
  data() {
    return {
      dialog: false,
      search: '',
      itemPerPage: 10, // number of rows per page
      loading: false, // toggle the loading of the table
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Name', value: 'name' },
        { text: 'Status', value: 'status' },
        { text: 'Type', value: 'type' },
        { text: `Active Farmers`, value: 'activeFarmerCount' },
        { text: `Inactive Farmers`, value: 'inactiveFarmerCount' },
        { text: `Total Farmers`, value: 'allFarmerCount' },
      ]
    },
    items() {
      return this.$store.getters[
        'dashboard/farmOrganizationFarmerCountSelected'
      ].data
    },
    title() {
      return 'Farm Organizations - ' + this.$store.getters[
        'dashboard/farmOrganizationFarmerCountSelected'
      ].province
    },
  },
  methods: {
    transformedSearchText(value, search, item) {
      search = search.toString().toLowerCase()
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLowerCase().indexOf(search) !== -1
      )
    },
    changeProvince(province) {
      const obj = {
        province,
        stateName: 'farmOrganizationFarmerCount',
        stateNameSelected: 'farmOrganizationFarmerCountSelected',
        isTable: true,
      }
      this.$store.commit('dashboard/changeProvince', obj)
    },
  },
}
</script>
