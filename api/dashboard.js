import Axios from '~/axios_config/Axios'

export async function dashboardFetch(commodity) {
  try {
    const params = {
      type: commodity,
    }
    const res = await Axios.get('analytics/dashboard', {
      params,
    })
    return res.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
