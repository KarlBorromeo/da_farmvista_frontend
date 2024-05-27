import * as api from '../api/users'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async createAccount(_, credentials) {
    try {
      let res = await api.createAccount(credentials)
      return res;
    } catch (error) {
      throw error
    }
  },
}
