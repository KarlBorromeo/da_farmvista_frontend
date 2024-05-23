import Axios from '~/axios_config/Axios'

export async function login(credentials) {
  try {
    const response = await Axios.post('auth/login', credentials)
    return {
      accessToken: response.data.accessToken,
      type: response.data.type,
      firstName: response.data.firstName,
    }
  } catch (error) {
    console.error(error)
    throw error.response.data.message
  }
}
