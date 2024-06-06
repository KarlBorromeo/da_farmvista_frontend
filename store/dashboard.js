import * as api from '../api/dashboard'
export const state = () => ({
  data: {
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
      categories: [],
      series: [],
    },
    totalFarmerCountByProvince: {
      series: [],
      labels: [],
      title: '',
      total: 0,
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
    }
  },
  timelineFrequencySelected: {},
  soldCommodityByProvinceSelected: {}
})

export const getters = {
  data(state) {
    return state.data
  },
  activeFarmersByProvince(state) {
    return state.data.activeFarmersByProvince
  },
  intervieweeStatusByProvince(state) {
    return state.data.intervieweeStatusByProvince
  },
  timelineFrequencySelected(state){
    return state.timelineFrequencySelected
  },
  soldCommodityByProvinceSelected(state){
    return state.soldCommodityByProvinceSelected
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
  /* update the Coffee Harvest Data when province is changed */
  changeSoldCommodityByProvinceSelected(state,province){
    const index = state.data.soldCommodityByProvince.data.findIndex(item => item.province === province)
    if(index>=0){
      state.soldCommodityByProvinceSelected = {...state.data.soldCommodityByProvince.data[index]}
    }
  }
}

export const actions = {
  async dashboardFetch(context) {
    try {
      const data = await api.dashboardFetch()
      context.commit('saveData', data)
      context.commit('initializeTimelineFrequencySelected',data)
      context.commit('initializeSoldCommodityByProvinceSelected',data)
    } catch (err) {
      throw err
    }
  },
}
