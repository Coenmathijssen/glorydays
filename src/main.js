import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store/index'

setTimeout(() => {
  console.log(App)
  
}, 4000);

Vue.config.productionTip = false

const VueInstance = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueRouter)

export default VueInstance