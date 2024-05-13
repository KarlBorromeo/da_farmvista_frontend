import * as api from '../storeAPI/auth.js'
export const state = () => ({
  currentUser: {
    firstName: '',
  }
})

export const getters = {
  /* return first name of current user logged in */
  currentFirstName(state){
    return state.currentUser.firstName
  }
}

export const mutations = {
  /* save the user data to the local storage which will not be deleted after hard refresh*/
  saveUserDataToLocalStorage(_,userData){
    localStorage.setItem('token', userData.accessToken);
    localStorage.setItem('type',userData.type)
  },
  /* save the user data to the store which will be deleted if hard refresh */
  saveUserDataToStore(state,userData){
    console.log(userData);
    state.currentUser.firstName = userData.firstName;
  },
  /* delete the local storage details when logged out */
  logout(){
    localStorage.clear();
  }
}

export const actions = {
  async login(context, credentials) {
    try {
      const userData = await api.login(credentials)
      context.commit('saveUserDataToLocalStorage',userData)
      context.commit('saveUserDataToStore',userData)
    } catch (error) {
      throw error
    }
  },
}
