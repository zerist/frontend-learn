import Vue from 'vue'
import Vuex from 'vuex'
import localStorage from "@/util/localStorage";
import router from "@/router";
import * as moreActions from './actions'
import * as moreGetters from './getters'

Vue.use(Vuex)

const state = {
    user: localStorage.getItem('user'),
    auth: localStorage.getItem('auth'),
    articles: localStorage.getItem('articles')
}

const mutations = {
    UPDATE_USER(state, user) {
        state.user = user
        localStorage.setItem('user', user)
    },
    UPDATE_AUTH(state, auth) {
        state.auth = auth
        localStorage.setItem('auth', auth)
    },
    UPDATE_ARTICLES(state, articles) {
        state.articles = articles
        localStorage.setItem('articles', articles)
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
    },
    updateUser({state, commit}, user) {
        const stateUser = state.user

        if (stateUser && typeof stateUser === 'object') {
            user = {...stateUser, ...user}
        }

        commit('UPDATE_USER', user)
    },
    ...moreActions
}

const getters = {
    getArticleById: (state) => (id) => {
        let articles = state.articles

        if (Array.isArray(articles)) {
            articles = articles.filter(article => parseInt(id) === parseInt(article.articleId))
            return articles.length ? articles[0] : null
        } else  {
            return null
        }
    },
    ...moreGetters
}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store