import * as api from '../api/uploadFile'

export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async uploadSurveyFile(_, payload) {
    try {
      const res = await api.uploadSurveyFile(payload)
      return res
    } catch (error) {
      throw error
    }
  },
}
