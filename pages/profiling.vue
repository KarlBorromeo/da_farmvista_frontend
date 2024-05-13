<template>
  <tab-description
    icon="mdi-account-arrow-up"
    title="Profiling"
    :description="description"
  >
    <v-container class="mt-4">
      <p class="caption">Accepted File: .xlsx</p>
      <v-row>
        <v-col cols="12" sm="6" class="pt-0">
          <upload-button />
        </v-col>
        <v-col cols="12" sm="6" class="pt-0">
          <v-dialog v-model="dialog" width="700">
            <template v-slot:activator="{ on, attrs }">
              <v-btn block color="success" large v-bind="attrs" v-on="on">
                <v-icon class="mr-2">mdi-text-box-edit-outline</v-icon>
                MANUAL SURVEY
              </v-btn>
            </template>
            <questionnaire-vue />
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </tab-description>
</template>

<script>
import TabDescription from '~/components/authenticated/TabDescription.vue'
import QuestionnaireVue from '~/components/authenticated/modal/questionnaire.vue'
import UploadButton from '~/components/authenticated/buttons/uploadButton.vue'
export default {
  components: { TabDescription, QuestionnaireVue, UploadButton },
  data() {
    return {
      dialog: false,
      description:
        'This module simplifies farm profiling by offering easy Excel uploads or manual survey input, allowing  to capture comprehensive data about coffee farmers.',
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'PROFILING')
  },
}
</script>
