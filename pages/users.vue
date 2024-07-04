<template>
  <div>
    <page-description
      icon="mdi-account-group"
      title="Users"
      :description="description"
    >
      <v-container class="mt-4 pa-0 ma-0">
        <v-row>
          <v-col cols="12" sm="6" class="">
            <v-dialog v-model="dialog" width="700">
              <template v-slot:activator="{ on, attrs }">
                <v-btn block color="success" large v-bind="attrs" v-on="on">
                  <v-icon class="mr-2">mdi-plus</v-icon>
                  Create an Account
                </v-btn>
              </template>
              <create-user @emitCloseModal="closeModal" />
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </page-description>
    <page-contents>
      <users-table ref="userTable" />
    </page-contents>
    <snackbar ref="snackbar" />
  </div>
</template>

<script>
import CreateUser from '~/components/authenticated/modal/createUser.vue'
import PageContents from '~/components/authenticated/pageContents.vue'
import PageDescription from '~/components/authenticated/pageDescription.vue'
import UsersTable from '~/components/authenticated/tables/usersTable.vue'
import snackbar from '~/components/snackbar.vue'
export default {
  middleware: 'authSuperadminAdmin',
  components: {
    PageDescription,
    CreateUser,
    UsersTable,
    PageContents,
    snackbar,
  },
  data() {
    return {
      dialog: false,
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis corporis natus nostrum magnam nesciunt quos accusamus, nisi libero nemo delectus sint sequi, debitis nam saepe culpa velit voluptatem veritatis accusantium!',
    }
  },
  methods: {
    closeModal(res) {
      this.dialog = false
      this.$refs.snackbar.showBar(res, 'success')
      this.$refs.userTable.fetchAllUsers()
    },
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'USERS')
  },
}
</script>

<style></style>
