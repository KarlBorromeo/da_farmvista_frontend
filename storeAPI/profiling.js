import Axios from "~/axios_config/Axios";

export async function fetchRecords(payload){
    try{
        const params = {
            type: encodeURIComponent(payload.type),
            page: encodeURIComponent(payload.page),
            limit: encodeURIComponent(payload.limit)
        }
        const response = await Axios.get('survey',{
            params: params
        })
        return response.data
    }catch(error){
        throw error.response.data.message
    }
}