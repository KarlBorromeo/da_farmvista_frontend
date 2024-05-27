import Axios from '~/axios_config/Axios'

export async function createAccount(credentials) {
  console.log(credentials)
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    const res = await Axios.post('auth/register',credentials)
    console.log(res);
  } catch (error) {
    throw error.response.data.message
  }
}
