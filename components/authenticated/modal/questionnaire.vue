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
            I. Farmer's Basic Information
          </v-tab>
          <v-tab class="caption" @click="clicked('GeneralInformation')">
            II. General Information
          </v-tab>
          <v-tab class="caption" @click="clicked('FamilyAffiliated')">
            II. Family Affiliated
          </v-tab>
          <v-tab class="caption" @click="clicked('FamilyIncome')">
            III. Family Income
          </v-tab>
          <v-tab class="caption" @click="clicked('FarmIncome')">
            III. Farm Income
          </v-tab>
          <v-tab class="caption" @click="clicked('HouseholdExpenses')">
            IV. Household Expenses
          </v-tab>
          <v-tab class="caption" @click="clicked('AssetsFarmTools')">
            V. Assets Farm Tools
          </v-tab>
          <v-tab class="caption" @click="clicked('AssetsFarmMachinery')">
            V. Assets Farm Machinery
          </v-tab>
          <v-tab class="caption" @click="clicked('AssetsFarmPoultryLivestock')">
            V. Assets Farm Poultry Livestock
          </v-tab>
          <v-tab class="caption" @click="clicked('AssetsFarmStructure')">
            V. Assets Farm Structure
          </v-tab>
          <v-tab class="caption" @click="clicked('InformationDwellingPlace')">
            VI. Information Dwelling Place
          </v-tab>
          <v-tab class="caption" @click="clicked('GeneralFarmingInformation')">
            VII. General Farming Information
          </v-tab>
          <v-tab class="caption" @click="clicked('ParcelInformation')">
            VII.IV Parcel Information
          </v-tab>
          <v-tab class="caption" @click="clicked('DetailsCoffeeArea')">
            VII.V Details Coffee Area
          </v-tab>
          <v-tab
            class="caption"
            @click="clicked('InfrastructureDistanceAccessibility')"
          >
            VII.VI Infrastructure Distance Accessibility
          </v-tab>
          <v-tab class="caption" @click="clicked('FarmActivities')">
            VIII Farm Activities
          </v-tab>
          <v-tab class="caption" @click="clicked('FarmWasteManagement')">
            VIII.IV Farm Waste Management
          </v-tab>
          <v-tab class="caption" @click="clicked('CroppingPatternCalendar')">
            VIII.V Cropping Pattern Calendar
          </v-tab>
          <v-tab class="caption" @click="clicked('DetailsCoffeeProduction')">
            IX Details Coffee Production
          </v-tab>
          <v-tab class="caption" @click="clicked('LaborUtilizationOperations')">
            IX.II Labor Utilization Operations
          </v-tab>
          <v-tab class="caption" @click="clicked('DetailWageOperation')">
            IX.III Detail Wage Operation
          </v-tab>
         <!-- TODO:  -->
          <v-tab class="caption" @click="clicked('CostInputsCoffee')">
						IX.IV Cost Inputs Coffee
					</v-tab>
					<v-tab
						class="caption"
						@click="clicked('PestDamageObserved')"
					>
						X Pest Damage Observed
					</v-tab>
					<v-tab
						class="caption"
						@click="clicked('PestManagementPractice')"
					>
						X.I Pest Management Practice
					</v-tab>
					<v-tab
						class="caption"
						@click="clicked('CoffeeHarvestMarketing')"
					>
						XI Coffee Harvest Marketing
					</v-tab>
					<v-tab class="caption" @click="clicked('TechAwareness')">
						XII Technology Awareness
					</v-tab>
					<v-tab
						class="caption"
						@click="clicked('InformationKnowledgeSources')"
					>
						XIII Information Knowledge Sources
					</v-tab>
					<v-tab
						class="caption"
						@click="clicked('OpenEndedQuestions')"
					>
						XIV Open Ended Questions
					</v-tab>
					<v-tab
						class="caption"
						@click="clicked('OpenEndedQuestionRating')"
					>
						XV Open EndedQuestion Rating
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
import AssetsFarmTools from './questionnaire_forms/AssetsFarmTools.vue'
import AssetsFarmMachinery from './questionnaire_forms/AssetsFarmMachinery.vue'
import AssetsFarmPoultryLivestock from './questionnaire_forms/AssetsFarmPoultryLivestock.vue'
import AssetsFarmStructure from './questionnaire_forms/AssetsFarmStructure.vue'
import InformationDwellingPlace from './questionnaire_forms/InformationDwellingPlace.vue'
import GeneralFarmingInformation from './questionnaire_forms/GeneralFarmingInformation.vue'
import ParcelInformation from './questionnaire_forms/ParcelInformation.vue'
import DetailsCoffeeArea from './questionnaire_forms/DetailsCoffeeArea.vue'
import InfrastructureDistanceAccessibility from './questionnaire_forms/InfrastructureDistanceAccessibility.vue'
import FarmActivities from './questionnaire_forms/FarmActivities.vue'
import FarmWasteManagement from './questionnaire_forms/FarmWasteManagement.vue'
import CroppingPatternCalendar from './questionnaire_forms/CroppingPatternCalendar.vue'
import DetailsCoffeeProduction from './questionnaire_forms/DetailsCoffeeProduction.vue'
import LaborUtilizationOperations from './questionnaire_forms/LaborUtilizationOperations.vue'
import DetailWageOperation from './questionnaire_forms/DetailWageOperation.vue'
import CostInputsCoffee from './questionnaire_forms/CostInputsCoffee.vue'
import PestDamageObserved from './questionnaire_forms/PestDamageObserved.vue'
import PestManagementPractice from './questionnaire_forms/PestManagementPractice.vue'
import CoffeeHarvestMarketing from './questionnaire_forms/CoffeeHarvestMarketing.vue'
import TechAwareness from './questionnaire_forms/TechAwareness.vue'
import InformationKnowledgeSources from './questionnaire_forms/InformationKnowledgeSources.vue'
import OpenEndedQuestions from './questionnaire_forms/OpenEndedQuestions.vue'
import OpenEndedQuestionRating from './questionnaire_forms/OpenEndedQuestionRating.vue'
export default {
  components: {
    SurveyInformation,
    BasicInformation,
    GeneralInformation,
    FamilyAffiliated,
    FamilyIncome,
    FarmIncome,
    HouseholdExpenses,
    AssetsFarmTools,
    AssetsFarmMachinery,
    AssetsFarmPoultryLivestock,
    AssetsFarmStructure,
    InformationDwellingPlace,
    GeneralFarmingInformation,
    ParcelInformation,
    DetailsCoffeeArea,
    InfrastructureDistanceAccessibility,
    FarmActivities,
    FarmWasteManagement,
    CroppingPatternCalendar,
    DetailsCoffeeProduction,
    LaborUtilizationOperations,
    DetailWageOperation,
    CostInputsCoffee,
    PestDamageObserved,
    PestManagementPractice,
    CoffeeHarvestMarketing,
    TechAwareness,
    InformationKnowledgeSources,
    OpenEndedQuestions,
    OpenEndedQuestionRating
  },
  data() {
    return {
      current: 'SurveyInformation',
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
