import Vue from 'vue'

import 'normalize.css/normalize.css' 

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale  from 'element-ui/lib/locale/lang/zh-CN' 

import '@/styles/index.scss' 
import reset from '@/styles/reset.css'
import App from './App'
import store from './store'
import router from './router'

import '@/permission' 


Vue.use(ElementUI, { zhLocale})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
