export default {
    namespaced: true,
    state: {
        isAuth: false as Boolean
    },
    getters: {},
    mutations: {
        logIn(state: { isAuth: boolean }) {
            state.isAuth = true
        },
        logOut(state: {isAuth: boolean}) {
            state.isAuth = false
        }
    }
}