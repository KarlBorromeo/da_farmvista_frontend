<template>
 <v-menu offset-y v-model="dropdownShow">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="success"
        large
        v-bind="attrs"
        v-on="on"
      >
        <v-icon class="mr-2">mdi-text-box-edit-outline</v-icon>
        MANUAL SURVEY
        <v-icon class="mr-2" style="position: absolute; right: 0"
          >mdi-chevron-down</v-icon
        >
      </v-btn>
    </template>
    <v-dialog v-model="dialog" width="2000">
      <template v-slot:activator="{ on, attrs }">
        <v-list>
          <v-list-item v-for="(form,i) in options" :key="i">
            <v-btn
              color="white text-capitalize"
              block
              elevation="0"
              v-bind="attrs"
              v-on="on"
              @click="openModalCreate(form)"
              >{{ form }}
            </v-btn>
          </v-list-item>
        </v-list>
        <snackbar ref="snackbarManualSurvey" />
      </template>

      <!-- diff modals here based on the commodity and form number -->
      <questionnaire-vue v-if="!isEditing && selectedForm=='form 1' && commodity == 'coffee'" :commodity="commodity" :selectedForm="selectedForm"/>
      <v-card v-else-if="!isEditing && selectedForm=='form 2' && commodity == 'coffee'" >
        <p class="pa-0 ma-0 title font-weight-normal text-capitalize">
          Survey Questionaire {{ commodity }} {{selectedForm}}
        </p>
        coffee form 2
      </v-card>
      <v-card v-else>
        <p class="pa-0 ma-0 title font-weight-normal text-capitalize">
          Survey Questionaire {{ commodity }} {{selectedForm}}
        </p>
        empty
      </v-card>
    </v-dialog>
  </v-menu>
</template>

<script>
import QuestionnaireVue from '~/components/authenticated/modal/questionnaire.vue'
import snackbar from '~/components/snackbar.vue'
export default {
  components: { QuestionnaireVue, snackbar },
  props: [ 'commodity' ],
  beforeMount(){
    this.options = this.items[this.commodity]
  },
  data() {
    return {
      dialog: false,
      dropdownShow: false,
      items: {
        coffee: [
          'form 1',
          'form 2'
        ],
        banana: [
          'form 1'
        ]
      },
      options: [],
      selectedForm: '',
    }
  },
  methods: {
    /* disabling edit mode, enabling create mode */
    openModalCreate(form) {
      this.selectedForm = form
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
    commodity(val){
      this.options = this.items[val]
    },
    /* close the drodown when the dialog closed */
    dialog(val){
      if(!val){
        this.dropdownShow = false
      }
    }
  }
}
</script>

<style></style>
