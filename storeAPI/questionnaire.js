import Axios from "~/axios_config/Axios";

export async function submitQuestionnaire(data){
    try{
        await Axios.post('survey',data)
    }catch(error){
        console.error(error);
        throw error
    }
}