export default async function ({ store, redirect }) {
  try {
    await store.dispatch('auth/checkTokenAlive')
    store.commit('auth/getUserDataFromLocalStorage')
    const isLoggedin = store.getters['auth/userLoggedin']
    if (!isLoggedin) {
      redirect('/auth')
    }
  } catch (errCode) {
    if (errCode === 'FV4010001') {
      alert('token expired')
      store.commit('auth/logout')
      redirect('/auth')
    }
  }
}
