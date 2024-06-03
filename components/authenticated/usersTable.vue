

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
      <template v-slot:[`item.switch`]="{ item }">
        <v-container class="text-center">
          <v-switch
            color="primary"
            v-model="item.status"
            :disabled="true"
          />
        </v-container>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn :color="item.status?'error':'primary'" block small @click="toggleActiveStatus(item.id,item.status)">
          {{buttonText(item.status)}}
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
  components: { snackbar},
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
        { text: 'Username', align: 'start', value: 'username' },
        { text: 'Fullname', align: 'start', value: 'fullName' },
        { text: `Gender`, value: 'gender'},
        { text: `Type`, value: 'type'},
        { text: `Email`, value: 'email'},
        { text: 'Mobile Number', value: 'mobileNumber'},
        { text: 'Company', value: 'company'},
        { text: 'Company Position', value: 'jobPosition'},
        { text: 'Inactive/Active', value: 'switch', sortable: false},
        { text: 'Action', value: 'actions', sortable: false, align: 'center', },
      ]
    },
    pageCount() {
      return this.$store.getters['users/countPages']
    },
    items(){
      return this.$store.getters['users/users']
    },     
    getDynamicModel() {
      return (itemId) => {
        // Generate the dynamic property name
        return `item_${itemId}_active`;
      };
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

    /* toggle active status */
    async toggleActiveStatus(id,bool){
      const decision = bool?'deactivate':'activate';
      const confirmed = confirm(`Are you sure to ${decision} this user `)
      if(confirmed){
        try{
          const res = await this.$store.dispatch('users/updateActiveStatus',id)
          this.$refs.snackbar.showBar(res,'success')
        }catch(error){
          this.$refs.snackbar.showBar(error,'error')
        }
      }
    },

    /* text button dynamic */
    buttonText(bool){
      return bool?'Deactivate':'Activate'
    },

    /* fetch the survey records */
    async fetchAllUsers() {
      console.log(this.page)
      try {
        this.loading = true
        await this.$store.dispatch('users/fetchAllUsers', {
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
    await this.fetchAllUsers()
  },

  watch: {
    /* execute the fetching everytime navigating to other page numbers */
    async page(newVal, oldVal) {
      if (newVal !== oldVal) {
        await this.fetchAllUsers()
      }
    },
  },
}
</script>
