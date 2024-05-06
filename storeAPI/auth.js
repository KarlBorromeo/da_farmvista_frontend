// import axios from 'axios'
// const baseURL = process.env.baseUrlApi;

export async function login(credentials){
    try{
    //    const response = await axios.post(baseURL+'auth/login',credentials);
    //    return response.data;
       await new Promise(resolve => setTimeout(resolve,2000))
       throw new Error('Crendetials Error')
    }catch(error){
        console.log(error);
        throw error
        // console.error('error: ',error.response.data.message);
    }
}