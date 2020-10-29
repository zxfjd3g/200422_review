<template>
  <div class="com">
    <h2>组件生命周期(**非常重要, 面试必备**)</h2>
    <router-link to="/life/life1">生命周期1</router-link>&nbsp;&nbsp;
    <router-link to="/life/life2">生命周期2</router-link>&nbsp;&nbsp;
    <br>
    <br>
    <!-- 
      使路由组件对象在离开后还是活着的(变为失活的状态)
      一个router-view管理着好几个路由组件, 有的合适缓存, 有的不合适
      可以使用include/exclude去指定缓存哪些
     -->
    <keep-alive include="Life1">
       <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Life'
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