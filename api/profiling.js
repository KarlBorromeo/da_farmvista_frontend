import Axios from '~/axios_config/Axios'

export async function fetchAllRecords(payload) {
  try {
    console.log(payload)
    const params = {
      type: encodeURIComponent(payload.type),
      page: encodeURIComponent(payload.page - 1),
      limit: encodeURIComponent(payload.limit),
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
    await new Promise((resolve) => setTimeout(resolve, 5000))
    // return 'Deleted succesfully'
    throw new Error('unaothorized')
  } catch (error) {
    throw error
  }
}
