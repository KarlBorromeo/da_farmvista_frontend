import * as api from '~/api/analytics.js'
export const state = () => ({
  demographics: {
    ageDistribution: {
      title: '',
      yLabel: '',
      series: [],
      categories: [],
      recommendation: '',
    },
    genderDistribution: {
      title: '',
      yLabel: '',
      series: [],
      categories: [],
      recommendation: '',
    },
    educationalBackgroundDistribution: {
      title: '',
      yLabel: '',
      series: [],
      categories: [],
      recommendation: '',
    },
    marginalizedSectorDistribution: {
      title: '',
      yLabel: '',
      series: [],
      categories: [],
      recommendation: '',
    },
    farmSourceIncomeDistribution: {
      title: '',
      yLabel: '',
      series: [],
      categories: [],
      recommendation: '',
    },
    householdExpenseDistribution: {
      title: '',
      yLabel: '',
      series: [],
      categories: [],
      recommendation: '',
    },
  },
})

export const getters = {
  demographics(state) {
    return state.demographics
  },
}

export const mutations = {
  saveDemographics(state, data) {
    state.demographics = data
  },
}
export const actions = {
  async fetchDemographics(context) {
    try {
      const res = await api.demographics()
      context.commit('saveDemographics', res)
    } catch (err) {
      throw err
    }
  },
}
