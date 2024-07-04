import * as api from '../api/logs'

export const state = () => ({
  logs: [],
  countPages: 1,
})

export const getters = {
  logs(state) {
    return state.logs
  },
  countPages(state) {
    return state.countPages
  },
}

export const mutations = {
  /* select  and extract specific key/values from the response and push it in our store */
  saveItems(state, logs) {
    state.logs = logs
  },

  /* 
    calculate the total pages we have based on the length returned by the API and also the limit we assigned
    and set the pages the total of length / limit
  */
  savePageLength(state, obj) {
    if (obj.limit >= obj.length) {
      state.countPages = 1
    } else {
      state.countPages = Math.floor(obj.length / obj.limit)
      if (obj.length % obj.limit != 0) {
        state.countPages++
      }
    }
  },
}

export const actions = {
  /* fetch all logs */
  async fetchAllLogs(context, payload) {
    try {
      const response = await api.fetchAllLogs(payload)
      context.commit('saveItems', response.data)
      context.commit('savePageLength', {
        length: response.count,
        limit: payload.limit,
      })
    } catch (error) {
      throw error
    }
  },
}
