export const state = () => ({
  isFormOneValidated: false,
})

export const getters = {
  FormOneValidatedGetter(state) {
    return state.isFormOneValidated
  },
}

export const mutations = {
  toggleFormOneValdiation(state, bool) {
    console.log('toggled mutation')
    state.isFormOneValidated = bool
  },
}

export const actions = {}
