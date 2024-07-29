import * as api from '../api/maps'
export const state = () => ({
  })
  
  export const getters = {
  }
  
  export const mutations = {
  }
  
  export const actions = {
    async geoserviceReq(){
        try{
            await api.geoserviceReq()
        }catch(err){
            throw err
        }
    },
    async featureReq(){
        try{
            await api.featureReq()
        }catch(err){
            console.error(err)
        }
    }
  }
  