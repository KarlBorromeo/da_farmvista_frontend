import Axios from "~/axios_config/Axios";

export async function fetchAllLogs(payload){
    alert('fetching logs from api')
    try{
        // const res = await Axios.get('')
        await new Promise(resolve=> setTimeout(resolve,2000))
    }catch(err){
        console.error(err);
        throw err
    }
}