import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import './directives';
import './components';
import store from "@/store";
import VueSweetalert from './plugins/vue-sweetalert'
import Message from "./plugins/message"
import './filters'

Vue.use(VueSweetalert)
Vue.use(Message)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    console.log(this.$options.store)
  }
}).$mount('#app')
