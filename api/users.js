import Axios from '~/axios_config/Axios'

export async function fetchAllUsers(payload){
  try {
    console.log(payload)
    const params = {
      page: encodeURIComponent(payload.page - 1),
      limit: encodeURIComponent(payload.limit),
    }
    const response = await Axios.get('user', {
      params: params,
    })
    return response.data
  } catch (error) {
    throw error.response.data.message
  }
}

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

export async function updateActiveStatus(id){
  console.log('id in the api: ',id)
  try{
    await Axios.patch(`user/status/${id}`)
    return 'successfully updated'
  }catch(error){
    throw error
  }
}
