<template>
  <div class="comp">
    <h2>组件高级(**有点重要, 面试加分必备**)</h2>
    <router-link to="/comp/dca">动态组件 & 缓存组件 & 异步组件</router-link>&nbsp;&nbsp;
    <router-link to="/comp/functional">函数组件 & JSX</router-link>&nbsp;&nbsp;
    <router-link to="/comp/recurse">递归组件</router-link>&nbsp;&nbsp;
    <br>
    <br>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Comp'
  }
</script>

<style lang="less" scoped>
  .comp {
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