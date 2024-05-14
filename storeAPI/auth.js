import axios from 'axios'
const baseURL = process.env.baseUrlApi

export async function login(credentials) {
  try {
    const response = await axios.post(baseURL + 'auth/login', credentials)
    console.log(response)
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
