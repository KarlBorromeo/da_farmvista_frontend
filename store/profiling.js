import * as api from '../api/profiling'

export const state = () => ({
  countPages: 0,
  itemsCurrentPage: [],
  selectedRecord: {
    /* define here the keys and empty values each forms */
  },
  isEditingMode: false
})

export const getters = {
  items(state) {
    return state.itemsCurrentPage
  },
  countPages(state) {
    return state.countPages
  },
  selectedRecord(state){
    return state.selectedRecord
  },
  isEditingMode(state){
    return state.isEditingMode
  }
}

/* function for capitalizing the first index of the word and also */
function capitalizeFirstLetter(text) {
  if (text) {
    const capitalized = text[0].toUpperCase() + text.slice(1)
    return capitalized
  }
  return ' '
}

export const mutations = {
  /* select  and extract specific key/values from the response and push it in our store */
  saveItems(state, items) {
    state.itemsCurrentPage = []

    items.forEach((element) => {
      // concatinate the names
      const firstname = capitalizeFirstLetter(element.profile.firstName)
      const middleInitial = capitalizeFirstLetter(element.profile.middleInitial)
      const lastname = capitalizeFirstLetter(element.profile.lastName)
      let name = firstname + ' ' + middleInitial + ' ' + lastname

      // change the date format
      const date = new Date(element.interview.dateOfInterview)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formattedDate = `${year}/${month}/${day}`

      // convert to string the survey number
      const surveyNumber = element.interview.surveyNo
      const convertedSurveyNumber = surveyNumber.toString()

      const object = {
        id: element.interview.id,
        surveyNo: convertedSurveyNumber,
        dateInterview: formattedDate,
        farmerName: name,
        farmerCode: element.profile.farmerCode,
        regionProvince: element.regionProvince,
        cityMunicipality: element.cityMunicipality,
        barangay: element.barangay,
        nameOrganization: element.profileGeneralInfo.organizationName,
      }
      state.itemsCurrentPage.push(object)
    })
  },
  /* 
    calculate the total pages we have based on the length returned by the API and also the limit we assigned
    and set the pages the total of length / limit
  */
  savePageLength(state, obj) {
    if (obj.limit >= obj.length) {
      state.countPages = 1
    } else {
      state.countPages = Math.floor(obj.length / obj.limit)
      if (obj.length % obj.limit != 0) {
        state.countPages++
      }
    }
  },
  /*
    reset as empty values each key/value
  */
  resetSelectedRecord(state){
    const obj = state.selectedRecord;
    const rootKeys = Object.keys(obj);
    for(let i=0; i<rootKeys.length; i++){
        let subKeys = Object.keys(obj[rootKeys[i]]);
        for(let j=0; j<subKeys.length; j++){
            if(typeof(obj[rootKeys[i]][subKeys[j]]) == 'number' || typeof(obj[rootKeys[i]][subKeys[j]]) == 'string'){
                obj[rootKeys[i]][subKeys[j]] = ''
            }else{
                obj[rootKeys[i]][subKeys[j]] = []
            }
        }
    }
  },
  /* 
    toggle the editing record boolean holder, this holds if the user is editing a record or creating a record, reset to empty the selected if creation mode 
  */
  toggleEditingMode(state, bool){
    state.isEditingMode = bool
    if(!bool){
      this.commit('resetSelectedRecord')
    }
  },
  /* save the single record to the store to able the form questionnaire to access the existing values of the selected record */
  saveSelectedRecord(state,obj){
    state.selectedRecord = obj;
  },
}

export const actions = {
  /* fetch all survey records*/
  async fetchAllSurvey(context, payload) {
    try {
      const response = await api.fetchAllRecords(payload)
      context.commit('saveItems', response.data)
      context.commit('savePageLength', {
        length: response.count,
        limit: payload.limit,
      })
    } catch (error) {
      throw error
    }
  },
  /* fetch one survey record using id */
  async fetchSingleSurvey(context,payload){
    console.log('fetc;hing single record')
    try{
      const response = await api.fetchSingleSurvey(payload);
      context.commit('saveSelectedRecord',response)
      context.commit('toggleEditingMode', true) 
    }catch(error){
      throw error
    }
  }
}
