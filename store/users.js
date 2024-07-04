import * as api from '../api/users'

export const state = () => ({
  users: [],
  countPages: 1,
})

export const getters = {
  users(state) {
    return state.users
  },
  countPages(state) {
    return state.countPages
  },
}

export const mutations = {
  /* select  and extract specific key/values from the response and push it in our store */
  saveItems(state, users) {
    state.users = users
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
  /* update the active status in store */
  updateActiveStatus(state, id) {
    const index = state.users.findIndex((user) => user.id == id)
    console.log(index, state.users[index])
    if (index >= 0) {
      state.users[index].status = !state.users[index].status
    }
  },
}

export const actions = {
  /* fetch all users */
  async fetchAllUsers(context, payload) {
    try {
      const response = await api.fetchAllUsers(payload)
      context.commit('saveItems', response.data)
      context.commit('savePageLength', {
        length: response.count,
        limit: payload.limit,
      })
    } catch (error) {
      throw error
    }
  },

  /* create account */
  async createAccount(_, credentials) {
    try {
      let res = await api.createAccount(credentials)
      return res
    } catch (error) {
      throw error
    }
  },

  /* udpate the status */
  async updateActiveStatus(context, id) {
    try {
      let res = await api.updateActiveStatus(id)
      context.commit('updateActiveStatus', id)
      return res
    } catch (error) {
      throw error
    }
  },
}
