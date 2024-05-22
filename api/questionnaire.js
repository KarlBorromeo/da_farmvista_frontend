import Axios from '~/axios_config/Axios'

export async function submitQuestionnaire(payload) {
  try {
    const params = {
      type: encodeURIComponent(payload.type),
    }
    console.log(payload.type)
    await Axios.post('survey', payload.form,{
      params: params
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
