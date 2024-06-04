import * as api from '../api/profile'
export const state = () => ({
    myProfileDetails: {},
    myAvatarUrl: ''
  })
  
export const getters = {
    myProfileDetails(state){
        return state.myProfileDetails
    },
    myAvatarUrl(state){
        return state.myAvatarUrl
    }
}

export const mutations = {
    setMyProfileDetails(state,details){
        state.myProfileDetails = details;
    },
    saveUrl(state,blob){
        state.myAvatarUrl = blob
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
    async updateProfileDetails(context, payload){
        try{
            await api.updateProfileDetails(payload)
            context.commit('setMyProfileDetails',payload)
            return 'Successfully updated'
        }catch(error){
            if(Array.isArray(error.response.data.message)){
                throw error.response.data.message[0]
            }
            throw error.response.data.message
        }
    },
    async updatePassword(_,payload){
        try{
            let res = await api.updatePassword(payload)
            return res
        }catch(error){
            throw error
        }
    },
    async getAvatarUrl(context){
        try{
            let res = await api.getAvatarUrl()
            context.commit('saveUrl',res)
        }catch(error){
            throw error
        }
    },
    async uploadAvatar(_,avatar){
        try{
            let res = await api.uploadAvatar(avatar)
            return res;
        }catch(error){
            throw error
        }
    }
}