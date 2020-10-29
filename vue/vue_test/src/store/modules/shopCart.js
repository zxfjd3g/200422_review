const state = {
  cartList: JSON.parse(sessionStorage.getItem('CART_LIST_KEY')) || [],
  xxx: {}
}
const mutations = {
  RECEIVE_CART_LIST (state, cartList) {
    state.cartList = cartList
  },

  asyncUpdate (state) {
    setTimeout(() => {
      state.cartList.push({
        id: Date.now(),
        name: '商品1',
        price: 1212,
        count: 2
      })
    }, 1000);
  }
}
const actions = {
  getCartList ({commit, state}, isReload) {
    // 如果当前已经有数据了, 直接结束
    if (!isReload &&  state.cartList.length>0) {
      return
    }

    setTimeout(() => {
      console.log('请求得到数据')
      const cartList = [
        {
          id: 1,
          name: '商品1',
          price: 1212,
          count: 2
        },
        {
          id: 2,
          name: '商品2',
          price: 2323,
          count: 3
        }
      ]
      commit('RECEIVE_CART_LIST', cartList)

    }, 2000);
  }
}
const getters = {
  totalPrice (state) {
    return state.cartList.reduce((pre, item) => pre + item.price * item.count, 0)
  }
}



export default {
  state,
  mutations,
  actions,
  getters
}