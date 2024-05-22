import Axios from '~/axios_config/Axios'

export async function login(credentials) {
  try {
    const response = await Axios.post('auth/login', credentials)
    return {
      accessToken: 'fdsa',
      type: 'fdsaf',
      firstName:  'fdsaf',
    }
  } catch (error) {
    console.error(error)
    throw error.response.data.message
  }
}
