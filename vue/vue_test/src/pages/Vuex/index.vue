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

      this.onBeforeUnload = () => {
        sessionStorage.setItem('CART_LIST_KEY', 
          JSON.stringify(this.$store.state.shopCart.cartList))
      }

      window.addEventListener('beforeunload', this.onBeforeUnload)
    },

    beforeDestroy () {
      window.removeEventListener('beforeunload', this.onBeforeUnload)
    }
	}
</script>