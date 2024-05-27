import Axios from '~/axios_config/Axios'

export async function submitQuestionnaire(payload) {
  try {
    const params = {
      type: encodeURIComponent(payload.type),
    }
    const response = await Axios.post('survey', payload.form, {
      params: params,
    })
    return response.data.message
  } catch (error) {
    if (Array.isArray(error.response.data.message)) {
      throw error.response.data.message[0]
    } else {
      throw error.response.data.message
    }
  }
}

export async function submitUpdate(payload){
  console.log('this is payload of submitupdate:',payload)
  try {
    await new Promise(resolve => setTimeout(resolve,5000))
    return 'successfully updated'
    // const response = await Axios.patch(`survey/${payload.id}`, payload.form,)
    // return response.data.message
  } catch (error) {
    if (Array.isArray(error.response.data.message)) {
      throw error.response.data.message[0]
    } else {
      throw error.response.data.message
    }
  }
}
