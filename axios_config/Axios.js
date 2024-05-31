import axios from 'axios'
const Axios = axios.create({
  baseURL: process.env.baseUrlApi,
})

/* interceptors, executes before sending the request to backend */
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  config.headers.Authorization = `Bearer ${token}`
  return config
})

Axios.defaults.headers.common['ngrok-skip-browser-warning'] = false
Axios.defaults.withCredentials = true

/* interceptor, executes before the frontend application receives the response */
Axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    throw error
  }
)

export default Axios
