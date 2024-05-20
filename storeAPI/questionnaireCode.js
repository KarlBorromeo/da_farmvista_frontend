import Axios from '~/axios_config/Axios'

/* fetch all the codes that were used in the questionnaire forms */
export async function fetchAllCodes(commodity) {
  const params = {
    type: encodeURIComponent(commodity),
  }
  try {
    const response = await Axios.get(`survey/codes`, {
      params: params,
    })
    return response.data.data.codes
  } catch (error) {
    throw error
  }
}
