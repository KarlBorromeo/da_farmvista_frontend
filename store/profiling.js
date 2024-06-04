import * as api from '../api/profiling'

export const state = () => ({
  countPages: 0,
  itemsCurrentPage: [],
  selectedRecord: {
    /* define here the keys and empty values each forms */
  },
  isEditingMode: false,
  pageArraysSearch: [],
})

export const getters = {
  items(state) {
    return state.itemsCurrentPage
  },
  countPages(state) {
    return state.countPages
  },
  selectedRecord(state) {
    return state.selectedRecord
  },
  isEditingMode(state) {
    return state.isEditingMode
  },
  pageArraysSearch(state){
    return state.pageArraysSearch
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

      const object = {
        id: element.interview.id,
        surveyNo: surveyNumber?surveyNumber.toString():'N/A',
        dateInterview: formattedDate,
        farmerName: name,
        farmerCode: element.profile.farmerCode?element.profile.farmerCode:'',
        regionProvince: element.interview.regionProvince,
        cityMunicipality: element.interview.cityMunicipality,
        barangay: element.interview.barangay,
        nameOrganization: element.profileGeneralInfo?element.profileGeneralInfo.organizationName:'',
        status: element.interview.intervieweeStatus
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

  /* create an array of pages for search results */
  generateArrayPages(state,obj){
    let arr = [];
    const indexes = obj.length/obj.limit;
    for(let i=1; i<=indexes; i++){
      arr.push(obj.limit*i)
    }
    arr.push(obj.length)
    state.pageArraysSearch = arr;
  },

  /* 
    toggle the editing record boolean holder, this holds if the user is editing a record or creating a record, reset to empty the selected if creation mode 
  */
  toggleEditingMode(state, bool) {
    state.isEditingMode = bool
    if (!bool) {
      state.selectedRecord = {}
    }
  },

  /* save the single record to the store to able the form questionnaire to access the existing values of the selected record */
  saveSelectedRecord(state, obj) {
    console.log('selected record: ',obj)
    state.selectedRecord = obj
  },

  /* delete specific record locally */
  deleteSurvey(state, id) {
    if (state.itemsCurrentPage.length > 0) {
      const index = state.itemsCurrentPage.findIndex((item) => item.id === id)
      if (index >= 0) {
        state.itemsCurrentPage.splice(index, 1)
      } else {
        throw new Error('cannot find the record in store')
      }
    }
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
  async fetchSingleSurvey(context, payload) {
    console.log('fetc;hing single record')
    try {
      const response = await api.fetchSingleSurvey(payload)
      context.commit('saveSelectedRecord', response)
      context.commit('toggleEditingMode', true)
    } catch (error) {
      throw error
    }
  },

  /* delete specific survey */
  async deleteSurvey(context, id) {
    try {
      const res = await api.deleteSurvey(id)
      context.commit('deleteSurvey', id)
      return res
    } catch (error) {
      throw error
    }
  },
}
