export const state = () => ({
  form: {
    SurveyInformation: {},
  },
  isSurveyInformationValidated: false,
})

export const getters = {
  SurveyInformationValidated(state) {
    return state.isSurveyInformationValidated
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
