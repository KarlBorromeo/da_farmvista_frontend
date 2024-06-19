import Axios from "~/axios_config/Axios";

export async function dashboardFetch(){
    try{
        const params = {
            type: 'coffee'
          }
        const res = await Axios.get('analytics/dashboard',{
            params
        })
        return res.data.data
    }catch(error){
        console.error(error)
        throw error
    }
}