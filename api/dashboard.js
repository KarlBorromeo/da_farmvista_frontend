import Axios from "~/axios_config/Axios";

export async function dashboardFetch(){
    try{
        const params = {
            type: 'coffee'
          }
        const res = await Axios.get('analytics/dashboard',{
            params
        })
        
        console.log('resulttttt!:',res.data.data)
        return res.data.data
    }catch(error){
        console.error(error)
    }
}