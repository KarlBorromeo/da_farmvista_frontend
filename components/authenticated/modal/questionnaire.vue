<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">
        Survey Questionaire {{ currentCommodity }}
      </h2>
      <commodity-dropdown v-if="!id" @switchCommodity="switchCommodity" />
    </div>
    <v-progress-linear :value="progress" color="primary" height="25" striped
      ><strong class="white--text"
        >{{ Math.ceil(progress) }}%</strong
      ></v-progress-linear
    >
    <v-divider />
    <v-toolbar light elevation="0" v-if="currentCommodity == 'coffee'">
      <template >
        <v-tabs
          fixed-tabs
          show-arrows
          center-active
          slider-color="primary"
          v-model="initialTab"
        >
          <v-tab
            class="caption font-weight-black"
            @click="selectTab('DemographicFarmerProfile')"
          >
            I. Demographic Farmer Profile
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            :disabled="Tab1DemographicFarmerProfileValidated"
            class="caption font-weight-black"
            @click="selectTab('BasicInformation')"
          >
            I. Farmer's Basic Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            @click="selectTab('SurveyInformation')"
            class="caption font-weight-black"
            :disabled="Tab1BasicInformationValidated"
          >
            Survey Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('GeneralInformation')"
            :disabled="Tab1SurveyInformationValidated"
          >
            II. General Information
          </v-tab>

          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FamilyAffiliated')"
            :disabled="Tab1GeneralInformationValidated"
          >
            II. Family Affiliated
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FamilyIncome')"
            :disabled="Tab1FamilyAffiliatedValidated"
          >
            III. Family Income
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FarmIncome')"
            :disabled="Tab1FamilyIncomeValidated"
          >
            III. Farm Income
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('HouseholdExpenses')"
            :disabled="Tab1FarmIncomeValidated"
          >
            IV. Household Expenses
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmTools')"
            :disabled="Tab1HouseholdExpensesValidated"
          >
            V. Assets Farm Tools
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmMachinery')"
            :disabled="Tab1AssetsFarmToolsValidated"
          >
            V. Assets Farm Machinery
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmPoultryLivestock')"
            :disabled="Tab1AssetsFarmMachineryValidated"
          >
            V. Assets Farm Poultry Livestock
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmStructure')"
            :disabled="Tab1AssetsFarmPoultryLivestockValidated"
          >
            V. Assets Farm Structure
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('InformationDwellingPlace')"
            :disabled="Tab1AssetsFarmStructureValidated"
          >
            VI. Information Dwelling Place
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('GeneralFarmingInformation')"
            :disabled="Tab1InformationDwellingPlaceValidated"
          >
            VII. General Farming Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('ParcelInformation')"
            :disabled="Tab1GeneralFarmingInformationValidated"
          >
            VII.IV Parcel Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('DetailsCoffeeArea')"
            :disabled="Tab1ParcelInformationValidated"
          >
            VII.V Details Coffee Area
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('InfrastructureDistanceAccessibility')"
            :disabled="Tab1DetailsCoffeeAreaValidated"
          >
            VII.VI Infrastructure Distance Accessibility
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FarmActivities')"
            :disabled="Tab1InfrastructureDistanceAccessibilityValidated"
          >
            VIII Farm Activities
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FarmWasteManagement')"
            :disabled="Tab1FarmActivitiesValidated"
          >
            VIII.IV Farm Waste Management
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('CroppingPatternCalendar')"
            :disabled="Tab1FarmWasteManagementValidated"
          >
            VIII.V Cropping Pattern Calendar
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('DetailsCoffeeProduction')"
            :disabled="Tab1CroppingPatternCalendarValidated"
          >
            IX Details Coffee Production
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('LaborUtilizationOperations')"
            :disabled="Tab1DetailsCoffeeProductionValidated"
          >
            IX.II Labor Utilization Operations
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('DetailWageOperation')"
            :disabled="Tab1LaborUtilizationOperationsValidated"
          >
            IX.III Detail Wage Operation
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('CostInputsCoffee')"
            :disabled="Tab1DetailWageOperationValidated"
          >
            IX.IV Cost Inputs Coffee
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('PestDamageObserved')"
            :disabled="Tab1CostInputsCoffeeValidated"
          >
            X Pest Damage Observed
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('PestManagementPractice')"
            :disabled="Tab1PestDamageObservedValidated"
          >
            X.I Pest Management Practice
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('CoffeeHarvestMarketing')"
            :disabled="Tab1PestManagementPracticeValidated"
          >
            XI Coffee Harvest Marketing
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('TechAwareness')"
            :disabled="Tab1CoffeeHarvestMarketingValidated"
          >
            XII Technology Awareness
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('InformationKnowledgeSources')"
            :disabled="Tab1TechAwarenessValidated"
          >
            XIII Information Knowledge Sources
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('OpenEndedQuestions')"
            :disabled="Tab1InformationKnowledgeSourcesValidated"
          >
            XIV Open Ended Questions
          </v-tab>
          <v-tab
            v-if="isInterviewed && isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('OpenEndedQuestionRating')"
            :disabled="Tab1OpenEndedQuestionsValidated"
          >
            XV Open EndedQuestion Rating
          </v-tab>

          <!-- TAB 2 -->
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            :disabled="Tab2DemographicFarmerProfileValidated"
            class="caption font-weight-black"
            @click="selectTab('BasicInformation')"
          >
            I. Farmer's Basic Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            @click="selectTab('SurveyInformation')"
            class="caption font-weight-black"
            :disabled="Tab2BasicInformationValidated"
          >
            Survey Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('GeneralInformation')"
            :disabled="Tab2SurveyInformationValidated"
          >
            II. General Information
          </v-tab>

          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FamilyAffiliated')"
            :disabled="Tab2GeneralInformationValidated"
          >
            II. Family Affiliated
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FamilyIncome')"
            :disabled="Tab2FamilyAffiliatedValidated"
          >
            III. Family Income
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FarmIncome')"
            :disabled="Tab2FamilyIncomeValidated"
          >
            III. Farm Income
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('HouseholdExpenses')"
            :disabled="Tab2FarmIncomeValidated"
          >
            IV. Household Expenses
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmTools')"
            :disabled="Tab2HouseholdExpensesValidated"
          >
            V. Assets Farm Tools
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmMachinery')"
            :disabled="Tab2AssetsFarmToolsValidated"
          >
            V. Assets Farm Machinery
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmPoultryLivestock')"
            :disabled="Tab2AssetsFarmMachineryValidated"
          >
            V. Assets Farm Poultry Livestock
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('AssetsFarmStructure')"
            :disabled="Tab2AssetsFarmPoultryLivestockValidated"
          >
            V. Assets Farm Structure
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('InformationDwellingPlace')"
            :disabled="Tab2AssetsFarmStructureValidated"
          >
            VI. Information Dwelling Place
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('GeneralFarmingInformation')"
            :disabled="Tab2InformationDwellingPlaceValidated"
          >
            VII. General Farming Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('ParcelInformation')"
            :disabled="Tab2GeneralFarmingInformationValidated"
          >
            VII.IV Parcel Information
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('InfrastructureDistanceAccessibility')"
            :disabled="Tab2ParcelInformationValidated"
          >
            VII.VI Infrastructure Distance Accessibility
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('FarmActivities')"
            :disabled="Tab2InfrastructureDistanceAccessibilityValidated"
          >
            VIII Farm Activities
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('DetailWageOperation')"
            :disabled="Tab2FarmActivitiesValidated"
          >
            IX.III Detail Wage Operation
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('TechAwareness')"
            :disabled="Tab2DetailWageOperationValidated"
          >
            XII Technology Awareness
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('InformationKnowledgeSources')"
            :disabled="Tab2TechAwarenessValidated"
          >
            XIII Information Knowledge Sources
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('OpenEndedQuestions')"
            :disabled="Tab2InformationKnowledgeSourcesValidated"
          >
            XIV Open Ended Questions
          </v-tab>
          <v-tab
            v-if="isInterviewed && !isSelfFarmerActive"
            class="caption font-weight-black"
            @click="selectTab('OpenEndedQuestionRating')"
            :disabled="Tab2OpenEndedQuestionsValidated"
          >
            XV Open EndedQuestion Rating
          </v-tab>

          <!-- TAB 3 -->
          <v-tab
            v-if="!isInterviewed"
            :disabled="Tab3DemographicFarmerProfileValidated"
            class="caption font-weight-black"
            @click="selectTab('ReasonStopping')"
          >
            I. Reason Stopping
          </v-tab>

          <!-- SUBMISSION -->
          <v-tab
            class="caption font-weight-black"
            @click="selectTab('SubmissionPage')"
            :disabled="SubmissionAllowed"
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
import DemographicFarmerProfile from '../tabItems/questionnaireForms/DemographicFarmerProfile.vue'
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
import ReasonStopping from '../tabItems/questionnaireForms/ReasonStopping.vue'
import SubmissionPage from '../tabItems/questionnaireForms/SubmissionPage.vue'
import CommodityDropdown from '../commodityDropdown.vue'
import snackbar from '~/components/snackbar.vue'



export default {
  props: ['id', 'commodityProp'],
  components: {
    DemographicFarmerProfile,
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
    DetailsCoffeeArea,//TODO: not required if inactive
    InfrastructureDistanceAccessibility,
    FarmActivities,
    FarmWasteManagement,//TODO: not required if inactive
    CroppingPatternCalendar,//TODO: not required if inactive
    DetailsCoffeeProduction,//TODO: not required if inactive
    LaborUtilizationOperations,//TODO: not required if inactive
    DetailWageOperation,
    CostInputsCoffee,//TODO: not required if inactive
    PestDamageObserved,//TODO: not required if inactive
    PestManagementPractice,//TODO: not required if inactive
    CoffeeHarvestMarketing,//TODO: not required if inactive
    TechAwareness,
    InformationKnowledgeSources,
    OpenEndedQuestions,
    OpenEndedQuestionRating,
    ReasonStopping,//TODO: not required if not interviewed
    SubmissionPage,
    CommodityDropdown,
    snackbar,
  },
  data() {
    return {
      aw:true,
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
    progress(){
      return this.$store.getters['questionnaire/progress']
    },
    isSelfFarmerActive(){
      return this.$store.getters['questionnaire/isSelfFarmerActive']
    },
    isInterviewed() {
      return this.$store.getters['questionnaire/isInterviewed']
    },
    currentTab() {
      return this.$store.getters['questionnaire/currentTab']
    },
    /* for interviewed and active tab buttons started here*/
    /* tab1 */
    Tab1DemographicFarmerProfileValidated() {
      return !this.$store.getters['questionnaire/Tab1DemographicFarmerProfileValidated']
    },
    Tab1SurveyInformationValidated() {
      return !this.$store.getters['questionnaire/Tab1SurveyInformationValidated']
    },
    Tab1BasicInformationValidated() {
      return !this.$store.getters['questionnaire/Tab1BasicInformationValidated']
    },
    Tab1GeneralInformationValidated() {
      return !this.$store.getters['questionnaire/Tab1GeneralInformationValidated']
    },
    Tab1FamilyAffiliatedValidated() {
      return !this.$store.getters['questionnaire/Tab1FamilyAffiliatedValidated']
    },
    Tab1FamilyIncomeValidated() {
      return !this.$store.getters['questionnaire/Tab1FamilyIncomeValidated']
    },
    Tab1FarmIncomeValidated() {
      return !this.$store.getters['questionnaire/Tab1FarmIncomeValidated']
    },
    Tab1HouseholdExpensesValidated() {
      return !this.$store.getters['questionnaire/Tab1HouseholdExpensesValidated']
    },
    Tab1AssetsFarmToolsValidated() {
      return !this.$store.getters['questionnaire/Tab1AssetsFarmToolsValidated']
    },
    Tab1AssetsFarmMachineryValidated() {
      return !this.$store.getters['questionnaire/Tab1AssetsFarmMachineryValidated']
    },
    Tab1AssetsFarmPoultryLivestockValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1AssetsFarmPoultryLivestockValidated'
      ]
    },
    Tab1AssetsFarmStructureValidated() {
      return !this.$store.getters['questionnaire/Tab1AssetsFarmStructureValidated']
    },
    Tab1InformationDwellingPlaceValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1InformationDwellingPlaceValidated'
      ]
    },
    Tab1GeneralFarmingInformationValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1GeneralFarmingInformationValidated'
      ]
    },
    Tab1ParcelInformationValidated() {
      return !this.$store.getters['questionnaire/Tab1ParcelInformationValidated']
    },
    Tab1DetailsCoffeeAreaValidated() {
      return !this.$store.getters['questionnaire/Tab1DetailsCoffeeAreaValidated']
    },
    Tab1InfrastructureDistanceAccessibilityValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1InfrastructureDistanceAccessibilityValidated'
      ]
    },
    Tab1FarmActivitiesValidated() {
      return !this.$store.getters['questionnaire/Tab1FarmActivitiesValidated']
    },
    Tab1FarmWasteManagementValidated() {
      return !this.$store.getters['questionnaire/Tab1FarmWasteManagementValidated']
    },
    Tab1CroppingPatternCalendarValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1CroppingPatternCalendarValidated'
      ]
    },
    Tab1DetailsCoffeeProductionValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1DetailsCoffeeProductionValidated'
      ]
    },
    Tab1LaborUtilizationOperationsValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1LaborUtilizationOperationsValidated'
      ]
    },
    Tab1DetailWageOperationValidated() {
      return !this.$store.getters['questionnaire/Tab1DetailWageOperationValidated']
    },
    Tab1CostInputsCoffeeValidated() {
      return !this.$store.getters['questionnaire/Tab1CostInputsCoffeeValidated']
    },
    Tab1PestDamageObservedValidated() {
      return !this.$store.getters['questionnaire/Tab1PestDamageObservedValidated']
    },
    Tab1PestManagementPracticeValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1PestManagementPracticeValidated'
      ]
    },
    Tab1CoffeeHarvestMarketingValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1CoffeeHarvestMarketingValidated'
      ]
    },
    Tab1TechAwarenessValidated() {
      return !this.$store.getters['questionnaire/Tab1TechAwarenessValidated']
    },
    Tab1InformationKnowledgeSourcesValidated() {
      return !this.$store.getters[
        'questionnaire/Tab1InformationKnowledgeSourcesValidated'
      ]
    },
    Tab1OpenEndedQuestionsValidated() {
      return !this.$store.getters['questionnaire/Tab1OpenEndedQuestionsValidated']
    },
    /* for interviewed and active tab buttons ended here*/

    /* for inactive but interviewed, tab button started here */
    /* tab 3*/
    Tab2DemographicFarmerProfileValidated() {
      return !this.$store.getters['questionnaire/Tab2DemographicFarmerProfileValidated']
    },
    Tab2SurveyInformationValidated() {
      return !this.$store.getters['questionnaire/Tab2SurveyInformationValidated']
    },
    Tab2BasicInformationValidated() {
      return !this.$store.getters['questionnaire/Tab2BasicInformationValidated']
    },
    Tab2GeneralInformationValidated() {
      return !this.$store.getters['questionnaire/Tab2GeneralInformationValidated']
    },
    Tab2FamilyAffiliatedValidated() {
      return !this.$store.getters['questionnaire/Tab2FamilyAffiliatedValidated']
    },
    Tab2FamilyIncomeValidated() {
      return !this.$store.getters['questionnaire/Tab2FamilyIncomeValidated']
    },
    Tab2FarmIncomeValidated() {
      return !this.$store.getters['questionnaire/Tab2FarmIncomeValidated']
    },
    Tab2HouseholdExpensesValidated() {
      return !this.$store.getters['questionnaire/Tab2HouseholdExpensesValidated']
    },
    Tab2AssetsFarmToolsValidated() {
      return !this.$store.getters['questionnaire/Tab2AssetsFarmToolsValidated']
    },
    Tab2AssetsFarmMachineryValidated() {
      return !this.$store.getters['questionnaire/Tab2AssetsFarmMachineryValidated']
    },
    Tab2AssetsFarmPoultryLivestockValidated() {
      return !this.$store.getters[
        'questionnaire/Tab2AssetsFarmPoultryLivestockValidated'
      ]
    },
    Tab2AssetsFarmStructureValidated() {
      return !this.$store.getters['questionnaire/Tab2AssetsFarmStructureValidated']
    },
    Tab2InformationDwellingPlaceValidated() {
      return !this.$store.getters[
        'questionnaire/Tab2InformationDwellingPlaceValidated'
      ]
    },
    Tab2GeneralFarmingInformationValidated() {
      return !this.$store.getters[
        'questionnaire/Tab2GeneralFarmingInformationValidated'
      ]
    },
    Tab2ParcelInformationValidated() {
      return !this.$store.getters['questionnaire/Tab2ParcelInformationValidated']
    },
    Tab2InfrastructureDistanceAccessibilityValidated() {
      return !this.$store.getters[
        'questionnaire/Tab2InfrastructureDistanceAccessibilityValidated'
      ]
    },
    Tab2FarmActivitiesValidated() {
      return !this.$store.getters['questionnaire/Tab2FarmActivitiesValidated']
    },
    Tab2DetailWageOperationValidated() {
      return !this.$store.getters['questionnaire/Tab2DetailWageOperationValidated']
    },
    Tab2TechAwarenessValidated() {
      return !this.$store.getters['questionnaire/Tab2TechAwarenessValidated']
    },
    Tab2InformationKnowledgeSourcesValidated() {
      return !this.$store.getters['questionnaire/Tab2InformationKnowledgeSourcesValidated']
    },
    Tab2OpenEndedQuestionsValidated() {
      return !this.$store.getters['questionnaire/Tab2OpenEndedQuestionsValidated']
    },
    /* for inactive but interviewed, tab button ended here */

    /* for not interviewed either active or inactive, tab buttons started here*/
    /* tab3 */
    Tab3DemographicFarmerProfileValidated() {
      return !this.$store.getters['questionnaire/Tab3DemographicFarmerProfileValidated']
    },
    /* for not interviewed either active or inactive, tab buttons ended here*/

    SubmissionAllowed(){
      const openEndedQuestionsValidity = this.$store.getters['questionnaire/Tab1OpenEndedQuestionRatingValidated'] || this.$store.getters['questionnaire/Tab2OpenEndedQuestionRatingValidated']
      const reasonValidity = this.$store.getters['questionnaire/Tab3ReasonStoppingValidated']
      if(openEndedQuestionsValidity || reasonValidity){
        return false
      }else{
        return true
      }
    }
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
