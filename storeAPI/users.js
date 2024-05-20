import Axios from "~/axios_config/Axios";

export async function createAccount(credentials){
    try{
        console.log(credentials)
        await new Promise(resolve => setTimeout(resolve,1000))
        throw new Error('sample error')
        // await Axios.post('auth/register',credentials)
    }catch(error){
        throw error;
        // throw error.response.data.message
    }
}