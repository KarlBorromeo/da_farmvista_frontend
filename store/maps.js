import * as api from '../api/maps'
export const state = () => ({
    layer: ''
  })
  
  export const getters = {
    layer(state){
        return state.layer
    }
  }
  
  export const mutations = {
    saveLayer(state,data){
        state.layer = data
    }
  }
  
  export const actions = {
    async geoserviceReq(){
        try{
            // await api.geoserviceReq()
        }catch(err){
            throw err
        }
    },
    async featureReq(){
        try{
            // await api.featureReq()
        }catch(err){
            console.error(err)
        }
    },
    async geoLayerReq(context,layer){
        try{
            const geojson = await api.geoLayerReq(layer)
            context.commit('saveLayer',geojson)
        }catch(err){
            console.error(err)
        }
    }
  }
  