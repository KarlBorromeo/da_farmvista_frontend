import * as api from '../api/profile'
export const state = () => ({
    myProfileDetails: {}
  })
  
export const getters = {
    myProfileDetails(state){
        return state.myProfileDetails
    }
}

export const mutations = {
    setMyProfileDetails(state,details){
        state.myProfileDetails = details;
    }
}

export const actions = {
    async fetchCurrenUserDetails(context){
        try{
            const res = await api.fetchCurrenUserDetails();
            context.commit('setMyProfileDetails',res)
        }catch(error){
            throw error
        }
    },
    async updatePassword(_,payload){
        try{
            let res = await api.updatePassword(payload)
            return res
        }catch(error){
            throw error
        }
    }
}