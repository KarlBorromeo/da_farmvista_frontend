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
      <template v-slot:[`item.avatar`]="{ item }">
        <v-container class="">
          <v-avatar>
            <img :src="item.avatarURL" alt="John" />
          </v-avatar>
          <!-- {{item.avatarURL}} -->
        </v-container>
      </template>
      <template v-slot:[`item.switch`]="{ item }">
        <v-container class="text-center">
          <v-switch color="primary" v-model="item.status" :disabled="true" />
        </v-container>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          :color="item.status ? 'error' : 'primary'"
          block
          small
          @click="toggleActiveStatus(item.id, item.status)"
        >
          {{ buttonText(item.status) }}
        </v-btn>
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
      itemPerPage: 10, // number of rows per page
      loading: false, // toggle the loading of the table
      page: 1, // current page number
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Profile', align: 'center', value: 'avatar' },
        { text: 'Username', align: 'start', value: 'username' },
        { text: 'Fullname', align: 'start', value: 'fullName' },
        { text: `Gender`, value: 'gender' },
        { text: `Type`, value: 'type' },
        { text: `Email`, value: 'email' },
        { text: 'Mobile Number', value: 'mobileNumber' },
        { text: 'Company', value: 'company' },
        { text: 'Company Position', value: 'jobPosition' },
        { text: 'Inactive/Active', value: 'switch', sortable: false },
        { text: 'Action', value: 'actions', sortable: false, align: 'center' },
      ]
    },
    pageCount() {
      return this.$store.getters['users/countPages']
    },
    items() {
      return this.$store.getters['users/users']
    },
    getDynamicModel() {
      return (itemId) => {
        // Generate the dynamic property name
        return `item_${itemId}_active`
      }
    },
  },
  methods: {
    /* toggle active status */
    async toggleActiveStatus(id, bool) {
      const decision = bool ? 'deactivate' : 'activate'
      const confirmed = confirm(`Are you sure to ${decision} this user `)
      if (confirmed) {
        try {
          const res = await this.$store.dispatch('users/updateActiveStatus', id)
          this.$refs.snackbar.showBar(res, 'success')
        } catch (error) {
          this.$refs.snackbar.showBar(error, 'error')
        }
      }
    },

    /* text button dynamic */
    buttonText(bool) {
      return bool ? 'Deactivate' : 'Activate'
    },

    /* fetch the survey records */
    async fetchAllUsers() {
      try {
        this.loading = true
        await this.$store.dispatch('users/fetchAllUsers', {
          page: this.page,
          limit: this.itemPerPage,
          search: this.search.toLowerCase(),
        })
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.loading = false
    },
  },

  /* before mounting the component first http request to fetch the records */
  async beforeMount() {
    await this.fetchAllUsers()
  },

  watch: {
    /* execute the fetching everytime navigating to other page numbers */
    async page(newVal, oldVal) {
      if (newVal !== oldVal) {
        await this.fetchAllUsers()
      }
    },
    async search() {
      await new Promise((resolve) => setTimeout(resolve, 500))
      this.page = 1
      await this.fetchAllUsers() // fetch the all list with filter search value
    },
  },
}
</script>
