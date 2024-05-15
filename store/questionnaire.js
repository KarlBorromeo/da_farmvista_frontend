export const state = () => ({
  form: {},
  tabs: [
    {tabName: 'SurveyInformationValidated',validity: false},
    {tabName: 'BasicInformationValidated',validity: false},
    {tabName: 'GeneralInformationValidated',validity: false},
    {tabName: 'FamilyAffiliatedValidated',validity: false},
    {tabName: 'FamilyIncomeValidated',validity: false},
    {tabName: 'FarmIncomeValidated',validity: false},
    {tabName: 'HouseholdExpensesValidated',validity: false},
    {tabName: 'AssetsFarmToolsValidated',validity: false},
    {tabName: 'AssetsFarmMachineryValidated',validity: false},
    {tabName: 'AssetsFarmPoultryLivestockValidated',validity: false},
    {tabName: 'AssetsFarmStructureValidated',validity: false},
    {tabName: 'InformationDwellingPlaceValidated',validity: false},
    {tabName: 'GeneralFarmingInformationValidated',validity: false},
    {tabName: 'ParcelInformationValidated',validity: false},
    {tabName: 'DetailsCoffeeAreaValidated',validity: false},
    {tabName: 'InfrastructureDistanceAccessibilityValidated',validity: false},
    {tabName: 'FarmActivitiesValidated',validity: false},
    {tabName: 'FarmWasteManagementValidated',validity: false},
    {tabName: 'CroppingPatternCalendarValidated',validity: false},
    {tabName: 'DetailsCoffeeProductionValidated',validity: false},
    {tabName: 'LaborUtilizationOperationsValidated',validity: false},
    {tabName: 'DetailWageOperationValidated',validity: false},
    {tabName: 'CostInputsCoffeeValidated',validity: false},
    {tabName: 'PestDamageObservedValidated',validity: false},
    {tabName: 'PestManagementPracticeValidated',validity: false},
    {tabName: 'CoffeeHarvestMarketingValidated',validity: false},
    {tabName: 'TechAwarenessValidated',validity: false},
    {tabName: 'InformationKnowledgeSourcesValidated',validity: false},
    {tabName: 'OpenEndedQuestionsValidated',validity: false},
    {tabName: 'OpenEndedQuestionRatingValidated',validity: false}
  ]
})

export const getters = {
  SurveyInformationValidated(state) {
    const index = state.tabs.findIndex( el => el.tabName == 'SurveyInformationValidated');
    console.log(state.tabs[index].validity,'index getter: ',index)
    return state.tabs[index].validity;
    
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
    console.log('index: ',index)
    console.log(state.tabs[index])
    if(index>=0){
      if(obj.valid){
        console.log('e set to true')
        state.tabs[index].validity = true;
      }else{
        console.log('e set t f')
        for(let i=index; i<tabs.length; i++){
          state.tabs[i].validity = false;
        }
      }
    }else{
      alert('oops something wrong')
    }
    console.log('again: ',state.tabs[index])
  },

  /* save the all data of forms to a one object */
  saveData(state,obj){
    state.form[obj.keyName] = obj.data;
    console.log(state.form)
  }

}

export const actions = {}
