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
    soldCommodityByProvince: {
      title: '',
      yLabel: '',
      provinces: [],
      data: [],
    },    
    marketingOutletFarmerCount: {},
    timelineFrequencyOfHarvestPerYear: {
      yLabel: '',
      title: '',
      categories: [],
      data: [],
      years: [],
    },
    haveHeardFarmTechFarmerCount: {
      title: '',
      data: []
    },    
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
    ],
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
    ]

  },
 
  
  intervieweeStatusByProvinceSelected: {},
  totalFarmerCountByProvinceSelected: {},
  soldCommodityByProvinceSelected: {},
  marketingOutletFarmerCountSelected: {}, //TODO: this is for donut outlet farmer
  timelineFrequencySelected: {},
  haveHeardFarmTechFarmerCountSelected: {},
  marketingOutletInfoSelected: [],
  farmOrganizationFarmerCountSelected: [],

  
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
  marketingOutletFarmerCountSelected(state){
    return state.marketingOutletFarmerCountSelected
  },
  timelineFrequencySelected(state){
    return state.timelineFrequencySelected
  },
  haveHeardFarmTechFarmerCountSelected(state){
    return state.haveHeardFarmTechFarmerCountSelected
  },
  marketingOutletInfoSelected(state){
    return state.marketingOutletInfoSelected
  },
  farmOrganizationFarmerCountSelected(state){
    return state.farmOrganizationFarmerCountSelected
  }
}

export const mutations = {
  saveData(state, data) {
    state.data = { ...data }
  },
  /* intialize the intervieweeStatusByProvinceSelected Data */
  inititializeIntervieweeStatusByProvince(state,data){
    if(data.intervieweeStatusByProvince.data.length>0){
      state.intervieweeStatusByProvinceSelected = data.intervieweeStatusByProvince.data[0]
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
  /* intialize the marketingOutletFarmerCountSelected Data */
  inititializeMarketingOutletFarmerCount(state,data){
    if(data.marketingOutletFarmerCount.data.length>0){
      state.marketingOutletFarmerCountSelected = data.marketingOutletFarmerCount.data[0]
    }else{
      state.marketingOutletFarmerCountSelected = {
        title: '',
        data: []
      }
    }
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
  /* initialize the marketingOutletInfoSelected Data */
  initializeMarketingOutletInfoSelected(state,data){
    if(data.marketingOutletInfo.length>0){
      state.marketingOutletInfoSelected = data.marketingOutletInfo[0]
    }else{
      state.marketingOutletInfoSelected = {
        province: '',
        data: []
      }
    }
  },
  /* intialize the farmOrganizationFarmerCountSelected Data */
  inititializeFarmOrganizationFarmerCount(state,data){
    if(data.farmOrganizationFarmerCount.length>0){
      state.farmOrganizationFarmerCountSelected = data.farmOrganizationFarmerCount[0]
    }else{
      state.farmOrganizationFarmerCountSelected = []
    }
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
    let index;
    if(!!obj.isTable){
      index = state.data[obj.stateName].findIndex(item => item.province === obj.province)
      let tempArr = [...state.data[obj.stateName]]
      state[obj.stateNameSelected] = tempArr[index]
    }else{
      index = state.data[obj.stateName].data.findIndex(item => item.province === obj.province)
      state[obj.stateNameSelected] = {...state.data[obj.stateName].data[index]}
    }
  },
  /* update the chart data of Coffee Production when year is changed */
  changeTimelineFrequencySelected(state,year){
    const index = state.data.timelineFrequencyOfHarvestPerYear.data.findIndex(item => item.year === year)
    if(index>=0){
      state.timelineFrequencySelected = {...state.data.timelineFrequencyOfHarvestPerYear.data[index]}
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
      context.commit('inititializeMarketingOutletFarmerCount',data)
      context.commit('initializeTimelineFrequencySelected',data)
      context.commit('inititializeHaveHeardFarmTechFarmerCount',data)
      context.commit('initializeMarketingOutletInfoSelected',data)
      context.commit('inititializeFarmOrganizationFarmerCount',data)
    } catch (err) {
      throw err
    }
  },
}
