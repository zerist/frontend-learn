import Vue from 'vue';
import App from './App.vue';
import router from "@/router";
import './directives';
import './components';
import store from "@/store";
import VueSweetalert from './plugins/vue-sweetalert'

Vue.use(VueSweetalert)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    console.log(this.$options.store)
  }
}).$mount('#app')
