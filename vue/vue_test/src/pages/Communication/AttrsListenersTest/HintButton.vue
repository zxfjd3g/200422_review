<template>

  <el-tooltip effect="dark" :content="title" placement="top">
    <!-- 
      v-bind="$attrs": 将父组件传入的所有非props属性透传给我的子组件    透传 函数参数/组件属性
      v-on="$listeners": : 将父组件传入的所有事件监听回调透传给我的子组件

      function fn (...args) { // 打包
        fn2(...args) // 解包/解构
      }

      fn(1, 2, 3)

    -->
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </el-tooltip>
  <!-- 内部的子组件需要接收一些不确定的属性 
    $attrs: {
      type, size, icon, round
    }
  -->
    
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title'],

  created () {
    console.log(this.$attrs, this.$listeners)
  },
}
</script>