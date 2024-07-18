<template>
  <v-container id="container">
    <v-btn large class="success" @click="submitAll" :disabled="loading"
      >{{ buttonText }} All Forms</v-btn
    >
    <snackbar ref="snackbar" />
  </v-container>
</template>

<script>
import snackbar from '~/components/snackbar.vue'
export default {
  activated(){
    this.$store.commit('questionnaire/toggleNextTab', {
      tabName: 'Submission',
      valid:true,
    })
  },
  components: { snackbar },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async submitAll() {
      try {
        this.loading = true
        const isEditing = this.$store.getters['profiling/isEditingMode']
        let response
        if (isEditing) {
          let id = this.$store.getters['profiling/selectedRecord'].interview.id
          response = await this.$store.dispatch(
            'questionnaire/submitUpdate',
            id
          )
        } else {
          response = await this.$store.dispatch('questionnaire/submitAll')
        }

        this.$refs.snackbar.showBar(response, 'success')
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.loading = false
    },
  },
  computed: {
    buttonText() {
      const isEditing = this.$store.getters['profiling/isEditingMode']
      if (isEditing) {
        return 'Update'
      } else {
        return 'Submit'
      }
    },
  },
}
</script>

<style scoped>
#container {
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
