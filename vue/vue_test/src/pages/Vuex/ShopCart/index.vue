<template>
  <div>
    <h2>ShopCart 组件</h2>

    <ul>
      <li v-for="item in cartList" :key="item.id">
        {{item.name}}--{{item.price}}--{{item.count}}
      </li>
    </ul>
    <p>总价格: {{totalPrice}}</p>

    <br>
    <br>
    <button @click="$store.commit('asyncUpdate')">添加购物项</button>
    <button @click="$store.dispatch('getCartList', true)">重新获取</button>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
   name: 'ShopCart',

   computed: {
     ...mapState({
       cartList: state => state.shopCart.cartList
     }),
     ...mapGetters(['totalPrice'])
   },

    watch: {

      cartList: {
        deep: true, // 尝试监视
        immediate: true, // 是否初始化立即执行一次
        handler (value) {
          console.log('state数据cartList发生了改变')
        }
      }
    },
  }
</script>
