import * as api from '../api/maps'
export const state = () => ({
    layer: '',
    featureDetails: {}
  })
  
  export const getters = {
    featureDetails(state){
        return state.featureDetails
    },
    layer(state){
        return state.layer
    }
  }
  
  export const mutations = {
    saveLayer(state,data){
        state.layer = data
    },
    saveFeatureDetails(state,data){
        state.featureDetails = data
    }
  }
  
  export const actions = {
    async featureReq(context,obj){
        try{
            const data = await api.featureReq(obj)
            context.commit('saveFeatureDetails',data)
        }catch(err){
            console.error(err)
        }
    },
    async geoLayerReq(context,obj){
        try{
            const geojson = await api.geoLayerReq(obj)
            context.commit('saveLayer',geojson)
        }catch(err){
            console.error(err)
        }
    }
  }
  