import Axios from '~/axios_config/Axios';

/* fetch all the codes that were used in the questionnaire forms */
export async function fetchAllCodes(commodity) {
  const accessToken = localStorage.getItem('token');
  const encodedType = encodeURIComponent(commodity)
  try {
    const response = await Axios.get(`survey/codes?type=${encodedType}`)
    return response.data.data.codes;
  } catch (error) {
    throw error
  }
}
