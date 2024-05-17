import Axios from "~/axios_config/Axios";

/* upload excel file */
export async function uploadSurveyFile(excelFile){
    console.log('file ni diri',excelFile);
    try{
        const formData = new FormData();
        formData.append('file', excelFile)
        const res = await Axios.post('survey/excel',formData)
        return res.data.message
    }catch(error){
        console.error(error);
        throw error;
    }
}