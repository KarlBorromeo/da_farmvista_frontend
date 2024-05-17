import Axios from "~/axios_config/Axios";

/* upload excel file */
export async function uploadSurveyFile(payload){
    try{
        const formData = new FormData();
        formData.append('file', payload.file)
        const res = await Axios.post(`survey/excel?type=${payload.type}`,formData)
        return res.data.message
    }catch(error){
        throw error.response.data.message;
    }
}