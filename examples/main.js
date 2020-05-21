import Vue from 'vue'
import App from './App.vue'
import componentsUtils from '../lib/index'

Vue.use(componentsUtils);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
