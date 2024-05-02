import * as api from '../storeAPI/auth.js';
export const state = () => ({
    counter: 0
  })
  
export const getters = {
    getCounter(state) {
        return state.counter
    }
}
  
export const mutations = {
    increment(state) {
        state.counter++
    }
}

export const actions = {
    async login(context,credentials){
        try{
            await api.login(credentials);
        }catch(error){
            
        }
        
    },
    async register(context,crendentials){
        try{
            await api.register(crendentials)
        }catch(error){
            
        }
    }
}