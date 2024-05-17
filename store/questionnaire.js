import * as api from '../storeAPI/questionnaire';
export const state = () => ({
  form: {
    farmHouseholdAsset: {},
  },
  tabs: [
    {tabName: 'SurveyInformationValidated',validity: false, tempValidity: false},
    {tabName: 'BasicInformationValidated',validity: false, tempValidity: false},
    {tabName: 'GeneralInformationValidated',validity: false, tempValidity: false},
    {tabName: 'FamilyAffiliatedValidated',validity: false, tempValidity: false},
    {tabName: 'FamilyIncomeValidated',validity: false, tempValidity: false},
    {tabName: 'FarmIncomeValidated',validity: false, tempValidity: false},
    {tabName: 'HouseholdExpensesValidated',validity: false, tempValidity: false},
    {tabName: 'AssetsFarmToolsValidated',validity: false, tempValidity: false},
    {tabName: 'AssetsFarmMachineryValidated',validity: false, tempValidity: false},
    {tabName: 'AssetsFarmPoultryLivestockValidated',validity: false, tempValidity: false},
    {tabName: 'AssetsFarmStructureValidated',validity: false, tempValidity: false},
    {tabName: 'InformationDwellingPlaceValidated',validity: false, tempValidity: false},
    {tabName: 'GeneralFarmingInformationValidated',validity: false, tempValidity: false},
    {tabName: 'ParcelInformationValidated',validity: false, tempValidity: false},
    {tabName: 'DetailsCoffeeAreaValidated',validity: false, tempValidity: false},
    {tabName: 'InfrastructureDistanceAccessibilityValidated',validity: true, tempValidity: false},
    {tabName: 'FarmActivitiesValidated',validity: false, tempValidity: false},
    {tabName: 'FarmWasteManagementValidated',validity: false, tempValidity: false},
    {tabName: 'CroppingPatternCalendarValidated',validity: true, tempValidity: false},
    {tabName: 'DetailsCoffeeProductionValidated',validity: false, tempValidity: false},
    {tabName: 'LaborUtilizationOperationsValidated',validity: false, tempValidity: false},
    {tabName: 'DetailWageOperationValidated',validity: false, tempValidity: false},
    {tabName: 'CostInputsCoffeeValidated',validity: false, tempValidity: false},
    {tabName: 'PestDamageObservedValidated',validity: false, tempValidity: false},
    {tabName: 'PestManagementPracticeValidated',validity: false, tempValidity: false},
    {tabName: 'CoffeeHarvestMarketingValidated',validity: false, tempValidity: false},
    {tabName: 'TechAwarenessValidated',validity: false, tempValidity: false},
    {tabName: 'InformationKnowledgeSourcesValidated',validity: false, tempValidity: false},
    {tabName: 'OpenEndedQuestionsValidated',validity: false, tempValidity: false},
    {tabName: 'OpenEndedQuestionRatingValidated',validity: true, tempValidity: false}
  ],
  isAllValid: false
})

export const getters = {
  SurveyInformationValidated(state) {
    const index = state.tabs.findIndex( el => el.tabName == 'SurveyInformationValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    }  
  },
  BasicInformationValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'BasicInformationValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  GeneralInformationValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'GeneralInformationValidated');
    console.log('general info getter: ',state.tabs[index].validity)
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  FamilyAffiliatedValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'FamilyAffiliatedValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  FamilyIncomeValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'FamilyIncomeValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  FarmIncomeValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'FarmIncomeValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  HouseholdExpensesValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'HouseholdExpensesValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  AssetsFarmToolsValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'AssetsFarmToolsValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  AssetsFarmMachineryValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'AssetsFarmMachineryValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  AssetsFarmPoultryLivestockValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'AssetsFarmPoultryLivestockValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  AssetsFarmStructureValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'AssetsFarmStructureValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  InformationDwellingPlaceValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'InformationDwellingPlaceValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  GeneralFarmingInformationValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'GeneralFarmingInformationValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  ParcelInformationValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'ParcelInformationValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  DetailsCoffeeAreaValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'DetailsCoffeeAreaValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  InfrastructureDistanceAccessibilityValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'InfrastructureDistanceAccessibilityValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  FarmActivitiesValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'FarmActivitiesValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  FarmWasteManagementValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'FarmWasteManagementValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  CroppingPatternCalendarValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'CroppingPatternCalendarValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  DetailsCoffeeProductionValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'DetailsCoffeeProductionValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  LaborUtilizationOperationsValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'LaborUtilizationOperationsValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  DetailWageOperationValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'DetailWageOperationValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  CostInputsCoffeeValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'CostInputsCoffeeValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  PestDamageObservedValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'PestDamageObservedValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  PestManagementPracticeValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'PestManagementPracticeValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  CoffeeHarvestMarketingValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'CoffeeHarvestMarketingValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  TechAwarenessValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'TechAwarenessValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  InformationKnowledgeSourcesValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'InformationKnowledgeSourcesValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  OpenEndedQuestionsValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'OpenEndedQuestionsValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
  OpenEndedQuestionRatingValidated(state){
    const index = state.tabs.findIndex( el => el.tabName == 'OpenEndedQuestionRatingValidated');
    if(index>=0){
      return state.tabs[index].validity;
    }else{
      console.error('tabname cannot find')
    } 
    },
}

export const mutations = {
  /* set the tab validity expected obj is {tabName: string, valid: boolean }*/
  toggleNextTab(state,obj){
    const tabs = state.tabs;
    const index = tabs.findIndex((el) => el.tabName == obj.tabName);
    if(index>=0){
      if(obj.valid){
        state.tabs[index].validity = true;
        state.tabs[index].tempValidity = true;
        for(let i=index+1; i<tabs.length; i++){
          if(state.tabs[i].tempValidity){
            state.tabs[i].validity = true;
          }
        }
      }else{
        for(let i=index; i<tabs.length; i++){
          state.tabs[i].validity = false;
        }
      }
    }else{
      alert('oops something wrong')
    }
  },

  /* save the all data of forms to a one object */
  saveData(state,obj){
    state.form[obj.keyName] = obj.data;
  },

  /* saving the data for teh assets forms */
  saveAssetsData(state,obj){
    state.form.farmHouseholdAsset[obj.keyName] = obj.data;
  },
  
  /* test if the all forms are valid before submission */
  checkValidityAll(state){
    state.isAllValid = true;
    for(let i=0; i<state.tabs.length; i++){
      if(state.tabs[i].validity == false){
        state.isAllValid = false;
        return;
      }
    }
  }
}

export const actions = {
  async submitAll(context){
    console.log('this is the form: ',context.state.form)
    console.log('this is the tab details: ',context.state.tabs)
    context.commit('checkValidityAll')
    if(context.state.isAllValid){    
      try{
        await api.submitQuestionnaire(context.state.form);
      }catch(error){
        throw error
      }
    }else{
      throw new Error('incomplete forms')
    }
  }
}
