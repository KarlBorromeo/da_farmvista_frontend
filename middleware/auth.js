export default function ({ store, redirect }) {
    store.commit('auth/getUserDataFromLocalStorage')
    const isLoggedin = store.getters['auth/userLoggedin'];
    console.log('name: ',isLoggedin);
    if(!isLoggedin){
        redirect('/auth')
    }
}