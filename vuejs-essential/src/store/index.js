import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from "@/util/localStorage";
import router from "@/router";

Vue.use(Vuex)

const state = {
    user: localStorage.getItem('user'),
    auth: localStorage.getItem('auth')
}

const mutations = {
    UPDATE_USER(state, user) {
        state.user = user
        localStorage.setItem('user', user)
    },
    UPDATE_AUTH(state, auth) {
        state.auth = auth
        localStorage.setItem('auth', auth)
    }
}

const actions = {
    login({commit}, user) {
        if (user) {
            commit('UPDATE_USER', user)
        }
        commit('UPDATE_AUTH', true)
        router.push('/')
    },
    logout({commit}) {
        commit('UPDATE_AUTH', false)
        router.push({name: 'Home', params: {logout: true}}).catch((e)=>{console.log(e.message)})
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store