import * as api from '../api/users'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async createAccount(_, credentials) {
    try {
      await api.createAccount(credentials)
    } catch (error) {
      throw error
    }
  },
}
