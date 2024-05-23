import Axios from '~/axios_config/Axios'

export async function submitQuestionnaire(payload) {
  try {
    const params = {
      type: encodeURIComponent(payload.type),
    }
    const response = await Axios.post('survey', payload.form,{
      params: params
    })
    return response.data.message
  } catch (error) {
    if(Array.isArray(error.response.data.message)){
      throw error.response.data.message[0]
    }else{
      throw error.response.data.message
    }
  }
}
