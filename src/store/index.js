import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import home from './home/index.js'
import dish from './shopList/index.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,
    home,
    dish
  }

})
