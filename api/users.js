import Axios from '~/axios_config/Axios'

export async function fetchAllUsers(payload) {
  try {
    const params = {
      page: encodeURIComponent(payload.page - 1),
      limit: encodeURIComponent(payload.limit),
      search: payload.search ? payload.search : '',
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
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    await Axios.post('auth/register', credentials)
    return 'successfully user created'
  } catch (error) {
    if (Array.isArray(error.response.data.message)) {
      throw error.response.data.message[0]
    } else {
      throw error.response.data.message
    }
  }
}

export async function updateActiveStatus(id) {
  try {
    await Axios.patch(`user/status/${id}`)
    return 'successfully updated'
  } catch (error) {
    throw error
  }
}
