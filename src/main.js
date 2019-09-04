import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'styles/reset.css'
import 'styles/common.css'

Vue.config.productionTip = false

Vue.prototype.$baseUrl = process.env.BASE_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
