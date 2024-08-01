import Axios from '~/axios_config/Axios'

export async function demographics(commodity) {
  try {
    const params = {
      type: commodity,
    }
    const res = await Axios.get('analytics/demographics', {
      params,
    })
    return res.data
  } catch (err) {
    throw err
  }
}
