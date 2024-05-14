import * as api from '../storeAPI/auth.js'
export const state = () => ({
  currentUserLoggedin: false,
  currentUser: {
    firstName: '',
  }
})

export const getters = {
  /* return first name of current user logged in */
  currentFirstName(state){
    return state.currentUser.firstName
  },
  /* return boolean if the user is loggedin */
  userLoggedin(state){
    return state.currentUserLoggedin
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
    state.currentUser.firstName = userData.firstName;
  },
  /* delete the local storage details when logged out */
  logout(){
    localStorage.clear();
  },
  /* check if there is already userData at the local storage when hard refreshed */
  getUserDataFromLocalStorage(state){
    const token = localStorage.getItem('token')
    const type = localStorage.getItem('type')
    if(!token || !type){
      state.currentUserLoggedin = false;
    }else{
      state.currentUserLoggedin = true
    }
  }
}

export const actions = {
  async login(context, credentials) {
    try {
      // const userData = await api.login(credentials)
      const userData = {
        accessToken: 'fdsafdsa12312',
        type: 'superadming',
        firstName: 'ed wawa'
      }
      context.commit('saveUserDataToLocalStorage',userData)
      context.commit('saveUserDataToStore',userData)
    } catch (error) {
      throw error
    }
  },
}
