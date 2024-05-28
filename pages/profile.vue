<template>
  <div>
    <tab-description
      icon="mdi-account-circle-outline"
      title="My Profile"
      :description="description"
    ></tab-description>
    <tab-contents>
      <v-row>
        <v-col
          cols="12" sm="7"
        >
          <v-card class="elevation-1">
            <edit-profile-form />
          </v-card>
        </v-col>
        <v-col
          cols="12" sm="5"
        >
          <v-card class="elevation-1">
            <profile-details />
          </v-card>
        </v-col>
      </v-row>
    </tab-contents>  
  </div>

</template>

<script>
import EditProfileForm from '~/components/authenticated/form/editProfileForm.vue'
import ProfileDetails from '~/components/authenticated/profileDetails.vue'
import TabContents from '~/components/authenticated/tabContents.vue'
import TabDescription from '~/components/authenticated/tabDescription.vue'
export default {
  components: { TabDescription, TabContents, EditProfileForm, ProfileDetails },
  data() {
    return {
      description:
        'Here, you can easily edit your personal details and update your profile picture, ensuring accurate information representation on your account.',
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'PROFILE')
  },
}
</script>

<style></style>
