<template>
  <v-card light class="pa-4">
    <v-row class="mt-4">
      <v-col class="text-center">
        <div id="profile-container">
          <v-img
            alt=""
            :src="avatar"
            :contain="false"
            position="center"
            :aspect-ratio="1"
            width="80"
            class="rounded-pill elevation-4"
          />
          <v-dialog v-model="uploadAvatarModal" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                id="add-profile"
                v-on="on"
                v-bind="attrs"
                class="elevation-1"
              >
                <v-icon
                  id="add-profile-icon"
                  color="primary"
                  dark
                  style="border: 1px solid white"
                  >mdi-plus</v-icon
                >
              </v-btn>
            </template>
            <upload-avatar @emitCloseModal="emitCloseModalUploadAvatar" />
          </v-dialog>
        </div>
        <p class="text-uppercase py-0 my-0">{{ fullName }}</p>
        <p class="text-uppercase py-0 my-0 font-weight-bold">{{ company }}</p>
        <div id="custom-divider-container">
          <div style="width: 10%; display: inline-block" class="py-0 my-0">
            <v-divider />
          </div>
        </div>
        <p class="py-0 my-0 font-weight-light">{{ email }}</p>
        <p class="py-0 my-0 text-capitalize">{{ address }}</p>
        <p class="py-0 my-0 font-weight-bold">{{ type }}</p>
        <v-dialog v-model="dialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <p
              class="text-decoration-underline pb-0 mb-0"
              id="change-pass-btn"
              v-bind="attrs"
              v-on="on"
            >
              Change Password
            </p>
          </template>
          <change-password @emitCloseModal="emitCloseModalPassword" />
        </v-dialog>
        <p class="py-0 my-0 unhighlight">
          Password Updated {{ passwordLastUpdated }}
        </p>
      </v-col>
    </v-row>
    <snackbar ref="snackbar" />
  </v-card>
</template>

<script>
import Snackbar from '../snackbar.vue'
import changePassword from './modal/changePasword.vue'
import UploadAvatar from './modal/uploadAvatar.vue'
export default {
  components: { changePassword, Snackbar, UploadAvatar },
  data() {
    return {
      dialog: false,
      uploadAvatarModal: false,
    }
  },
  computed: {
    fullName() {
      return this.$store.getters['profile/myProfileDetails'].fullName
    },
    email() {
      return this.$store.getters['profile/myProfileDetails'].email
    },
    address() {
      return this.$store.getters['profile/myProfileDetails'].address
    },
    type() {
      return this.$store.getters['profile/myProfileDetails'].type
    },
    company() {
      return this.$store.getters['profile/myProfileDetails'].company
    },
    passwordLastUpdated() {
      return this.$store.getters['profile/myProfileDetails'].passwordLastUpdated
    },
    avatar() {
      return this.$store.getters['profile/myProfileDetails'].avatarURL
    },
  },
  methods: {
    async emitCloseModalUploadAvatar(res) {
      this.uploadAvatarModal = false
      this.$refs.snackbar.showBar(res, 'success')
      await this.$store.dispatch('profile/fetchCurrenUserDetails')
      this.$store.commit(
        'auth/updateAvatarURL',
        this.$store.getters['profile/myProfileDetails'].avatarURL
      )
    },
    async emitCloseModalPassword(res) {
      this.uploadAvatarModal = false
      this.$refs.snackbar.showBar(res, 'success')
    },
  },
}
</script>

<style scoped>
#profile-container {
  display: inline-block;
  position: relative;
}

#icon {
  transform: scale(1.5);
}
#add-profile {
  position: absolute;
  bottom: -0.5rem;
  right: -1rem;
  background-color: white;
  padding: 0;
}
#add-profile-icon {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 100%;
}
.unhighlight {
  color: #ded9d9;
}
#custom-divider-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}
#change-pass-btn {
  margin-top: 2rem;
  cursor: pointer;
  color: blueviolet;
}
#change-pass-btn:hover {
  color: blue;
}
</style>
