// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './router/http.js'
//import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'common/stylus/index.styl'
import store from './store/index'
//import axios from './http'
//import store from './store/store'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$baseUrl = 'http://hn.skylandertech.cn'

/* eslint-disable no-new */
Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
