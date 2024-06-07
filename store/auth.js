import * as api from '../api/auth.js'
export const state = () => ({
  currentUserLoggedin: false,
  currentUser: {
    firstName: '',
    type: '',
  },
})

export const getters = {
  /* return first name of current user logged in */
  currentFirstName(state) {
    return state.currentUser.firstName
  },
  /* return boolean if the user is loggedin */
  userLoggedin(state) {
    return state.currentUserLoggedin
  },
  /* return firstname */
}

export const mutations = {
  /* save the user data to the local storage which will not be deleted after hard refresh*/
  saveUserDataToLocalStorage(state, userData) {
    state.currentUser.firstName = userData.firstName
    localStorage.setItem('token', userData.accessToken)
    localStorage.setItem('type', userData.type)
    localStorage.setItem('firstname', userData.firstName)
  },
  /* save the user data to the store which will be deleted if hard refresh */
  updateFirstname(state, firstname) {
    localStorage.setItem('firstname', firstname)
    state.currentUser.firstName = firstname
  },
  /* delete the local storage details when logged out */
  logout() {
    localStorage.clear()
  },
  /* check if there is already userData at the local storage when hard refreshed */
  getUserDataFromLocalStorage(state) {
    const token = localStorage.getItem('token')
    const type = localStorage.getItem('type')
    const firstname = localStorage.getItem('firstname')
    if (!token || !type) {
      
      state.currentUserLoggedin = false
    } else {  
      state.currentUserLoggedin = true
      state.currentUser.firstName = firstname
    }
  },
}

export const actions = {
  async login(context, credentials) {
    try {
      const userData = await api.login(credentials)
      context.commit('saveUserDataToLocalStorage', userData)
      // context.commit('saveUserDataToStore', userData)
    } catch (error) {
      throw error
    }
  },
}
