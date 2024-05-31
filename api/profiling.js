import Axios from '~/axios_config/Axios'

export async function fetchAllRecords(payload) {
  try {
    const params = {
      type: encodeURIComponent(payload.type),
      page: encodeURIComponent(payload.page - 1),
      limit: encodeURIComponent(payload.limit),
    }
    const response = await Axios.get('survey', {
      params: params,
    })
    console.log(response.data)
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
    return 'Deleted succesfully'
  } catch (error) {
    throw error
  }
}
