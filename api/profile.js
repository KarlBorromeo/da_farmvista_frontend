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

export async function uploadAvatar(avatar){
    try{
        const formData = new FormData()
        formData.append('avatar', avatar)
        await Axios.patch('user/me/avatar',formData)
        return 'succesfully uploaded'
    }catch(err){
        throw err
    }
}