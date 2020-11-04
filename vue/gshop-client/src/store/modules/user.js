/* 
管理用户模块相关数据的vuex子模块
*/
import { getUserTempId, getToken, saveToken, removeToken } from '@/utils'
import {
  reqRegister,
  reqLogin,
  reqLogout,
  reqUserInfo
} from '@/api'

const state = {
  token: getToken(),
  userInfo: {},
  userTempId: getUserTempId(),
  
}
const mutations = {
  RECEIVE_USER_INFO (state, userInfo) {
    state.userInfo = userInfo
  },

  RECEIVE_TOKEN (state, token) {
    state.token = token
  },

  RESET_USER_INFO (state) {
    state.userInfo = {}
  },

  RESET_USER_TOKEN (state) {
    state.token = ''
  }
}
const actions = {
  /* 
  注册的异步action
  */
  async register ({commit}, userInfo) {
    const result = await reqRegister(userInfo)
    if (result.code!==200) {
      throw new Error(result.data || '注册失败了')
    }
  },

  /* 
  登陆的异步action
  */
  async login ({commit}, {phone, password}) {
    const result = await reqLogin(phone, password)
    if (result.code===200) {
      const userInfo = result.data
      const token = userInfo.token
      delete userInfo.token
      // 保存到state
      commit('RECEIVE_USER_INFO', userInfo)
      commit('RECEIVE_TOKEN', token)
      // 将token保存到local中
      saveToken(token)
    } else {
      throw new Error(result.message || '登陆失败了')
    }
  },

  /* 
    退出登陆
    logout(): 请求登出的接口成功后, 清除前台用户的信息数据
			state中的userInfo
			localStorage中的userInfo
    */
  async logout ({commit}) {
    const result = await reqLogout()
    if (result.code==200) {
      // 通过commit触发mutation调用 ==> 清除state中的userInfo和token
      commit('RESET_USER_INFO')
      commit('RESET_USER_TOKEN')
      // 删除local中保存的token
      removeToken()
    } else {
      throw new Error(result.message || '退出登陆失败')
    }
  },

  async getUserInfo ({commit}) {
    const result = await reqUserInfo()
    if (result.code===200) {
      const userInfo = result.data
      // 保存到state
      commit('RECEIVE_USER_INFO', userInfo)
    } else {
      throw new Error(result.message || '获取用户信息失败')
    }
  } 
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}