// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// echart5以上不支持import echarts from 'echarts' 的引入方式
import * as echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/index.js'

// 导入验证器组件
import Validator from 'vue-validator'
import 'default-passive-events'
Vue.use(Validator)

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
