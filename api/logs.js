import Axios from "~/axios_config/Axios";

export async function fetchAllLogs(payload){
    const params = {
        page: encodeURIComponent(payload.page - 1),
        limit: encodeURIComponent(payload.limit),
      }
    try{
        const res = await Axios.get('activity',{
            params
        })
        return res.data;
    }catch(err){
        console.error(err);
        throw err
    }
}