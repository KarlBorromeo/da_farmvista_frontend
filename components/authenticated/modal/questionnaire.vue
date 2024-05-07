<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">Survey Questionaire</h2>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" color="primary">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list elevation="15">
          <v-list-item v-for="(item, i) in commodity" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-divider />
    <v-toolbar light elevation="0">
      <template>
        <v-tabs fixed-tabs show-arrows center-active slider-color="red">
          <v-tab @click="clicked('SurveyInformation')" class="caption">
            Survey Information
          </v-tab>
          <v-tab
            class="caption"
            @click="clicked('BasicInformation')"
            :disabled="SurveyInformationValidated"
          >
            Farmer's Basic Information
          </v-tab>
          <v-tab
            class="caption"
            @click="clicked('GeneralInformation')"
          >
            General Information
          </v-tab>
          <v-tab
            class="caption"
            @click="clicked('FamilyAffiliated')"
          >
            Family Affiliated
          </v-tab>
          <v-tab
            class="caption"
            @click="clicked('FamilyIncome')"
          >
            Family Income
          </v-tab>
          <v-tab
            class="caption"
            @click="clicked('FarmIncome')"
          >
            Farm Income
          </v-tab>
          <v-tab
            class="caption"
            @click="clicked('HouseholdExpenses')"
          >
            Household Expenses
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items>
      <v-card>
        <keep-alive>
          <component :is="current"></component>
        </keep-alive>
      </v-card>
    </v-tabs-items>
  </v-card>
</template>

<script>
import SurveyInformation from './questionnaire_forms/SurveyInformation.vue'
import BasicInformation from './questionnaire_forms/BasicInformation.vue'
import GeneralInformation from './questionnaire_forms/GeneralInformation.vue'
import FamilyAffiliated from './questionnaire_forms/FamilyAffiliated.vue'
import FamilyIncome from './questionnaire_forms/FamilyIncome.vue'
import FarmIncome from './questionnaire_forms/FarmIncome.vue'
import HouseholdExpenses from './questionnaire_forms/HouseholdExpenses.vue'
export default {
  components: { 
    SurveyInformation,
    BasicInformation, 
    GeneralInformation, 
    FamilyAffiliated, 
    FamilyIncome,
    FarmIncome,
    HouseholdExpenses
  },
  data() {
    return {
      current: 'HouseholdExpenses',
      commodity: [{ title: 'Coffee' }, { title: 'Mango' }, { title: 'Cacao' }],
    }
  },
  methods: {
    clicked(item) {
      this.current = item
    },
  },
  computed: {
    SurveyInformationValidated() {
      return !this.$store.getters['questionnaire/SurveyInformationValidated']
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
</style>
