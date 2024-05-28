import * as api from '../api/users'

export const state = () => ({
  users:[
    {
      id: `Karl Borromeo',`,
      fullname: 'Karl Borromeo',
      gender: 'Male',
      type: 'Admin',
      email: 'aw@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Dev',
      active: true
    },
    {
      id: `unknwown',`,
      fullname: 'unknwown',
      gender: 'Male',
      type: 'admin',
      email: 'secret@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Dev',
      active: false
    },
    {
      id: `Aubrey',`,
      fullname: 'Aubrey',
      gender: 'Female',
      type: 'Super Admin',
      email: 'law@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Dev',
      active: true
    },
    {
      id: `John Warren',`,
      fullname: 'John Warren',
      gender: 'Male',
      type: 'Validator',
      email: 'warren@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Field Validator',
      active: true
    },
    {
      id: `Paul 1',`,
      fullname: 'Paul 1',
      gender: 'Male',
      type: 'Validator',
      email: 'jul1@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Field Validator',
      active: true
    },
    {
      id: `Paul 2',`,
      fullname: 'Paul 2',
      gender: 'Male',
      type: 'Validator',
      email: 'jul2@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Field Validator',
      active: true
    },
    {
      id: `hehe Sabaan',`,
      fullname: 'hehe Sabaan',
      gender: 'Female',
      type: 'Validator',
      email: 'donna@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Field Validator',
      active: false
    },
    {
      id: `Donna Sabaan',`,
      fullname: 'Donna Sabaan',
      gender: 'Female',
      type: 'Validator',
      email: 'donna@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Field Validator',
      active: true
    },
    {
      id: `haha Sabaan',`,
      fullname: 'haha Sabaan',
      gender: 'Female',
      type: 'Validator',
      email: 'donna@gmail.com',
      mobileNumber: '09123456789',
      company: 'CSU',
      companyPosition: 'Field Validator',
      active: false
    }
  ],
  countPages: 4
})

export const getters = {
  users(state){
    return state.users
  },
  countPages(state){
    return state.countPages
  }
}

export const mutations = {
  /* update the active status in store */
  updateActiveStatus(state,id){
    const index = state.users.findIndex( user => user.id == id)
    if(index>=0){
      state.users[index].active = !state.users[index].active
    }
  }
}

export const actions = {
  /* create account */
  async createAccount(_, credentials) {
    try {
      let res = await api.createAccount(credentials)
      return res;
    } catch (error) {
      throw error
    }
  },

  /* udpate the status */
  async updateActiveStatus(context,id){
    try{
      let res = await api.updateActiveStatus(id)
      context.commit('updateActiveStatus',id)
      return res
    }catch(error){
      throw error
    }
  }

}
