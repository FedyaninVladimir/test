import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './store'
import VueResource from 'vue-resource'
Vue.use(Vuex)
Vue.use(VueResource)
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
