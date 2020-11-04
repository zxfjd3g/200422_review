<template>
	<div>
		<h1>Vuex Test</h1>
    <div>
      <router-link to="/vuex/shopcart">ShopCart链接</router-link>  &nbsp;&nbsp;
      <router-link to="/vuex/personal">Personal链接</router-link>
    </div>
    <br>
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
    name: 'vuexTest',

    mounted () {
      // 分给异步action  请求获取数据到state中
      this.$store.dispatch('getCartList')
      // 当刷新页面卸载页面前执行回调 ==> 将当前的state数据保存到sessionStorage
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('CART_LIST_KEY', 
          JSON.stringify(this.$store.state.shopCart.cartList))
      })
    }
	}
</script>