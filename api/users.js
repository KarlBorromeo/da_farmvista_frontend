import Axios from '~/axios_config/Axios'

export async function createAccount(credentials) {
  console.log(credentials)
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    await Axios.post('auth/register',credentials)
    return 'successfully user created'
  } catch (error) {
    throw error.response.data.message[0]
  }
}

export async function updateActiveStatus(payload){
  try{
    return 'successfully updated'
  }catch(error){
    throw error
  }
}
