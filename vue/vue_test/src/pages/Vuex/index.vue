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
      this.$store.dispatch('getCartList')

      // 给窗口绑定卸载前的事件监听 ===> 将当前的cartList保存到sessionStorage
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('CART_LIST_KEY', JSON.stringify(this.$store.state.shopCart.cartList))
      })
    }
	}
</script>