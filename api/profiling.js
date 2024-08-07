import Axios from '~/axios_config/Axios'

export async function fetchAllRecords(payload) {
  try {
    const params = {
      type: encodeURIComponent(payload.type),
      page: encodeURIComponent(payload.page - 1),
      limit: encodeURIComponent(payload.limit),
      search: payload.search ? payload.search : '',
    }
    const response = await Axios.get('survey', {
      params: params,
    })
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

export async function fetchSingleSurvey(payload) {
  try {
    const params = {
      type: encodeURIComponent(payload.type),
      page: 0,
      limit: 0,
    }
    const response = await Axios.get(`survey/${payload.id}`, {
      params: params,
    })
    return response.data.data
  } catch (error) {
    throw error.response.data.message
  }
}

export async function deleteSurvey(id) {
  try {
    const res = await Axios.delete(`survey/${id}`)
    return 'Deleted successfully'
  } catch (error) {
    throw error
  }
}
