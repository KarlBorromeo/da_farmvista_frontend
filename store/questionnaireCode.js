import * as api from '../api/questionnaireCode.js'

export const state = () => ({
  codes: {},
  cities: [],
  barangays: []
})

/* this function gets the values of 
the object and convert it into array and return it */
function generateArray(object) {
  const keys = Object.keys(object)
  const array = []
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      array.push(object[keys[i]])
    }
  }
  return array
}

export const getters = {
  barangays(state){
    return state.barangays
  },
  cities(state){
    return state.cities
  },
  Code1(state) {
    return generateArray(state.codes.Code1)
  },
  Code2(state) {
    return generateArray(state.codes.Code2)
  },
  Code3_4(state) {
    return generateArray(state.codes.Code3_4)
  },
  Code5FarmImplementsTools(state) {
    return generateArray(state.codes.Code5FarmImplementsTools)
  },
  Code5FarmMachinery(state) {
    return generateArray(state.codes.Code5FarmMachinery)
  },
  Code5PoultryAndLivestock(state) {
    return generateArray(state.codes.Code5PoultryAndLivestock)
  },
  Code5StructuresBuilding(state) {
    return generateArray(state.codes.Code5StructuresBuilding)
  },
  Code6(state) {
    return generateArray(state.codes.Code6)
  },
  Code7_8(state) {
    return generateArray(state.codes.Code7_8)
  },
  Code9(state) {
    return generateArray(state.codes.Code9)
  },
  Code10(state) {
    return generateArray(state.codes.Code10)
  },
  Code11(state) {
    return generateArray(state.codes.Code11)
  },
  Code12(state) {
    return generateArray(state.codes.Code12)
  },
  Code13(state) {
    return generateArray(state.codes.Code13)
  },
  Code14(state) {
    return generateArray(state.codes.Code14)
  },
  Code15(state) {
    return generateArray(state.codes.Code15)
  },
  Code16A(state) {
    return generateArray(state.codes.Code16A)
  },
  Code16B(state) {
    return generateArray(state.codes.Code16B)
  },
  Code17(state) {
    return generateArray(state.codes.Code17)
  },
  Code18(state) {
    return generateArray(state.codes.Code18)
  },
  Code19(state) {
    return generateArray(state.codes.Code19)
  },
  Code20(state) {
    return generateArray(state.codes.Code20)
  },
  Code21A(state) {
    return generateArray(state.codes.Code21A)
  },
  Code21B(state) {
    return generateArray(state.codes.Code21B)
  },
  Code21C(state) {
    return generateArray(state.codes.Code21C)
  },
  Code21D(state) {
    return generateArray(state.codes.Code21D)
  },
  Code21E(state) {
    return generateArray(state.codes.Code21E)
  },
  Code21F(state) {
    return generateArray(state.codes.Code21F)
  },
  Code22(state) {
    return generateArray(state.codes.Code22)
  },
  Code23(state) {
    return generateArray(state.codes.Code23)
  },
  Code24(state) {
    return generateArray(state.codes.Code24)
  },
  Code25(state) {
    return generateArray(state.codes.Code25)
  },
  Code26(state) {
    return generateArray(state.codes.Code26)
  },
  Code27(state) {
    return generateArray(state.codes.Code27)
  },
  Rate(state) {},
  Sex(state) {
    return generateArray(state.codes.Sex)
  },
  Agree(state) {},
  MembershipType(state) {
    return generateArray(state.codes.MembershipType)
  },
  CivilStatus(state) {
    return generateArray(state.codes.CivilStatus)
  },
  HighestEducationalAttainment(state) {
    return generateArray(state.codes.HighestEducationalAttainment)
  },
  MarginalizedSector(state) {
    return generateArray(state.codes.MarginalizedSector)
  },
  PrintMaterials(state) {
    return generateArray(state.codes.PrintMaterials)
  },
  PestControlAdvice(state) {
    return generateArray(state.codes.PestControlAdvice)
  },
  PesticideConsideration(state) {
    return generateArray(state.codes.PesticideConsideration)
  },
  PesticideInformationSource(state) {
    return generateArray(state.codes.PesticideInformationSource)
  },
  SprayingEquipment(state) {
    return generateArray(state.codes.SprayingEquipment)
  },
  AgriWasteReutilizationInformationSource(state) {
    return generateArray(state.codes.AgriWasteReutilizationInformationSource)
  },
  WasteDisposalMethod(state) {
    return generateArray(state.codes.WasteDisposalMethod)
  },
  AgriculturalSystem(state) {
    return generateArray(state.codes.AgriculturalSystem)
  },
  Topography(state) {
    return generateArray(state.codes.Topography)
  },
  SoilFertility(state) {
    return generateArray(state.codes.SoilFertility)
  },
  CroppingSystem(state) {
    return generateArray(state.codes.CroppingSystem)
  },
  IntervieweeStatus(state) {
    return generateArray(state.codes.IntervieweeStatus)
  },
  RegionProvince(state) {
    let arr = []
    for(let i=0; i<state.codes.Location.length; i++){
      arr.push(state.codes.Location[i].province)
    }
    return arr
  },
  CityMunicipality(state) {
    return generateArray(state.codes.CityMunicipality)
  },
  ProfileStatus(state) {
    return generateArray(state.codes.ProfileStatus)
  },
  ProfileClassification(state) {
    return generateArray(state.codes.ProfileClassification)
  },
  
}

export const mutations = {
  /* save the fetched codes in the store */
  saveCodes(state, codes) {
    state.codes = codes
  },
  /* generate dynamic city lists */
  generateDynamicCities(state,province){
    // const location = [...state.codes.Location]
    let index = state.codes.Location.findIndex(item => item.province == province)
    if(index>=0){
      state.cities = state.codes.Location[index].cities.map(item => item.city)
      console.log(state.cities)
    }else{
      state.cities = []
    }
  },
  /* generate dynamic barangay lists */
  generateDynamicBarangay(state,obj){
    // const location = [...state.codes.Location]
    let index = state.codes.Location.findIndex(item => item.province == obj.province)
    if(index>=0){
      const cities = state.codes.Location[index].cities
      let ind = cities.findIndex(el => el.city == obj.city)
      if(ind>=0){
        state.barangays = cities[ind].barangay
      }else{
        state.barangays = []
      }
    }else{
      state.barangays = []
    }
  }
}

export const actions = {
  /* http request for fetching all codes */
  async fetchAllCodes(context, commodity) {
    try {
      const codes = await api.fetchAllCodes(commodity)
      context.commit('saveCodes', codes)
    } catch (error) {
      throw error
    }
  },
}
