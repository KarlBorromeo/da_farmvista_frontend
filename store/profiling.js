import * as api from '../storeAPI/profiling'

export const state = () => ({
  countPages: 0,
  itemsCurrentPage: [],
})

export const getters = {
  items(state) {
    return state.itemsCurrentPage
  },
  countPages(state) {
    return state.countPages
  },
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
      const date = new Date(element.dateOfInterview)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const formattedDate = `${year}/${month}/${day}`

      // convert to string the survey number
      const surveyNumber = element.surveyNo
      const convertedSurveyNumber = surveyNumber.toString()

      const object = {
        id: element.id,
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
    console.log(obj)
    if (obj.limit >= obj.length) {
      state.countPages = 1
    } else {
      state.countPages = Math.floor(obj.length / obj.limit) - 1
      if (obj.length % obj.limit != 0) {
        state.countPages++
      }
    }
  },
}

export const actions = {
  async fetchSurvey(context, payload) {
    try {
      const response = await api.fetchRecords(payload)
      context.commit('saveItems', response.data)
      context.commit('savePageLength', {
        length: response.count,
        limit: payload.limit,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}
