<template>
  <div class="com">
    <h2>复习</h2>
    <router-link to="/life">生命周期</router-link>&nbsp;&nbsp;
    <router-link to="/comp">组件深入</router-link>&nbsp;&nbsp;
    <router-link to="/communication">组件间通信</router-link>&nbsp;&nbsp;
    <router-link to="/reactive">响应式</router-link>&nbsp;&nbsp;
    <router-link to="/reuse">可复用</router-link>&nbsp;&nbsp;
    <router-link to="/vuex">Vuex测试</router-link>&nbsp;&nbsp;
    <router-link to="/router">Router测试</router-link>&nbsp;&nbsp;
    <br>
    <br>
    <!-- 显示当前路由组件 -->
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Review'
  }
</script>

<style lang="less" scoped>
  .com {
    margin: 10px;
    a {
      font-size: 16px;
      margin-right: 5px;
      &.router-link-active {
        color: red;
      }
    }
  }
</style>