<template>
  <v-card light class="pa-4">
    <div class="d-flex align-center justify-space-between pa-4">
      <h2 class="pa-0 ma-0 headline font-weight-bold">Survey Questionaire {{ currentCommodity }}</h2>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" color="primary">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list elevation="15">
          <v-list-item v-for="(item, i) in commodity" :key="i">
            <v-list-item-title @click="switchCommodity(item)">{{ item}}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-divider />
    <v-toolbar light elevation="0">
      <template v-if="currentCommodity == 'Coffee Beans'">
        <v-tabs fixed-tabs show-arrows center-active slider-color="red">
          <v-tab @click="selectTab('SurveyInformation')" class="caption">
            Survey Information
          </v-tab>
          <v-tab
            class="caption"
            @click="selectTab('BasicInformation')"
            :disabled="SurveyInformationValidated"
          >
            I. Farmer's Basic Information
          </v-tab>
          <v-tab class="caption" @click="selectTab('GeneralInformation')">
            II. General Information
          </v-tab>
          <v-tab class="caption" @click="selectTab('FamilyAffiliated')">
            II. Family Affiliated
          </v-tab>
          <v-tab class="caption" @click="selectTab('FamilyIncome')">
            III. Family Income
          </v-tab>
          <v-tab class="caption" @click="selectTab('FarmIncome')">
            III. Farm Income
          </v-tab>
          <v-tab class="caption" @click="selectTab('HouseholdExpenses')">
            IV. Household Expenses
          </v-tab>
          <v-tab class="caption" @click="selectTab('AssetsFarmTools')">
            V. Assets Farm Tools
          </v-tab>
          <v-tab class="caption" @click="selectTab('AssetsFarmMachinery')">
            V. Assets Farm Machinery
          </v-tab>
          <v-tab class="caption" @click="selectTab('AssetsFarmPoultryLivestock')">
            V. Assets Farm Poultry Livestock
          </v-tab>
          <v-tab class="caption" @click="selectTab('AssetsFarmStructure')">
            V. Assets Farm Structure
          </v-tab>
          <v-tab class="caption" @click="selectTab('InformationDwellingPlace')">
            VI. Information Dwelling Place
          </v-tab>
          <v-tab class="caption" @click="selectTab('GeneralFarmingInformation')">
            VII. General Farming Information
          </v-tab>
          <v-tab class="caption" @click="selectTab('ParcelInformation')">
            VII.IV Parcel Information
          </v-tab>
          <v-tab class="caption" @click="selectTab('DetailsCoffeeArea')">
            VII.V Details Coffee Area
          </v-tab>
          <v-tab
            class="caption"
            @click="selectTab('InfrastructureDistanceAccessibility')"
          >
            VII.VI Infrastructure Distance Accessibility
          </v-tab>
          <v-tab class="caption" @click="selectTab('FarmActivities')">
            VIII Farm Activities
          </v-tab>
          <v-tab class="caption" @click="selectTab('FarmWasteManagement')">
            VIII.IV Farm Waste Management
          </v-tab>
          <v-tab class="caption" @click="selectTab('CroppingPatternCalendar')">
            VIII.V Cropping Pattern Calendar
          </v-tab>
          <v-tab class="caption" @click="selectTab('DetailsCoffeeProduction')">
            IX Details Coffee Production
          </v-tab>
          <v-tab class="caption" @click="selectTab('LaborUtilizationOperations')">
            IX.II Labor Utilization Operations
          </v-tab>
          <v-tab class="caption" @click="selectTab('DetailWageOperation')">
            IX.III Detail Wage Operation
          </v-tab>
         <!-- TODO:  -->
          <v-tab class="caption" @click="selectTab('CostInputsCoffee')">
						IX.IV Cost Inputs Coffee
					</v-tab>
					<v-tab
						class="caption"
						@click="selectTab('PestDamageObserved')"
					>
						X Pest Damage Observed
					</v-tab>
					<v-tab
						class="caption"
						@click="selectTab('PestManagementPractice')"
					>
						X.I Pest Management Practice
					</v-tab>
					<v-tab
						class="caption"
						@click="selectTab('CoffeeHarvestMarketing')"
					>
						XI Coffee Harvest Marketing
					</v-tab>
					<v-tab class="caption" @click="selectTab('TechAwareness')">
						XII Technology Awareness
					</v-tab>
					<v-tab
						class="caption"
						@click="selectTab('InformationKnowledgeSources')"
					>
						XIII Information Knowledge Sources
					</v-tab>
					<v-tab
						class="caption"
						@click="selectTab('OpenEndedQuestions')"
					>
						XIV Open Ended Questions
					</v-tab>
					<v-tab
						class="caption"
						@click="selectTab('OpenEndedQuestionRating')"
					>
						XV Open EndedQuestion Rating
					</v-tab>
        </v-tabs>
      </template>
      <template v-else>
        <v-tabs fixed-tabs show-arrows center-active slider-color="red">
          <v-tab>TAB 1</v-tab>
          <v-tab>TAB 2</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items>
      <v-card v-if="currentCommodity == 'Coffee Beans'">
        <keep-alive>
          <component :is="current"></component>
        </keep-alive>
      </v-card>
      <v-card v-else>
        <keep-alive>
          EMPTY HERE
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
      current: 'OpenEndedQuestionRating',
      currentCommodity: 'Coffee Beans',
      commodity: ['Coffee Beans' , 'Mango' , 'Cacao' ],
    }
  },
  methods: {
    selectTab(item) {
      this.current = item
    },
    switchCommodity(commodity){
      this.currentCommodity = commodity
    }
  },
  computed: {
    SurveyInformationValidated() {
      return !this.$store.getters['questionnaire/SurveyInformationValidated']
    },
  },
  async beforeMount(){
    await this.$store.dispatch('questionnaireCode/fetchAllCodes','coffee beans');
  }
}
</script>

<style scoped>
@import url('~/assets/css/fonts.css');
</style>
