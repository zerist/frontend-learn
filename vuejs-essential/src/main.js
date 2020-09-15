import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import './directives';
import './components';
import store from "@/store";
import VueSweetalert from './plugins/vue-sweetalert'
import Message from "./plugins/message"
import './filters'
import {mockArticles} from "@/mock/data";
import localStorage from "@/util/localStorage";

Vue.use(VueSweetalert)
Vue.use(Message)

Vue.config.productionTip = false

const AddMockData = (() => {
  const isAddMockData = true

  let userArticles = localStorage.getItem('articles')

  if (Array.isArray(userArticles)) {
    userArticles = userArticles.filter(
        article => parseInt(article.uid) === 1
    )
  } else {
    userArticles = []
  }

  if (isAddMockData) {
    store.commit('UPDATE_ARTICLES', [...userArticles, ...mockArticles(60)])
  } else {
    store.commit('UPDATE_ARTICLES', userArticles)
  }
})()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
