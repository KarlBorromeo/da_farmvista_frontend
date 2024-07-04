<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">
        Survey Questionaire {{ currentCommodity }}
      </h2>
      <commodity-dropdown v-if="!id" @switchCommodity="switchCommodity" />
    </div>
    <v-divider />
    <v-toolbar light elevation="0" v-if="currentCommodity == 'coffee'">
      <template>
        <v-tabs
          fixed-tabs
          show-arrows
          center-active
          slider-color="primary"
          v-model="initialTab"
        >
          <v-tab
            class="caption font-weight-black"
            @click="selectTab('BasicInformation')"
          >
            I. Farmer's Basic Information
          </v-tab>
          <v-tab
            @click="selectTab('SurveyInformation')"
            class="caption font-weight-black"
            :disabled="BasicInformationValidated"
          >
            Survey Information
          </v-tab>

          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('GeneralInformation')"
            :disabled="SurveyInformationValidated"
          >
            II. General Information
          </v-tab>

          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('FamilyAffiliated')"
            :disabled="GeneralInformationValidated"
          >
            II. Family Affiliated
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('FamilyIncome')"
            :disabled="FamilyAffiliatedValidated"
          >
            III. Family Income
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('FarmIncome')"
            :disabled="FamilyIncomeValidated"
          >
            III. Farm Income
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('HouseholdExpenses')"
            :disabled="FarmIncomeValidated"
          >
            IV. Household Expenses
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmTools')"
            :disabled="HouseholdExpensesValidated"
          >
            V. Assets Farm Tools
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmMachinery')"
            :disabled="AssetsFarmToolsValidated"
          >
            V. Assets Farm Machinery
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmPoultryLivestock')"
            :disabled="AssetsFarmMachineryValidated"
          >
            V. Assets Farm Poultry Livestock
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmStructure')"
            :disabled="AssetsFarmPoultryLivestockValidated"
          >
            V. Assets Farm Structure
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('InformationDwellingPlace')"
            :disabled="AssetsFarmStructureValidated"
          >
            VI. Information Dwelling Place
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('GeneralFarmingInformation')"
            :disabled="InformationDwellingPlaceValidated"
          >
            VII. General Farming Information
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('ParcelInformation')"
            :disabled="GeneralFarmingInformationValidated"
          >
            VII.IV Parcel Information
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('DetailsCoffeeArea')"
            :disabled="ParcelInformationValidated"
          >
            VII.V Details Coffee Area
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('InfrastructureDistanceAccessibility')"
            :disabled="DetailsCoffeeAreaValidated"
          >
            VII.VI Infrastructure Distance Accessibility
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('FarmActivities')"
            :disabled="InfrastructureDistanceAccessibilityValidated"
          >
            VIII Farm Activities
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('FarmWasteManagement')"
            :disabled="FarmActivitiesValidated"
          >
            VIII.IV Farm Waste Management
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('CroppingPatternCalendar')"
            :disabled="FarmWasteManagementValidated"
          >
            VIII.V Cropping Pattern Calendar
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('DetailsCoffeeProduction')"
            :disabled="CroppingPatternCalendarValidated"
          >
            IX Details Coffee Production
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('LaborUtilizationOperations')"
            :disabled="DetailsCoffeeProductionValidated"
          >
            IX.II Labor Utilization Operations
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('DetailWageOperation')"
            :disabled="LaborUtilizationOperationsValidated"
          >
            IX.III Detail Wage Operation
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('CostInputsCoffee')"
            :disabled="DetailWageOperationValidated"
          >
            IX.IV Cost Inputs Coffee
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('PestDamageObserved')"
            :disabled="CostInputsCoffeeValidated"
          >
            X Pest Damage Observed
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('PestManagementPractice')"
            :disabled="PestDamageObservedValidated"
          >
            X.I Pest Management Practice
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('CoffeeHarvestMarketing')"
            :disabled="PestManagementPracticeValidated"
          >
            XI Coffee Harvest Marketing
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('TechAwareness')"
            :disabled="CoffeeHarvestMarketingValidated"
          >
            XII Technology Awareness
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('InformationKnowledgeSources')"
            :disabled="TechAwarenessValidated"
          >
            XIII Information Knowledge Sources
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('OpenEndedQuestions')"
            :disabled="InformationKnowledgeSourcesValidated"
          >
            XIV Open Ended Questions
          </v-tab>
          <v-tab
            v-if="isIntervieweeValidated"
            class="caption font-weight-black"
            @click="selectTab('OpenEndedQuestionRating')"
            :disabled="OpenEndedQuestionsValidated"
          >
            XV Open EndedQuestion Rating
          </v-tab>
          <v-tab
            class="caption font-weight-black"
            @click="selectTab('SubmissionPage')"
            :disabled="OpenEndedQuestionRatingValidated"
          >
            SUBMISSION
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-card v-if="loading" class="mt-3">
      <p class="text-center">
        Please wait we are fetching the form, apply loading screen here
      </p>
    </v-card>
    <v-tabs-items v-else>
      <v-card v-if="currentCommodity == 'coffee'">
        <keep-alive>
          <component :is="currentTab"></component>
        </keep-alive>
      </v-card>
      <v-card v-else> EMPTY </v-card>
    </v-tabs-items>
    <snackbar ref="snackbar" />
  </v-card>
</template>

<script>
import BasicInformation from '../tabItems/questionnaireForms/BasicInformation.vue'
import SurveyInformation from '../tabItems/questionnaireForms/SurveyInformation.vue'
import GeneralInformation from '../tabItems/questionnaireForms/GeneralInformation.vue'
import FamilyAffiliated from '../tabItems/questionnaireForms/FamilyAffiliated.vue'
import FamilyIncome from '../tabItems/questionnaireForms/FamilyIncome.vue'
import FarmIncome from '../tabItems/questionnaireForms/FarmIncome.vue'
import HouseholdExpenses from '../tabItems/questionnaireForms/HouseholdExpenses.vue'
import AssetsFarmTools from '../tabItems/questionnaireForms/AssetsFarmTools.vue'
import AssetsFarmMachinery from '../tabItems/questionnaireForms/AssetsFarmMachinery.vue'
import AssetsFarmPoultryLivestock from '../tabItems/questionnaireForms/AssetsFarmPoultryLivestock.vue'
import AssetsFarmStructure from '../tabItems/questionnaireForms/AssetsFarmStructure.vue'
import InformationDwellingPlace from '../tabItems/questionnaireForms/InformationDwellingPlace.vue'
import GeneralFarmingInformation from '../tabItems/questionnaireForms/GeneralFarmingInformation.vue'
import ParcelInformation from '../tabItems/questionnaireForms/ParcelInformation.vue'
import DetailsCoffeeArea from '../tabItems/questionnaireForms/DetailsCoffeeArea.vue'
import InfrastructureDistanceAccessibility from '../tabItems/questionnaireForms/InfrastructureDistanceAccessibility.vue'
import FarmActivities from '../tabItems/questionnaireForms/FarmActivities.vue'
import FarmWasteManagement from '../tabItems/questionnaireForms/FarmWasteManagement.vue'
import CroppingPatternCalendar from '../tabItems/questionnaireForms/CroppingPatternCalendar.vue'
import DetailsCoffeeProduction from '../tabItems/questionnaireForms/DetailsCoffeeProduction.vue'
import LaborUtilizationOperations from '../tabItems/questionnaireForms/LaborUtilizationOperations.vue'
import DetailWageOperation from '../tabItems/questionnaireForms/DetailWageOperation.vue'
import CostInputsCoffee from '../tabItems/questionnaireForms/CostInputsCoffee.vue'
import PestDamageObserved from '../tabItems/questionnaireForms/PestDamageObserved.vue'
import PestManagementPractice from '../tabItems/questionnaireForms/PestManagementPractice.vue'
import CoffeeHarvestMarketing from '../tabItems/questionnaireForms/CoffeeHarvestMarketing.vue'
import TechAwareness from '../tabItems/questionnaireForms/TechAwareness.vue'
import InformationKnowledgeSources from '../tabItems/questionnaireForms/InformationKnowledgeSources.vue'
import OpenEndedQuestions from '../tabItems/questionnaireForms/OpenEndedQuestions.vue'
import OpenEndedQuestionRating from '../tabItems/questionnaireForms/OpenEndedQuestionRating.vue'
import SubmissionPage from '../tabItems/questionnaireForms/SubmissionPage.vue'
import CommodityDropdown from '../commodityDropdown.vue'
import snackbar from '~/components/snackbar.vue'

export default {
  props: ['id', 'commodityProp'],
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
    OpenEndedQuestionRating,
    SubmissionPage,
    CommodityDropdown,
    snackbar,
  },
  data() {
    return {
      loading: false,
      currentCommodity: 'coffee',
      initialTab: 0,
    }
  },
  methods: {
    /* render the form based on the tab selected */
    selectTab(item) {
      this.$store.commit('questionnaire/displayCurrentTab', item)
    },
    /* change/update the commodity type */
    switchCommodity(commodity) {
      this.currentCommodity = commodity.toLowerCase()
    },
    /* fetching code requestS, and set the form type commodity in store for the submission stage */
    async fetchAllCodes() {
      try {
        this.loading = true
        this.$store.dispatch(
          'questionnaire/updateCommodity',
          this.currentCommodity
        )
        await this.$store.dispatch(
          'questionnaireCode/fetchAllCodes',
          this.currentCommodity
        )
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.loading = false
    },

    /* fetching one record existing using the id, needed an id first */
    async fetchOneRecord() {
      this.switchCommodity(this.commodityProp)
      try {
        this.loading = true
        await this.$store.dispatch('profiling/fetchSingleSurvey', {
          id: this.id,
          type: this.currentCommodity,
        })
      } catch (error) {
        this.$refs.snackbar.showBar(error, 'red')
      }
      this.loading = false
    },
  },
  computed: {
    isIntervieweeValidated() {
      return this.$store.getters['questionnaire/isIntervieweeValidated']
    },
    currentTab() {
      return this.$store.getters['questionnaire/currentTab']
    },
    SurveyInformationValidated() {
      return !this.$store.getters['questionnaire/SurveyInformationValidated']
    },
    BasicInformationValidated() {
      return !this.$store.getters['questionnaire/BasicInformationValidated']
    },
    GeneralInformationValidated() {
      return !this.$store.getters['questionnaire/GeneralInformationValidated']
    },
    FamilyAffiliatedValidated() {
      return !this.$store.getters['questionnaire/FamilyAffiliatedValidated']
    },
    FamilyIncomeValidated() {
      return !this.$store.getters['questionnaire/FamilyIncomeValidated']
    },
    FarmIncomeValidated() {
      return !this.$store.getters['questionnaire/FarmIncomeValidated']
    },
    HouseholdExpensesValidated() {
      return !this.$store.getters['questionnaire/HouseholdExpensesValidated']
    },
    AssetsFarmToolsValidated() {
      return !this.$store.getters['questionnaire/AssetsFarmToolsValidated']
    },
    AssetsFarmMachineryValidated() {
      return !this.$store.getters['questionnaire/AssetsFarmMachineryValidated']
    },
    AssetsFarmPoultryLivestockValidated() {
      return !this.$store.getters[
        'questionnaire/AssetsFarmPoultryLivestockValidated'
      ]
    },
    AssetsFarmStructureValidated() {
      return !this.$store.getters['questionnaire/AssetsFarmStructureValidated']
    },
    InformationDwellingPlaceValidated() {
      return !this.$store.getters[
        'questionnaire/InformationDwellingPlaceValidated'
      ]
    },
    GeneralFarmingInformationValidated() {
      return !this.$store.getters[
        'questionnaire/GeneralFarmingInformationValidated'
      ]
    },
    ParcelInformationValidated() {
      return !this.$store.getters['questionnaire/ParcelInformationValidated']
    },
    DetailsCoffeeAreaValidated() {
      return !this.$store.getters['questionnaire/DetailsCoffeeAreaValidated']
    },
    InfrastructureDistanceAccessibilityValidated() {
      return !this.$store.getters[
        'questionnaire/InfrastructureDistanceAccessibilityValidated'
      ]
    },
    FarmActivitiesValidated() {
      return !this.$store.getters['questionnaire/FarmActivitiesValidated']
    },
    FarmWasteManagementValidated() {
      return !this.$store.getters['questionnaire/FarmWasteManagementValidated']
    },
    CroppingPatternCalendarValidated() {
      return !this.$store.getters[
        'questionnaire/CroppingPatternCalendarValidated'
      ]
    },
    DetailsCoffeeProductionValidated() {
      return !this.$store.getters[
        'questionnaire/DetailsCoffeeProductionValidated'
      ]
    },
    LaborUtilizationOperationsValidated() {
      return !this.$store.getters[
        'questionnaire/LaborUtilizationOperationsValidated'
      ]
    },
    DetailWageOperationValidated() {
      return !this.$store.getters['questionnaire/DetailWageOperationValidated']
    },
    CostInputsCoffeeValidated() {
      return !this.$store.getters['questionnaire/CostInputsCoffeeValidated']
    },
    PestDamageObservedValidated() {
      return !this.$store.getters['questionnaire/PestDamageObservedValidated']
    },
    PestManagementPracticeValidated() {
      return !this.$store.getters[
        'questionnaire/PestManagementPracticeValidated'
      ]
    },
    CoffeeHarvestMarketingValidated() {
      return !this.$store.getters[
        'questionnaire/CoffeeHarvestMarketingValidated'
      ]
    },
    TechAwarenessValidated() {
      return !this.$store.getters['questionnaire/TechAwarenessValidated']
    },
    InformationKnowledgeSourcesValidated() {
      return !this.$store.getters[
        'questionnaire/InformationKnowledgeSourcesValidated'
      ]
    },
    OpenEndedQuestionsValidated() {
      return !this.$store.getters['questionnaire/OpenEndedQuestionsValidated']
    },
    OpenEndedQuestionRatingValidated() {
      return !this.$store.getters[
        'questionnaire/OpenEndedQuestionRatingValidated'
      ]
    },
  },
  /* 
    fetch a specific survey record once only if the prop "id" is not null or undefined,
  */
  async beforeMount() {
    await this.fetchAllCodes()
    if (this.id) {
      await this.fetchOneRecord()
    }
  },
  watch: {
    /* watch the current tab, move to the intial tab when the current tab is BasicInformation */
    currentTab(tabName) {
      if (tabName == 'BasicInformation') {
        this.initialTab = 0
      }
    },
    /* fetch codes if the commodity changed*/
    async currentCommodity(newVal, oldVal) {
      if (newVal != oldVal) {
        this.switchCommodity(newVal)
        await this.fetchAllCodes()
      }
    },
    /* if id prop is changed and not null, we fetch one record, edit mode only */
    async id(val) {
      if (val) {
        this.initialTab = 0
        await this.fetchOneRecord()
      }
    },
  },
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
</style>
