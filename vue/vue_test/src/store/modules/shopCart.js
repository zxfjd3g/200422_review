const state = {
  // 页面加载初始化时执行
  cartList: JSON.parse(sessionStorage.getItem('CART_LIST_KEY')) || [],
  xxx: {}
}
const mutations = {
  RECEIVE_CART_LIST (state, cartList) {
    state.cartList = cartList
  },

  // 当前mutation函数执行完后, vuex调试工具立即记录当前state数据==> 不正确
  asyncUpdate (state) {
    // 异步更新数据
    setTimeout(() => {
      state.cartList.push({
        id: Date.now(),
        name: 'CC',
        price: 1000,
        count: 2
      })
    }, 1000)
  }
}
const actions = {

  getCartList ({commit, state}, isReload) {

    // 如果当前cartList已经有了, 直接结束
    if (!isReload && state.cartList.length>0) return

    console.log('异步请求获取列表数据')
    setTimeout(() => {
      const cartList = [
        {
          id: 1,
          name: 'AA',
          price: 1000,
          count: 2
        },
        {
          id: 2,
          name: 'BB',
          price: 2000,
          count: 3
        }
      ]

      commit('RECEIVE_CART_LIST', cartList)
    }, 1000);
  }
}
const getters = {
  totalPrice (state) {
    return state.cartList.reduce((pre, item) => pre + item.count*item.price, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}