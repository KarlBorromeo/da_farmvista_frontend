<template>
  <div>
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
    </tab-description>

    <tab-contents>
      <profiling-table />
    </tab-contents>
  </div>

</template>

<script>
import TabDescription from '~/components/authenticated/tabDescription.vue'
import UploadButton from '~/components/authenticated/buttons/uploadButton.vue'
import ManualSurveyButton from '~/components/authenticated/buttons/manualSurveyButton.vue'
import ProfilingTable from '~/components/authenticated/tables/profilingTable.vue'
import TabContents from '~/components/authenticated/tabContents.vue'
export default {
  components: {
    TabDescription,
    UploadButton,
    ManualSurveyButton,
    ProfilingTable,
    TabContents
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
