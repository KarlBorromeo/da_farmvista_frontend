import * as api from '../api/questionnaire'
export const state = () => ({
  form: {
    farmHouseholdAsset: {},
    // parcelInfo: {  //TODO: delete this if done the profiling manual create code
    //   parcelNumber: [1, 2],
    //   cropsPlanted: ['haha,hehe', 'aww'],
    // },
    // profileGeneralInfo: {
    //   age: 23,
    //   sex: 'male',
    //   civilStatus: 'single',
    //   religion: 'catholic',
    //   highestEducationAttained: 'elementary level',
    //   isBelongMarginalizedSector: 'yes',
    //   ifNoMarginalizedSectorName: '',
    //   dialectSpoken: 'bisdak',
    //   isMemberFarmerOrganization: 'yes',
    //   organizationTypeMembership: 'officer',
    //   organizationName: 'organization sample Name OSN',
    //   isHouseMemberAffiliatedToOrg: 'yes',
    // },
    // profile: {
    //   lastName: 'haha',
    //   firstName: 'hehe',
    //   middleInitial: '',
    //   contactNumber: '',
    //   farmerCode: '',
    // }
  },
  tabs: [
    {
      tabName: 'DemographicFarmerProfile',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'BasicInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'SurveyInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'GeneralInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'FamilyAffiliatedValidated',
      validity: false,
      tempValidity: false,
    },
    { tabName: 'FamilyIncomeValidated', validity: false, tempValidity: false },
    { tabName: 'FarmIncomeValidated', validity: false, tempValidity: false },
    {
      tabName: 'HouseholdExpensesValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmToolsValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmMachineryValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmPoultryLivestockValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmStructureValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'InformationDwellingPlaceValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'GeneralFarmingInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'ParcelInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'DetailsCoffeeAreaValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'InfrastructureDistanceAccessibilityValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'FarmActivitiesValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'FarmWasteManagementValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'CroppingPatternCalendarValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'DetailsCoffeeProductionValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'LaborUtilizationOperationsValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'DetailWageOperationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'CostInputsCoffeeValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'PestDamageObservedValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'PestManagementPracticeValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'CoffeeHarvestMarketingValidated',
      validity: false,
      tempValidity: false,
    },
    { tabName: 'TechAwarenessValidated', validity: false, tempValidity: false },
    {
      tabName: 'InformationKnowledgeSourcesValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'OpenEndedQuestionsValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'OpenEndedQuestionRatingValidated',
      validity: false,
      tempValidity: false,
    },
  ],
  tabs2: [ // for not interviewed
    {
      tabName: 'DemographicFarmerProfile',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'ReasonStopping',
      validity: false,
      tempValidity: false,
    },
  ],
  tabs3: [ // for inactive status
    {
      tabName: 'DemographicFarmerProfile',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'BasicInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'SurveyInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'GeneralInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'FamilyAffiliatedValidated',
      validity: false,
      tempValidity: false,
    },
    { tabName: 'FamilyIncomeValidated', validity: false, tempValidity: false },
    { tabName: 'FarmIncomeValidated', validity: false, tempValidity: false },
    {
      tabName: 'HouseholdExpensesValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmToolsValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmMachineryValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmPoultryLivestockValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'AssetsFarmStructureValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'InformationDwellingPlaceValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'GeneralFarmingInformationValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'InfrastructureDistanceAccessibilityValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'FarmActivitiesValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'DetailWageOperationValidated',
      validity: false,
      tempValidity: false,
    },
    { 
      tabName: 'TechAwarenessValidated', 
      validity: false, 
      tempValidity: false 
    },
    {
      tabName: 'InformationKnowledgeSourcesValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'OpenEndedQuestionsValidated',
      validity: false,
      tempValidity: false,
    },
    {
      tabName: 'OpenEndedQuestionRatingValidated',
      validity: false,
      tempValidity: false,
    },
  ],
  // currentTab: 'BasicInformation',
  // currentTab: 'HouseholdExpenses',
  // currentTab: 'PestDamageObserved',
  currentTab: 'DemographicFarmerProfile',
  // currentTab: 'ReasonStopping',
  // currentTab: 'OpenEndedQuestionRating',
  progress: 0,
  isAllValid: false,
  commodity: '',
  isInterviewed: true,
  isSelfFarmerActive: true,
  isBasicInfoSurveyInfoValid: false,

  /* handler for isHouseMemberAffiliatedToOrg inside the generalInformation, in order for this to watch the value and affect the familyAffiliated tab forms */
  isHouseMemberAffiliatedToOrg: '',
  /* handler for isMemberFarmerOrganization inside the generalInformation, in order for this to watch the value and affect the familyAffiliated tab forms */
  selfFarmerOrganization: {},
  /* handler for self farmer's fullname inside the demographic farmer profile in order for this to watch the value and affect the familyAffiliated & familyIncome tab forms */
  selfFarmerFullname: {},
  /* handler for (age,sex,education attainment) level inside the general info farmer profile in order for this to watch the value and affect the familyAffiliated & familyIncome tab forms */
  selfFarmerGeneralInfo: {},
})

export const getters = {
  /* return the progress percentage of the form */
  progress(state){
    return state.progress
  },
  /* return fullname, this will be used inside the famillyAffiliated and familyIncome form */
  selfFarmerFullname(state){
    return state.selfFarmerFullname
  },
  /* return yes or no, this will be used inside the famillyAffiliated form */
  selfFarmerOrganization(state){
    return state.selfFarmerOrganization
  },
  /* return yes or no, this will be used inside the famillyAffiliated form */
  isHouseMemberAffiliatedToOrg(state){
    return state.isHouseMemberAffiliatedToOrg
  },
  /* retrun the profile details */
  profile(state) {
    return state.form.profile
  },
  /* return the general information details */
  generalInformationDetails(state) {
    return state.form.profileGeneralInfo
  },
  /* return the parcel information details */
  parcelInformationDetails(state) {
    return state.form.parcelInfo
  },
  /* return boolean if the farmer is interviewed or not*/
  isInterviewed(state) {
    return state.isInterviewed
  },
  /* return boolean if the farmer is interviewed or not*/
  isSelfFarmerActive(state) {
    return state.isSelfFarmerActive
  },
  /* return the updated tab selected */
  currentTab(state) {
    return state.currentTab
  },
  /* Tab1 Items Getters START */
  Tab1DemographicFarmerProfileValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'DemographicFarmerProfile'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1SurveyInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'SurveyInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1BasicInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'BasicInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1GeneralInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'GeneralInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1FamilyAffiliatedValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FamilyAffiliatedValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1FamilyIncomeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FamilyIncomeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1FarmIncomeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FarmIncomeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1HouseholdExpensesValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'HouseholdExpensesValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1AssetsFarmToolsValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmToolsValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1AssetsFarmMachineryValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmMachineryValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1AssetsFarmPoultryLivestockValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmPoultryLivestockValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1AssetsFarmStructureValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmStructureValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1InformationDwellingPlaceValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'InformationDwellingPlaceValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1GeneralFarmingInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'GeneralFarmingInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1ParcelInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'ParcelInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1DetailsCoffeeAreaValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'DetailsCoffeeAreaValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1InfrastructureDistanceAccessibilityValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'InfrastructureDistanceAccessibilityValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1FarmActivitiesValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FarmActivitiesValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1FarmWasteManagementValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FarmWasteManagementValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1CroppingPatternCalendarValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'CroppingPatternCalendarValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1DetailsCoffeeProductionValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'DetailsCoffeeProductionValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1LaborUtilizationOperationsValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'LaborUtilizationOperationsValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1DetailWageOperationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'DetailWageOperationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1CostInputsCoffeeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'CostInputsCoffeeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1PestDamageObservedValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'PestDamageObservedValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1PestManagementPracticeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'PestManagementPracticeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1CoffeeHarvestMarketingValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'CoffeeHarvestMarketingValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1TechAwarenessValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'TechAwarenessValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1InformationKnowledgeSourcesValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'InformationKnowledgeSourcesValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1OpenEndedQuestionsValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'OpenEndedQuestionsValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab1OpenEndedQuestionRatingValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'OpenEndedQuestionRatingValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  //TODO: delete this after
  // Tab1ReasonStoppingValidated(state) {
  //   const index = state.tabs.findIndex(
  //     (el) => el.tabName == 'ReasonStopping'
  //   )
  //   if (index >= 0) {
  //     return state.tabs[index].validity
  //   } else {
  //     console.error('tabname cannot find')
  //   }
  // },
  /* Tab1 Items Getters END */
  /* Tab2 Items Getters START */ //TODO:
  Tab2DemographicFarmerProfileValidated(state) {
    const index = state.tabs2.findIndex(
      (el) => el.tabName == 'DemographicFarmerProfile'
    )
    if (index >= 0) {
      return state.tabs2[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab2ReasonStoppingValidated(state) {
    const index = state.tabs2.findIndex(
      (el) => el.tabName == 'ReasonStopping'
    )
    if (index >= 0) {
      return state.tabs2[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  /* Tab2 Items Getters END */
  /* Tab3 Items Getters START *///TODO:
  Tab3DemographicFarmerProfileValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'DemographicFarmerProfile'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3SurveyInformationValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'SurveyInformationValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3BasicInformationValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'BasicInformationValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3GeneralInformationValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'GeneralInformationValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3FamilyAffiliatedValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'FamilyAffiliatedValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3FamilyIncomeValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'FamilyIncomeValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3FarmIncomeValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'FarmIncomeValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3HouseholdExpensesValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'HouseholdExpensesValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3AssetsFarmToolsValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'AssetsFarmToolsValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3AssetsFarmMachineryValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'AssetsFarmMachineryValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3AssetsFarmPoultryLivestockValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'AssetsFarmPoultryLivestockValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3AssetsFarmStructureValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'AssetsFarmStructureValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3InformationDwellingPlaceValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'InformationDwellingPlaceValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3GeneralFarmingInformationValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'GeneralFarmingInformationValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3ParcelInformationValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'ParcelInformationValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3InfrastructureDistanceAccessibilityValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'InfrastructureDistanceAccessibilityValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3FarmActivitiesValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'FarmActivitiesValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3DetailWageOperationValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'DetailWageOperationValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3TechAwarenessValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'TechAwarenessValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3InformationKnowledgeSourcesValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'InformationKnowledgeSourcesValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3OpenEndedQuestionsValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'OpenEndedQuestionsValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  Tab3OpenEndedQuestionRatingValidated(state) {
    const index = state.tabs3.findIndex(
      (el) => el.tabName == 'OpenEndedQuestionRatingValidated'
    )
    if (index >= 0) {
      return state.tabs3[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  /* Tab3 Items Getters END */
}

export const mutations = {
  /* save the fullname value of self farmer */
  saveSelfFarmerFullname(state,fullname){
    state.selfFarmerFullname = fullname
  },
  /* save the details value of the interviewed farmer organization if member */
  saveSelfFarmerOrganization(state,details){
    state.selfFarmerOrganization = details
  },
  /* save the yes or no value of the isHouseMemberAffiliated */
  saveIsHouseMemberAffiliatedToOrg(state,YesNo){
    state.isHouseMemberAffiliatedToOrg = YesNo
  },
  /* set the tab validity expected obj is {tabName: string, valid: boolean }*/
  toggleNextTab(state, obj) { //TODO:
    let tabs = [];
    let tabname = obj.tabName
    if(!state.isInterviewed){
      tabs = state.tabs2
    }else if(!state.isSelfFarmerActive){
      tabs = state.tabs3
    }else{
      tabs = state.tabs
    }
    const tabsLength = tabs.length
    const index = tabs.findIndex((el) => el.tabName == tabname)
    console.log(index)
    if (index >= 0) {
      if (obj.valid) {
        state.progress = ((index+1)/tabsLength)*100
        if(index == tabsLength-1){
          state.progress = 100;
        }
        tabs[index].validity = true
        tabs[index].tempValidity = true
        for (let i = index + 1; i < tabs.length; i++) {
          if (tabs[i].tempValidity) {
            tabs[i].validity = true
          }
        }
      } else {
        state.progress = ((index+1)/tabsLength)*100
        for (let i = index; i < tabs.length; i++) {
          tabs[i].validity = false
        }
      }
    } else {
      alert('oops something wrong')
    }
  },

  /* reset the validity of all tabs into false */
  resetTabsValidity(state) {
    state.tabs.forEach((tab) => {
      tab.validity = false
      tab.tempValidity = false
    })
    state.progress = 0
    // state.currentTab = 'BasicInformation' //TODO:
  },

  /* display the next tab contents */
  displayCurrentTab(state, tabName) {
    state.currentTab = tabName
  },

  /* save the all data of forms to a one object */
  saveData(state, obj) {
    state.form[obj.keyName] = obj.data
  },

  /* saving the data for teh assets forms */
  saveAssetsData(state, obj) {
    state.form.farmHouseholdAsset[obj.keyName] = obj.data
  },

  /* test if the all forms are valid before submission */
  checkValidityAll(state) {
    state.isAllValid = true
    for (let i = 0; i < state.tabs.length; i++) {
      if (state.tabs[i].validity == false) {
        state.isAllValid = false
        return
      }
    }
  },

  /* test if the basic information and survey information form are valid before submission */
  checkBasicInfoSurveyInfoValdity(state) {
    state.isBasicInfoSurveyInfoValid = false
    if (state.tabs[0].validity && state.tabs[1].validity) {
      state.isBasicInfoSurveyInfoValid = true
    }
  },

  /* update the commodity type */
  updateCommodity(state, commodity) {
    state.commodity = commodity
  },

  /* toggle the isInterviewed */
  toggleIsInterviewed(state, bool) {
    state.isInterviewed = bool
    // this will remove or add the 'farmHouseholdAsset' key in the form to just remove it when the interviewee is not validated, the default form has an existing 'farmHouseholdAsset' already
    if (!bool) {
      delete state.form.farmHouseholdAsset
    } else {
      state.form.farmHouseholdAsset = {}
    }
  },

  /* toggle the isSelfFarmerActive */ //TODO:
  toggleIsSelfFarmerActive(state,bool){
    state.isSelfFarmerActive = bool
  }
}

export const actions = {
  /* submit the form if all the tabs are validated or (basicInfo and surveyInfo forms only if interviewee status is not validated) */
  async submitAll(context) {
    if (context.state.isInterviewed) {
      context.commit('checkValidityAll')
    } else {
      context.commit('checkBasicInfoSurveyInfoValdity')
    }
    const payload = {
      type: context.state.commodity,
      form: context.state.form,
    }
    if (context.state.isAllValid || context.state.isBasicInfoSurveyInfoValid) {
      try {
        const response = await api.submitQuestionnaire(payload)
        return response
      } catch (error) {
        throw error
      }
    } else {
      throw new Error('incomplete forms for creating survey')
    }
  },

  /* submit and update the existing record or (basicInfo and surveyInfo forms only if interviewee status is not validated) */
  async submitUpdate(context, id) {
    if (context.state.isInterviewed) {
      context.commit('checkValidityAll')
    } else {
      context.commit('checkBasicInfoSurveyInfoValdity')
    }
    const payload = {
      id: id,
      form: context.state.form,
    }
    if (context.state.isAllValid || context.state.isBasicInfoSurveyInfoValid) {
      try {
        const response = await api.submitUpdate(payload)
        return response
      } catch (error) {
        throw error
      }
    } else {
      throw new Error('incomplete forms for updating survey')
    }
  },

  /* change the commodity and reset the tabs validity*/
  updateCommodity(context, commodity) {
    context.commit('updateCommodity', commodity)
    context.commit('resetTabsValidity')
  },
}
