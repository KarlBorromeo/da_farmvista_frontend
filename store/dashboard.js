import * as api from '../api/dashboard'
export const state = () => ({
  data: {
    provinces: [],
    activeFarmersByProvince: [
      {
        provinceName: 'Surigao Del Sur',
        count: 0,
      },
      {
        provinceName: 'Surigao Del Norte',
        count: 0,
      },
      {
        provinceName: 'Agusan Del Sur',
        count: 0,
      },
      {
        provinceName: 'Agusan Del Norte',
        count: 0,
      },
      {
        provinceName: 'Province of Dinagat Island',
        count: 0,
      },
    ],
    intervieweeStatusByProvince: {
      title: '',
      yLabel: '',
      data: []
    },
    totalFarmerCountByProvince: {
      title: '',
      subtitle: '',
      total: 40,
      data: []
    },
    timelineFrequencyOfHarvestPerYear: {
      yLabel: '',
      title: '',
      categories: [],
      data: [],
      years: [],
    },
    soldCommodityByProvince: {
      title: '',
      yLabel: '',
      provinces: [],
      data: [],
    },
    haveHeardFarmTechFarmerCount: {
      title: '',
      data: []
    },
    farmOrganizationFarmerCount: [
      {
        name: "Adisffamco",
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: "active",
        type: "Aubrey"
      },
      {
        name: "Adisffamco",
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: "active",
        type: "Cooperative"
      },
      {
        name: "Agricultural Upland Farmers Association",
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: "active",
        type: "Association"
      },
      {
        name: "Agricultural Upland Farmers Association",
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: "active",
        type: "Aubrey"
      },
      {
        name: "Babuyan Farmers Developers Core Group Incorporated (Bafamdcgi)",
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: "active",
        type: "Cooperative"
      },
      {
        name: "Barcapa",
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: "active",
        type: "Association"
      }
    ],
    marketingOutletInfo: [
      {
        name: "Local/ Ambulant Buyer",
        qualityPreference: [
            "Grade 3"
        ],
        howBringToOutlet: "Own Funds",
        count: 1
      },
      {
        name: "Tagbina",
        qualityPreference: [
              "Grade 1",
              "Grade 1 And 2",
              "Grade 2",
              "Grading 2"
          ],
        howBringToOutlet: "Own Funds",
        count: 14
      },
    ]
  },
 
  
  intervieweeStatusByProvinceSelected: {},
  totalFarmerCountByProvinceSelected: {},
  soldCommodityByProvinceSelected: {},
  // TODO: 
  marketingOutletFarmerCountSelected: {},
  timelineFrequencySelected: {},
  haveHeardFarmTechFarmerCountSelected: {},
  farmOrganizationFarmerCountSelected: {},
  
})

export const getters = {
  data(state) {
    return state.data
  },
  activeFarmersByProvince(state) {
    return state.data.activeFarmersByProvince
  },
  intervieweeStatusByProvinceSelected(state) {
    return state.intervieweeStatusByProvinceSelected
  },
  totalFarmerCountByProvinceSelected(state){
    return state.totalFarmerCountByProvinceSelected
  },
  soldCommodityByProvinceSelected(state){
    return state.soldCommodityByProvinceSelected
  },
  // TODO: write here the outalet market population
  timelineFrequencySelected(state){
    return state.timelineFrequencySelected
  },
  haveHeardFarmTechFarmerCountSelected(state){
    return state.haveHeardFarmTechFarmerCountSelected
  }

}

export const mutations = {
  saveData(state, data) {
    state.data = { ...data }
  },
  /* initialize the chart data of Coffee Production */
  initializeTimelineFrequencySelected(state,data){
    if(data.timelineFrequencyOfHarvestPerYear.data.length>0){
      state.timelineFrequencySelected = data.timelineFrequencyOfHarvestPerYear.data[0]
    }else{
      state.timelineFrequencySelected = {
        year: '',
        series: []
      }
    }
  },
  /* update the chart data of Coffee Production when year is changed */
  changeTimelineFrequencySelected(state,year){
    const index = state.data.timelineFrequencyOfHarvestPerYear.data.findIndex(item => item.year === year)
    if(index>=0){
      state.timelineFrequencySelected = {...state.data.timelineFrequencyOfHarvestPerYear.data[index]}
    }
  },
  /* initialize the Coffee Harvest Data */
  initializeSoldCommodityByProvinceSelected(state,data){
    if(data.soldCommodityByProvince.data.length>0){
      state.soldCommodityByProvinceSelected = data.soldCommodityByProvince.data[0]
    }else{
      state.soldCommodityByProvinceSelected = {
        province: '',
        series: [],
        categories: []
      }
    }
  },

  /* intialize the intervieweeStatusByProvinceSelected Data */
  inititializeIntervieweeStatusByProvince(state,data){
    if(data.intervieweeStatusByProvince.data.length>0){
      state.intervieweeStatusByProvinceSelected = data.intervieweeStatusByProvince.data[0]
      console.log('inteview status selected: ',state.intervieweeStatusByProvinceSelected)
    }else{
      state.intervieweeStatusByProvinceSelected = {
        province: '',
        series: [],
        categories: []
      }
    }
  },
  /* intialize the totalFarmerCountByProvinceSelected Data */
  inititializeTotalFarmerCountByProvince(state,data){
    if(data.totalFarmerCountByProvince.data.length>0){
      state.totalFarmerCountByProvinceSelected = data.totalFarmerCountByProvince.data[0]
    }else{
      state.totalFarmerCountByProvinceSelected = {
        province: '',
        series: [],
        categories: []
      }
    }
  },
    //TODO:
  /* intialize the haveHeardFarmTechFarmerCountSelected Data */
  inititializeHaveHeardFarmTechFarmerCount(state,data){
    if(data.haveHeardFarmTechFarmerCount.data.length>0){
      state.haveHeardFarmTechFarmerCountSelected = data.haveHeardFarmTechFarmerCount.data[0]
    }else{
      state.haveHeardFarmTechFarmerCountSelected = {
        province: '',
        percentage: 0
      }
    }
  },
  /* intialize the farmOrganizationFarmerCountSelected Data */
  inititializeFarmOrganizationFarmerCount(state,data){

  },
  /* intialize the marketingOutletFarmerCountSelected Data */
  inititializeMarketingOutletFarmerCount(state,data){

  },
  /* 
    updates the state values dynamically if the province was changed,
    obj = {
      province: ''  #province name here
      stateName: '' #dynamic state key
      stateNameSelected: '' #dynamic state key selected
    } 
  */
  changeProvince(state,obj){
    const index = state.data[obj.stateName].data.findIndex(item => item.province === obj.province)
    if(index>=0){
      state[obj.stateNameSelected] = {...state.data[obj.stateName].data[index]}
    }
  }
}

export const actions = {
  async dashboardFetch(context) {
    try {
      const data = await api.dashboardFetch()
      context.commit('saveData', data)
      context.commit('inititializeIntervieweeStatusByProvince',data)
      context.commit('inititializeTotalFarmerCountByProvince',data)
      context.commit('initializeSoldCommodityByProvinceSelected',data)
      //TODO:
      context.commit('initializeTimelineFrequencySelected',data)
      context.commit('inititializeHaveHeardFarmTechFarmerCount',data)
    } catch (err) {
      throw err
    }
  },
}
