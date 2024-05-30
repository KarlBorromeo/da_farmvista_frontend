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
        let res = await Axios.patch('user/me/password',payload)
        console.log(res);
        return res;
    }catch(err){
        throw err
    }
}