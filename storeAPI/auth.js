import axios from 'axios'
const baseURL = process.env.baseUrlApi;

export async function login(credentials){
    try{
       const response = await axios.post(baseURL+'auth/login',credentials);
       console.log(response.data);
       return response.data;
    }catch(error){
        console.error('error: ',error.response.data.message);
    }
}

export async function register(credentials){
    try{
       const response = await axios.post(baseURL+'auth/register',credentials);
       console.log(response.data);
       return response.data;
    }catch(error){
        console.error('error: ',error.response.data.message);
    }
}