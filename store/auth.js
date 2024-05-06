import * as api from '../storeAPI/auth.js'
export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async login(__, credentials) {
    console.log('credentials: ', credentials)
    try {
      await api.login(credentials)
    } catch (error) {
      console.log(error)
      throw error
    }
  },
}
