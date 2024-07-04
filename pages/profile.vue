<template>
  <div>
    <page-description
      icon="mdi-account-circle-outline"
      title="My Profile"
      :description="description"
    />
    <page-contents>
      <v-row>
        <v-col cols="12" sm="7">
          <v-card class="elevation-1">
            <edit-profile-form :myProfile="myProfile" />
          </v-card>
        </v-col>
        <v-col cols="12" sm="5">
          <v-card class="elevation-1">
            <profile-details :myProfile="myProfile" />
          </v-card>
        </v-col>
      </v-row>
    </page-contents>
  </div>
</template>

<script>
import EditProfileForm from '~/components/authenticated/form/editProfileForm.vue'
import ProfileDetails from '~/components/authenticated/profileDetails.vue'
import PageContents from '~/components/authenticated/pageContents.vue'
import PageDescription from '~/components/authenticated/pageDescription.vue'
export default {
  components: {
    PageDescription,
    PageContents,
    EditProfileForm,
    ProfileDetails,
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'MY PROFILE')
  },
  data() {
    return {
      description:
        'Here, you can easily edit your personal details and update your profile picture, ensuring accurate information representation on your account.',
      myProfile: {},
    }
  },
}
</script>

<style></style>
