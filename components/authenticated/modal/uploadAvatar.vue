<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">Upload Avatar</h2>
    </div>
    <v-divider />
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-file-input
          v-model="avatar"
          :rules="rules"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Avatar"
        ></v-file-input>
      </v-form>
    </v-container>
    <v-btn class="success" @click="upload">Upload</v-btn>
    <snackbar ref="snackbar" />
  </v-card>
</template>

<script>
import Snackbar from '~/components/snackbar.vue'
export default {
  emits: ['emitCloseModal'],
  components: { Snackbar },
  data() {
    return {
      valid: false,
      avatar: null,
      rules: [
        (v) => !!v || 'Upload avatar is required',
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Avatar size should be less than 2 MB!',
      ],
    }
  },
  methods: {
    async upload() {
      const valid = this.$refs.form.validate()
      if (valid) {
        try {
          const res = await this.$store.dispatch(
            'profile/uploadAvatar',
            this.avatar
          )
          this.$emit('emitCloseModal', res)
          this.avatar = null
        } catch (error) {
          this.$refs.snackbar.showBar(error, 'error')
        }
      }
    },
  },
}
</script>
