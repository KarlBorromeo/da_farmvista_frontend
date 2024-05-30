import * as api from '../api/logs'

export const state = () => ({
  logs:[
    {
        id : "c31481ab-c7d5-4e76-bdd8-fa49fd6c1ab6",
        details : "Update Own Password Invalid Current User Password",
        ownerId : "bfda2e8a-6728-43f7-920b-d9641332fc39",
        editorId : "bfda2e8a-6728-43f7-920b-d9641332fc39",
        affected : "",
        performer : "Aubrey Mae Mulawan",
        status : true,
        date : "05/30/2024",
        time : "08:35 AM",
        createDate: "2024-05-30T00:35:23.445Z"
    },
    {
        id: "11dbc648-fadd-40f5-b214-c9f0ab9aec34",
        details: "Login",
        ownerId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        editorId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        affected: "",
        performer: "Aubrey Mae Mulawan",
        status: false,
        date: "05/30/2024",
        time: "08:33 AM",
        createDate: "2024-05-30T00:33:27.699Z"
    },
    {
        id: "11dbc648-fadd-40f5-b214-c9f0ab9aec34",
        details: "Created new user",
        ownerId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        editorId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        affected: "Karl Borromeo",
        performer: "Aubrey Mae Mulawan",
        status: true,
        date: "05/30/2024",
        time: "08:33 AM",
        createDate: "2024-05-30T00:33:27.699Z"
    },
    {
        id: "11dbc648-fadd-40f5-b214-c9f0ab9aec34",
        details: "Created new user",
        ownerId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        editorId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        affected: "John Warren",
        performer: "Aubrey Mae Mulawan",
        status: true,
        date: "05/30/2024",
        time: "08:33 AM",
        createDate: "2024-05-30T00:33:27.699Z"
    },
    {
        id: "11dbc648-fadd-40f5-b214-c9f0ab9aec34",
        details: "Login",
        ownerId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        editorId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        affected: "",
        performer: "Aubrey Mae Mulawan",
        status: true,
        date: "05/30/2024",
        time: "08:33 AM",
        createDate: "2024-05-30T00:33:27.699Z"
    },
    {
        id: "11dbc648-fadd-40f5-b214-c9f0ab9aec34",
        details: "Created Manual Survey",
        ownerId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        editorId: "bfda2e8a-6728-43f7-920b-d9641332fc39",
        affected: "",
        performer: "Aubrey Mae Mulawan",
        status: true,
        date: "05/30/2024",
        time: "08:33 AM",
        createDate: "2024-05-30T00:33:27.699Z"
    }
  ],
  countPages: 1
})

export const getters = {
  logs(state){
    return state.logs
  },
  countPages(state){
    return state.countPages
  }
}

export const mutations = {
  /* select  and extract specific key/values from the response and push it in our store */
  saveItems(state, logs) {
    state.logs = logs
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
}

export const actions = {
  /* fetch all logs */
  async fetchAllLogs(context,payload){
   try {
      const response = await api.fetchAllLogs(payload)
    //   context.commit('saveItems', response.data)
    //   context.commit('savePageLength', {
    //     length: response.count,
    //     limit: payload.limit,
    //   })
    } catch (error) {
      throw error
    }
  },
}
