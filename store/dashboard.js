import * as api from '../api/dashboard'
export const state = () => ({
    data:{
        activeFarmersByProvince:[
            {
                provinceName: 'Surigao Del Sur',
                count: 1222,
            },
            {
                provinceName: 'Surigao Del Norte',
                count: 86,
            },
            {
                provinceName: 'Agusan Del Sur',
                count: 712,

            },
            {
                provinceName: 'Agusan Del Norte',
                count: 787,
            },
            {
                provinceName: 'Province of Dinagat Island',
                count: 75,
            }
        ],
        intervieweeStatusByProvince: {
            title: 'Interviewee Status Population Comparison Per Minute',
            yLabel: 'Sample y axis title',
            categories: ['SDS','SDN','ADS','ADN','Dinagat'],
            series: [
                { name: 'Validated', data: [478, 13, 0, 26, 0]},
                { name: 'Declined', data: [547, 0, 15, 8, 15] },
                { name: 'Not Validated', data: [478, 15, 0, 26, 0]},
                { name: 'Diseased', data: [547, 26, 0, 8, 0] },
                { name: 'Not Present', data: [478, 0, 0, 26, 15]}
            ],
        },
        totalFarmerCountByProvince:{
            series: [
                31,
                1,
                0,
                9,
                0
            ],
            labels: [
                "SDS",
                "SDN",
                "ADS",
                "ADN",
                "PDI"
            ],
            title: "Total Profiles with Interview Data by Province",
            total: 41
        }
    }
})
  
export const getters = {
    data(state){
        return state.data
    },
    activeFarmersByProvince(state){
        return state.data.activeFarmersByProvince
    },
    intervieweeStatusByProvince(state){
        return state.data.intervieweeStatusByProvince

    }
}
  
export const mutations = {
    saveData(state,data){
        state.data = {...data}
    }
}
  
export const actions = {
    async dashboardFetch(context){
        try{
            const data = await api.dashboardFetch()
            context.commit('saveData',data)
        }catch(err){
            throw err
        }
    }
}