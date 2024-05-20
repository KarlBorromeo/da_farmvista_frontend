<template>
  <tab-description
    icon="mdi-account-arrow-up"
    title="Profiling"
    :description="description"
  >
    <v-container class="pa-0 ma-0 mt-4">
      <p class="caption">Accepted File: .xlsx</p>
      <v-row>
        <v-col cols="12" sm="6" class="pt-0">
          <upload-button />
        </v-col>
        <v-col cols="12" sm="6" class="pt-0">
          <manual-survey-button />
        </v-col>
      </v-row>
    </v-container>
    <profiling-table />
  </tab-description>
</template>

<script>
import TabDescription from '~/components/authenticated/TabDescription.vue'
import UploadButton from '~/components/authenticated/buttons/uploadButton.vue'
import ManualSurveyButton from '~/components/authenticated/buttons/manualSurveyButton.vue'
import ProfilingTable from '~/components/authenticated/profilingTable.vue'
export default {
  components: {
    TabDescription,
    UploadButton,
    ManualSurveyButton,
    ProfilingTable,
  },
  data() {
    return {
      description:
        'This module simplifies farm profiling by offering easy Excel uploads or manual survey input, allowing  to capture comprehensive data about coffee farmers.',
    }
  },
  beforeMount() {
    this.$store.commit('udpateHeaderTitle', 'PROFILING')
  },
}
</script>
