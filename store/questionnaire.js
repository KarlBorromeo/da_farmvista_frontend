import * as api from '../api/questionnaire'
export const state = () => ({
  form: {
    farmHouseholdAsset: {},
  },
  tabs: [
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
  // currentTab: 'BasicInformation',
  // currentTab: 'FarmWasteManagement',
  currentTab: 'ParcelInformation',
  // currentTab: 'DetailsCoffeeArea',
  isAllValid: false,
  commodity: '',
  isIntervieweeValidated: true,
  isBasicInfoSurveyInfoValid: false,
})

export const getters = {
  /* return the parcel information details */
  parcelInformationDetails(state){
    return state.form.parcelInfo
  },
  /* return boolean if the current interview is validated or not eg(diseased,declined,not-present, et.) */
  isIntervieweeValidated(state){
    return state.isIntervieweeValidated
  },
  /* return the updated tab selected */
  currentTab(state) {
    return state.currentTab
  },
  SurveyInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'SurveyInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  BasicInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'BasicInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  GeneralInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'GeneralInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  FamilyAffiliatedValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FamilyAffiliatedValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  FamilyIncomeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FamilyIncomeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  FarmIncomeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FarmIncomeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  HouseholdExpensesValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'HouseholdExpensesValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  AssetsFarmToolsValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmToolsValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  AssetsFarmMachineryValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmMachineryValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  AssetsFarmPoultryLivestockValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmPoultryLivestockValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  AssetsFarmStructureValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'AssetsFarmStructureValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  InformationDwellingPlaceValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'InformationDwellingPlaceValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  GeneralFarmingInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'GeneralFarmingInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  ParcelInformationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'ParcelInformationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  DetailsCoffeeAreaValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'DetailsCoffeeAreaValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  InfrastructureDistanceAccessibilityValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'InfrastructureDistanceAccessibilityValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  FarmActivitiesValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FarmActivitiesValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  FarmWasteManagementValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'FarmWasteManagementValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  CroppingPatternCalendarValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'CroppingPatternCalendarValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  DetailsCoffeeProductionValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'DetailsCoffeeProductionValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  LaborUtilizationOperationsValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'LaborUtilizationOperationsValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  DetailWageOperationValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'DetailWageOperationValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  CostInputsCoffeeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'CostInputsCoffeeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  PestDamageObservedValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'PestDamageObservedValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  PestManagementPracticeValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'PestManagementPracticeValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  CoffeeHarvestMarketingValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'CoffeeHarvestMarketingValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  TechAwarenessValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'TechAwarenessValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  InformationKnowledgeSourcesValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'InformationKnowledgeSourcesValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  OpenEndedQuestionsValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'OpenEndedQuestionsValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
  OpenEndedQuestionRatingValidated(state) {
    const index = state.tabs.findIndex(
      (el) => el.tabName == 'OpenEndedQuestionRatingValidated'
    )
    if (index >= 0) {
      return state.tabs[index].validity
    } else {
      console.error('tabname cannot find')
    }
  },
}

export const mutations = {
  /* set the tab validity expected obj is {tabName: string, valid: boolean }*/
  toggleNextTab(state, obj) {
    const tabs = state.tabs
    const index = tabs.findIndex((el) => el.tabName == obj.tabName)
    if (index >= 0) {
      if (obj.valid) {
        state.tabs[index].validity = true
        state.tabs[index].tempValidity = true
        for (let i = index + 1; i < tabs.length; i++) {
          if (state.tabs[i].tempValidity) {
            state.tabs[i].validity = true
          }
        }
      } else {
        for (let i = index; i < tabs.length; i++) {
          state.tabs[i].validity = false
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
    // state.currentTab = 'BasicInformation' TODO:
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
  checkBasicInfoSurveyInfoValdity(state){
    state.isBasicInfoSurveyInfoValid = false
    if(state.tabs[0].validity && state.tabs[1].validity){
      state.isBasicInfoSurveyInfoValid = true
    }
  },

  /* update the commodity type */
  updateCommodity(state, commodity) {
    state.commodity = commodity
  },

  /* toggle the isIntervieweeValidated */
  toggleIsIntervieweeValidated(state,bool){
    state.isIntervieweeValidated = bool
    // this will remove or add the 'farmHouseholdAsset' key in the form to just remove it when the interviewee is not validated, the default form has an existing 'farmHouseholdAsset' already
    if(!bool){
      delete state.form.farmHouseholdAsset
    }else{
      state.form.farmHouseholdAsset = {}
    }
  }
}

export const actions = {
  /* submit the form if all the tabs are validated or (basicInfo and surveyInfo forms only if interviewee status is not validated) */
  async submitAll(context) {
    if(context.state.isIntervieweeValidated){
      context.commit('checkValidityAll')
    }else{
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
  async submitUpdate(context,id){
    if(context.state.isIntervieweeValidated){
      context.commit('checkValidityAll')
    }else{
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
