export const state = () => ({
  pageName: 'initialPagename',
})

export const getters = {
  pageNameGetter(state) {
    return state.pageName
  },
}

export const mutations = {
  udpateHeaderTitle(state, pageName) {
    state.pageName = pageName
  },
}

export const actions = {}
