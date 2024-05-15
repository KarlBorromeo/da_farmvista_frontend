export const state = () => ({
  form: {
    SurveyInformation: {},
  },
  isSurveyInformationValidated: true,
  isBasicInformationValidated: true,
  isGeneralInformationValidated: true,
  isFamilyAffiliatedValidated: true,
  isFamilyIncomeValidated: true,
  isFarmIncomeValidated: true,
  isHouseholdExpensesValidated: true,
  isAssetsFarmToolsValidated: true,
  isAssetsFarmMachineryValidated: true,
  isAssetsFarmPoultryLivestockValidated: true,
  isAssetsFarmStructureValidated: true,
  isInformationDwellingPlaceValidated: true,
  isGeneralFarmingInformationValidated: true,
  isParcelInformationValidated: true,
  isDetailsCoffeeAreaValidated: true,
  isInfrastructureDistanceAccessibilityValidated: true,
  isFarmActivitiesValidated: true,
  isFarmWasteManagementValidated: true,
  isCroppingPatternCalendarValidated: true,
  isDetailsCoffeeProductionValidated: true,
  isLaborUtilizationOperationsValidated: true,
  isDetailWageOperationValidated: true,
  isCostInputsCoffeeValidated: true,
  isPestDamageObservedValidated: true,
  isPestManagementPracticeValidated: true,
  isCoffeeHarvestMarketingValidated: true,
  isTechAwarenessValidated: true,
  isInformationKnowledgeSourcesValidated: true,
  isOpenEndedQuestionsValidated: true,
  isOpenEndedQuestionRatingValidated: true,
})

export const getters = {
  SurveyInformationValidated(state) {
    return state.isSurveyInformationValidated
  },
  BasicInformationValidated(state){
    return state.isBasicInformationValidated
  },
  GeneralInformationValidated(state){
    return state.isGeneralInformationValidated
  },
  FamilyAffiliatedValidated(state){
    return state.isFamilyAffiliatedValidated
  },
  FamilyIncomeValidated(state){
    return state.isFamilyIncomeValidated
  },
  FarmIncomeValidated(state){
    return state.isFarmIncomeValidated
  },
  HouseholdExpensesValidated(state){
    return state.isHouseholdExpensesValidated
  },
  AssetsFarmToolsValidated(state){
    return state.isAssetsFarmToolsValidated
  },
  AssetsFarmMachineryValidated(state){
    return state.isAssetsFarmMachineryValidated
  },
  AssetsFarmPoultryLivestockValidated(state){
    return state.isAssetsFarmPoultryLivestockValidated
  },
  AssetsFarmStructureValidated(state){
    return state.isAssetsFarmStructureValidated
  },
  InformationDwellingPlaceValidated(state){
    return state.isInformationDwellingPlaceValidated
  },
  GeneralFarmingInformationValidated(state){
    return state.isGeneralFarmingInformationValidated
  },
  ParcelInformationValidated(state){
    return state.isParcelInformationValidated
  },
  DetailsCoffeeAreaValidated(state){
    return state.isDetailsCoffeeAreaValidated
  },
  InfrastructureDistanceAccessibilityValidated(state){
    return state.isInfrastructureDistanceAccessibilityValidated
  },
  FarmActivitiesValidated(state){
    return state.isFarmActivitiesValidated
  },
  FarmWasteManagementValidated(state){
    return state.isFarmWasteManagementValidated
  },
  CroppingPatternCalendarValidated(state){
    return state.isCroppingPatternCalendarValidated
  },
  DetailsCoffeeProductionValidated(state){
    return state.isDetailsCoffeeProductionValidated
  },
  LaborUtilizationOperationsValidated(state){
    return state.isLaborUtilizationOperationsValidated
  },
  DetailWageOperationValidated(state){
    return state.isDetailWageOperationValidated
  },
  CostInputsCoffeeValidated(state){
    return state.isCostInputsCoffeeValidated
  },
  PestDamageObservedValidated(state){
    return state.isPestDamageObservedValidated
  },
  PestManagementPracticeValidated(state){
    return state.isPestManagementPracticeValidated
  },
  CoffeeHarvestMarketingValidated(state){
    return state.isCoffeeHarvestMarketingValidated
  },
  TechAwarenessValidated(state){
    return state.isTechAwarenessValidated
  },
  InformationKnowledgeSourcesValidated(state){
    return state.isInformationKnowledgeSourcesValidated
  },
  OpenEndedQuestionsValidated(state){
    return state.isOpenEndedQuestionsValidated
  },
  OpenEndedQuestionRatingValidated(state){
    return state.isOpenEndedQuestionRatingValidated
  },
}

export const mutations = {
  /* set the Survey Information validation */
  SurveyInformationValidate(state, bool) {
    state.isSurveyInformationValidated = bool
  },
  /* save the Suvey Information data */
  SurveyInformation(state, data) {
    state.form.SurveyInformation = data
    console.log('state:', state.form)
  },
}

export const actions = {}
