<template>
  <div>
    <tab-description
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
              <create-user @emitCloseModal="closeModal"/>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </tab-description>
    <tab-contents>
      <users-table ref="userTable"/>
    </tab-contents>   
     <snackbar ref="snackbar" /> 
  </div>
</template>

<script>
import CreateUser from '~/components/authenticated/modal/createUser.vue'
import TabContents from '~/components/authenticated/tabContents.vue'
import TabDescription from '~/components/authenticated/tabDescription.vue'
import UsersTable from '~/components/authenticated/usersTable.vue'
import snackbar from '~/components/snackbar.vue'
export default {
  components: { TabDescription, CreateUser, UsersTable, TabContents, snackbar },
  data() {
    return {
      dialog: false,
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis corporis natus nostrum magnam nesciunt quos accusamus, nisi libero nemo delectus sint sequi, debitis nam saepe culpa velit voluptatem veritatis accusantium!',
    }
  },
  methods:{
    closeModal(res){
      this.dialog = false
      this.$refs.snackbar.showBar(res, 'success')
      this.$refs.userTable.fetchAllUsers()
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'USERS')
  },
}
</script>

<style></style>
