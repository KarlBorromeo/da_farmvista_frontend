export default function ({ store, redirect }) {
  store.commit('auth/getUserDataFromLocalStorage')
  const isLoggedin = store.getters['auth/userLoggedin']
  if (!isLoggedin) {
    redirect('/auth')
  }
}
