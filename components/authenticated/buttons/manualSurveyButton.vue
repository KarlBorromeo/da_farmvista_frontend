<template>
  <v-dialog v-model="dialog" width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        block
        color="success"
        large
        v-bind="attrs"
        v-on="on"
        @click="toggleOffEditing"
      >
        <v-icon class="mr-2">mdi-text-box-edit-outline</v-icon>
        MANUAL SURVEY
      </v-btn>
    </template>
    <questionnaire-vue />
  </v-dialog>
</template>

<script>
import QuestionnaireVue from '~/components/authenticated/modal/questionnaire.vue'
export default {
  components: { QuestionnaireVue },
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    /* disabling edit mode, enabling create mode */
    toggleOffEditing() {
      this.$store.commit('profiling/toggleEditingMode', false)
      this.$store.commit('questionnaire/resetTabsValidity')
    },
  },
  watch: {
    dialog(val) {
      if (!val) {
        this.$store.commit('questionnaire/resetTabsValidity')
      }
    },
  },
}
</script>

<style></style>
