<template>
  <div>
    <h2>Personal 组件</h2>

    <p>总价格: {{totalPrice}}</p>

    <ul>
      <li v-for="item in cartList" :key="item.id">
        {{item.name}}--{{item.price}}--{{item.count}}
      </li>
    </ul>
    
  </div>
</template>

<script>

  export default {
    name: 'Personal',
    computed: {
      cartList () {
        return this.$store.state.shopCart.cartList
      },
      totalPrice () {
        return this.$store.getters.totalPrice
      }
    },
  }
</script>
