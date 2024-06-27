import Axios from '~/axios_config/Axios'

export async function login(credentials) {
  try {
    const response = await Axios.post('auth/login', credentials)
    return {
      accessToken: response.data.accessToken,
      type: response.data.type,
      firstName: response.data.firstName,
      avatarURL: response.data.avatarURL
    }
  } catch (error) {
    console.error(error)
    throw error.response.data.message
  }
}

export async function checkTokenAlive(){
  try{
    await Axios.get('auth/check')
  }catch(error){
    throw error.response.data.code
  }
}
