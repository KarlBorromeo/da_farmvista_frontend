<template>
  <v-dialog v-model="dialog" width="2000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="success"
        large
        v-bind="attrs"
        v-on="on"
        @click="openModalCreate"
      >
        <v-icon class="mr-2">mdi-text-box-edit-outline</v-icon>
        MANUAL SURVEY
      </v-btn> 
      <snackbar ref="snackbarManualSurvey" />
    </template>
    <questionnaire-vue v-if="!isEditing"/>
   
  </v-dialog>
</template>

<script>
import QuestionnaireVue from '~/components/authenticated/modal/questionnaire.vue'
import snackbar from '~/components/snackbar.vue'
export default {
  components: { QuestionnaireVue, snackbar },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    /* disabling edit mode, enabling create mode */
    openModalCreate() {
      this.$store.commit('profiling/toggleEditingMode', false)
      this.$store.commit('questionnaire/toggleDoneSubmit', false)
    },
  },
  computed: {
    /* basis re-render the modal if isEditing is toggles */
    isEditing(){
      return this.$store.getters['profiling/isEditingMode']
    },
    /* basis to close the modal */
    doneSubmitFormStatus(){
      return this.$store.getters['questionnaire/doneSubmit']
    },

  },
  watch: {
    doneSubmitFormStatus: {
      handler: async function (val) {
        const isEditing = this.$store.getters['profiling/isEditingMode']
        console.log(isEditing,val, 'creation')
        if(val && !isEditing){
          alert('haha')
          this.dialog = false
          this.$refs.snackbarManualSurvey.showBar('Succesfully created new survey', 'success')

          /* fetch all profiling surveys after closing the dialog */
          await this.$store.dispatch('profiling/fetchAllSurvey', {
            page: 1,
            limit: 10,
          })
        }
      }
    },
  }
}
</script>

<style></style>
