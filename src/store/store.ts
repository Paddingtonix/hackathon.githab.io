import { createStore } from 'vuex'
import authorizationModule from './authorization/authorization'
import modalModule from './modal/modal'

const store = createStore({
    state: {},
    mutations: {},
    modules: {
        authorizationModule,
        modalModule
    },
    actions: {}
})

export default store
