<template>
  <div class="mt-5">
    <v-data-table
      class="pt-1 pb-3 elevation-2"
      :headers="headers"
      :items="items"
      item-key="name"
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
      <template v-slot:[`item.affectedData`]="{ item }">
        <div v-if="isAffectedDataNull(item.affectedData)">
          <ul
            v-if="item.affectedData.survey"
            class="my-0 py-0 caption text-capitalize"
          >
            <p class="my-0 py-0 font-weight-bold">Survey IDs modified</p>
            <li v-for="id in item.affectedData.survey.id" :key="id">
              {{ id }}
            </li>
          </ul>
          <section v-else>
            <p class="my-0 py-0 caption text-capitalize">
              <span class="font-weight-bold">Position:</span>
              {{ item.affectedData.user.type }}
            </p>
            <p class="my-0 py-0 caption text-capitalize">
              <span class="font-weight-bold">Fullname:</span>
              {{ item.affectedData.user.fullName }}
            </p>
          </section>
        </div>
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
    <snackbar ref="snackbar" />
  </div>
</template>

<script>
import snackbar from '../../snackbar.vue'
export default {
  emits: ['switchCommodity'],
  components: { snackbar },
  data() {
    return {
      dialog: false,
      search: '',
      itemPerPage: 50, // number of rows per page
      loading: false, // toggle the loading of the table
      page: 1, // current page number
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Performer', value: 'performerName' },
        { text: `Details`, value: 'details' },
        { text: `Date`, value: 'date' },
        { text: `Time`, value: 'time' },
        { text: 'Affected Data', value: 'affectedData', align: 'center' },
        { text: 'Status', value: 'status', sortable: false, align: 'center' },
      ]
    },
    pageCount() {
      return this.$store.getters['logs/countPages']
    },
    items() {
      return this.$store.getters['logs/logs']
    },
  },
  methods: {
    /* fetch the survey records */
    async fetchAllLogs() {
      try {
        this.loading = true
        await this.$store.dispatch('logs/fetchAllLogs', {
          page: this.page,
          limit: this.itemPerPage,
          search: this.search.toLowerCase(),
        })
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.loading = false
    },

    /* dynamic text format for affected data column */
    generateText(obj) {
      if (!obj) {
        return ''
      }
      const keys = Object.keys(obj)
      const affectedDataType = keys[0]
      if (affectedDataType) {
        if (affectedDataType === 'survey') {
          const ids = obj[affectedDataType].id
          let str = ''
          // concatinate all ids
          ids.forEach((element) => {
            str += element + ', '
          })
          // removes the last ', ' in the string
          if (str.endsWith(', ')) {
            str = str.slice(0, -2)
          }
          return str
        } else if (affectedDataType === 'user') {
          return `Position: ${obj[affectedDataType].type}, Fullname: ${obj[affectedDataType].fullName}`
        } else {
          return 'not found affected data type'
        }
      }
      return ''
    },
    /* bool return if null or not */
    isAffectedDataNull(obj) {
      if (!obj) {
        return false
      }
      return true
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
    async search() {
      await new Promise((resolve) => setTimeout(resolve, 500))
      this.page = 1
      await this.fetchAllLogs() // fetch the all list with filter search value
    },
  },
}
</script>
