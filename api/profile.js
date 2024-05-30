import Axios from "~/axios_config/Axios";

export async function fetchCurrenUserDetails() {
    try{
        const params = {
            page: 0,
            limit: 0,
            isMe: true
        }
        const res = await Axios.get('user',{
            params
        })
        return res.data.data;
    }catch(error){
        console.error(error);
        throw error
    }
}

export async function updatePassword(payload) {
    try{
        await Axios.patch('user/me/password',payload)
        return 'password updated successfully';
    }catch(err){
        if(Array.isArray(err.response.data.message)){
            throw err.response.data.message[0]
        }
        throw err.response.data.message
    }
}