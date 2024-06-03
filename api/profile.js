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
        console.error(error)
        throw error
    }
}

export async function updatePassword(payload) {
    try{
        await Axios.patch('user/me/password',payload)
        return 'password updated successfully';
    }catch(error){
        if(Array.isArray(error.response.data.message)){
            throw error.response.data.message[0]
        }
        throw error.response.data.message
    }
}

export async function updateProfileDetails(payload) {
    try{
        await Axios.patch('user/me',payload)
    }catch(error){
        console.error(error)
        throw error
    }
}

export async function getAvatarUrl(){
    try{
        const res = await Axios.get('https://e974-103-80-142-50.ngrok-free.app/api/v1/user/9df8a345-8d49-4d48-8121-ce46479cb062/avatar',{
            responseType: 'blob'
        })
        const blob = new Blob([res.data], { type: 'image/png' });
        const url = URL.createObjectURL(blob)
        return url;
    }catch(err){
        console.error(err)
    }
}