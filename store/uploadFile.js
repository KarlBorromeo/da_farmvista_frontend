import * as api from '../storeAPI/uploadFile'

export const state = () => ({

})
  
export const getters = {

}

export const mutations = {

}

export const actions = {
    async uploadSurveyFile(_,file){
        try{
            const res = await api.uploadSurveyFile(file)
            return res;
        }catch(error){
            throw error;
        }
    }
}