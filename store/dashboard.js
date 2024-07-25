import * as api from '../api/dashboard'
export const state = () => ({
  data: {
    provinces: [],
    farmersCountByProvince: [
      {
        provinceName: 'Surigao Del Sur',
        activeCount: 0,
        inactiveCount: 0
      },
      {
        provinceName: 'Surigao Del Norte',
        activeCount: 0,
        inactiveCount: 0
      },
      {
        provinceName: 'Agusan Del Sur',
        activeCount: 0,
        inactiveCount: 0
      },
      {
        provinceName: 'Agusan Del Norte',
        activeCount: 0,
        inactiveCount: 0
      },
      {
        provinceName: 'Province of Dinagat Island',
        activeCount: 0,
        inactiveCount: 0
      },
    ],
    profileStatusCountByProvince: {
      title: '',
      yLabel: '',
      data: [],
      recommendation: ''
    },
    activeFarmerCountByProvince: {
      title: '',
      subtitle: '',
      total: 40,
      data: [],
    },
    soldCoffeeVarietyByProvince: {
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
      data: [],
    },
    marketingOutletInfo: [
      {
        name: 'Local/ Ambulant Buyer',
        qualityPreference: ['Grade 3'],
        howBringToOutlet: 'Own Funds',
        count: 1,
      },
      {
        name: 'Tagbina',
        qualityPreference: ['Grade 1', 'Grade 1 And 2', 'Grade 2', 'Grading 2'],
        howBringToOutlet: 'Own Funds',
        count: 14,
      },
    ],
    farmOrganizationFarmerCount: [
      {
        name: 'Adisffamco',
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: 'active',
        type: 'Aubrey',
      },
      {
        name: 'Adisffamco',
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: 'active',
        type: 'Cooperative',
      },
      {
        name: 'Agricultural Upland Farmers Association',
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: 'active',
        type: 'Association',
      },
      {
        name: 'Agricultural Upland Farmers Association',
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: 'active',
        type: 'Aubrey',
      },
      {
        name: 'Babuyan Farmers Developers Core Group Incorporated (Bafamdcgi)',
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: 'active',
        type: 'Cooperative',
      },
      {
        name: 'Barcapa',
        activeFarmerCount: 1,
        inactiveFarmerCount: 0,
        allFarmerCount: 1,
        status: 'active',
        type: 'Association',
      },
    ],
  },

  profileStatusCountByProvinceSelected: {},
  activeFarmerCountByProvinceSelected: {},
  soldCoffeeVarietyByProvinceSelected: {},
  marketingOutletFarmerCountSelected: {},
  timelineFrequencySelected: {},
  haveHeardFarmTechFarmerCountSelected: {},
  marketingOutletInfoSelected: [],
  farmOrganizationFarmerCountSelected: [],
})

export const getters = {
  data(state) {
    return state.data
  },
  farmersCountByProvince(state) {
    return state.data.farmersCountByProvince
  },
  profileStatusCountByProvinceSelected(state) {
    return state.profileStatusCountByProvinceSelected
  },
  activeFarmerCountByProvinceSelected(state) {
    return state.activeFarmerCountByProvinceSelected
  },
  soldCoffeeVarietyByProvinceSelected(state) {
    return state.soldCoffeeVarietyByProvinceSelected
  },
  marketingOutletFarmerCountSelected(state) {
    return state.marketingOutletFarmerCountSelected
  },
  timelineFrequencySelected(state) {
    return state.timelineFrequencySelected
  },
  haveHeardFarmTechFarmerCountSelected(state) {
    return state.haveHeardFarmTechFarmerCountSelected
  },
  marketingOutletInfoSelected(state) {
    return state.marketingOutletInfoSelected
  },
  farmOrganizationFarmerCountSelected(state) {
    return state.farmOrganizationFarmerCountSelected
  },
}

export const mutations = {
  saveData(state, data) {
    console.log(data)
    state.data = { ...data }
  },
  /* intialize the profileStatusCountByProvinceSelected Data */
  inititializeProfileStatusCountByProvince(state, data) {
    if (data.profileStatusCountByProvince.data.length > 0) {
      state.profileStatusCountByProvinceSelected = {
        ...data.profileStatusCountByProvince.data[0],
        recommendation: data.profileStatusCountByProvince.recommendation[0].recommendation
      }
        
    } else {
      state.profileStatusCountByProvinceSelected = {
        province: '',
        series: [],
        categories: [],
        recommendation: ''
      }
    }
  },
  /* intialize the activeFarmerCountByProvinceSelected Data */
  inititializeActiveFarmerCountByProvince(state, data) {
    if (data.activeFarmerCountByProvince.data.length > 0) {
      state.activeFarmerCountByProvinceSelected = {
        ...data.activeFarmerCountByProvince.data[0],
        recommendation: data.activeFarmerCountByProvince.recommendation[0].recommendation
      }
    } else {
      state.activeFarmerCountByProvinceSelected = {
        province: '',
        series: [],
        categories: [],
        recommendation: ''
      }
    }
  },
  /* initialize the Coffee Harvest Data */
  initializeSoldCoffeeVarietyByProvinceSelected(state, data) {
    if (data.soldCoffeeVarietyByProvince.data.length > 0) {
      state.soldCoffeeVarietyByProvinceSelected = {
        ...data.soldCoffeeVarietyByProvince.data[0],
        recommendation: data.soldCoffeeVarietyByProvince.recommendation[0].recommendation
      }
    } else {
      state.soldCoffeeVarietyByProvinceSelected = {
        province: '',
        series: [],
        categories: [],
        recommendation: ''
      }
    }
  },
  /* intialize the marketingOutletFarmerCountSelected Data */
  inititializeMarketingOutletFarmerCount(state, data) {
    if (data.marketingOutletFarmerCount.data.length > 0) {
      state.marketingOutletFarmerCountSelected = {
        ...data.marketingOutletFarmerCount.data[0],
        recommendation: data.marketingOutletFarmerCount.recommendation[0].recommendation
      }
    } else {
      state.marketingOutletFarmerCountSelected = {
        title: '',
        data: [],
        recommendation: ''
      }
    }
  },
  /* initialize the chart data of Coffee Production */
  initializeTimelineFrequencySelected(state, data) {
    if (data.timelineFrequencyOfHarvestPerYear.data.length > 0) {
      state.timelineFrequencySelected = {
        ...data.timelineFrequencyOfHarvestPerYear.data[0],
        recommendation: data.timelineFrequencyOfHarvestPerYear.recommendation[0].recommendation
      }
    } else {
      state.timelineFrequencySelected = {
        year: '',
        series: [],
        recommendation: ''
      }
    }
  },
  /* intialize the haveHeardFarmTechFarmerCountSelected Data */
  inititializeHaveHeardFarmTechFarmerCount(state, data) {
    if (data.haveHeardFarmTechFarmerCount.data.length > 0) {
      state.haveHeardFarmTechFarmerCountSelected = {
        ...data.haveHeardFarmTechFarmerCount.data[0],
        recommendation: data.haveHeardFarmTechFarmerCount.recommendation[0].recommendation
      }
    } else {
      state.haveHeardFarmTechFarmerCountSelected = {
        province: '',
        percentage: 0,
        recommendation: ''
      }
    }
  },
  /* initialize the marketingOutletInfoSelected Data */
  initializeMarketingOutletInfoSelected(state, data) {
    if (data.marketingOutletInfo.length > 0) {
      state.marketingOutletInfoSelected = data.marketingOutletInfo[0]
    } else {
      state.marketingOutletInfoSelected = {
        province: '',
        data: [],
      }
    }
  },
  /* intialize the farmOrganizationFarmerCountSelected Data */
  inititializeFarmOrganizationFarmerCount(state, data) {
    if (data.farmOrganizationFarmerCount.length > 0) {
      state.farmOrganizationFarmerCountSelected =
        data.farmOrganizationFarmerCount[0]
    } else {
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
  changeProvince(state, obj) {
    let index
    if (!!obj.isTable) {
      index = state.data[obj.stateName].findIndex(
        (item) => item.province === obj.province
      )
      let tempArr = [...state.data[obj.stateName]]
      state[obj.stateNameSelected] = tempArr[index]
    } else {
      index = state.data[obj.stateName].data.findIndex(
        (item) => item.province === obj.province
      )
      state[obj.stateNameSelected] = {
        ...state.data[obj.stateName].data[index],
        recommendation: state.data[obj.stateName].recommendation[index].recommendation
      }
    }
  },
  /* update the chart data of Coffee Production when year is changed */
  changeTimelineFrequencySelected(state, year) {
    const index = state.data.timelineFrequencyOfHarvestPerYear.data.findIndex(
      (item) => item.year === year
    )
    if (index >= 0) {
      state.timelineFrequencySelected = {
        ...state.data.timelineFrequencyOfHarvestPerYear.data[index],
        recommendation: state.data.timelineFrequencyOfHarvestPerYear.recommendation[index].recommendation
      }
    }
  },
}

export const actions = {
  async dashboardFetch(context,commodity) {
    try {
      const data = await api.dashboardFetch(commodity)
      context.commit('saveData', data)
      context.commit('inititializeProfileStatusCountByProvince', data)
      context.commit('inititializeActiveFarmerCountByProvince', data)
      context.commit('initializeSoldCoffeeVarietyByProvinceSelected', data)
      context.commit('inititializeMarketingOutletFarmerCount', data)
      context.commit('initializeTimelineFrequencySelected', data)
      context.commit('inititializeHaveHeardFarmTechFarmerCount', data)
      context.commit('initializeMarketingOutletInfoSelected', data)
      context.commit('inititializeFarmOrganizationFarmerCount', data)
    } catch (err) {
      throw err
    }
  },
}
