/* this middleware redirects the user to dashboard page if the usertype is neither admin and superadmin*/
export default function ({ store, redirect }) {
  store.commit('auth/getUserDataFromLocalStorage')
  const isLoggedin = store.getters['auth/userLoggedin']
  const userType = localStorage.getItem('type')
  if (!isLoggedin) {
    redirect('/auth')
  } else if (userType !== 'superadmin' && userType !== 'admin') {
    redirect('/dashboard')
  }
}
