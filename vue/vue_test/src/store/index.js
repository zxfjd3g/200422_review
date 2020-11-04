/* 
vuex最核心管理对象(仓库)
*/
import Vue from 'vue'
import Vuex from 'vuex'

import shopCart from './modules/shopCart'
import other from './modules/other'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shopCart,
    other
  }
}) 
