/* 
vuex最核心管理对象(仓库)  store对象
*/

import Vue from 'vue'
import Vuex from 'vuex'

import shopCart from './modules/shopCart'
import other from './modules/other'

Vue.use(Vuex)

const mutations = {
  xxx (state) { // 总state

  }
}

const actions = {
  
}

const getters = {
  
}

const modules = {
  shopCart,
  other
}

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules
})

/* 
总结的state:
{
  shopCart: {cartList: [], xxx: {}},
  other: {yyy: '', zzz: {}}
}
*/
