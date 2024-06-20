import Axios from "~/axios_config/Axios";

export async function demographics(){
    try{
        const params = {
            type: 'coffee',
        }
        const res = await Axios.get('analytics/demographics',{
            params
        })
        return res.data
    }catch(err){
        console.err(err)
    }
}