<template>
  <div>
    <h2>生命周期测试11</h2>
    <p ref="p">{{msg}}</p>
    <button @click="msg += '--'">更新</button>
    <button @click="$destroy()">销毁</button>

    <br>
    <br>
    <Child :msg="msg"/>
  </div>
</template>

<script>
  import Child from './Child'
  export default {
    name: 'Life1',  // 路由组件一定要有name配置

    data () {
      return {
        msg: 'abc'
      }
    },

    /**
     初始化阶段
     */
    beforeCreate () {
      console.log('beforeCreate')
    },
    created () {
      console.log('created')
    },
    beforeMount () {
      console.log('beforeMount')
    },
    mounted () {
      console.log('mounted')
    },

    /**
    更新阶段
    */
    beforeUpdate () {
      console.log('beforeUpdate')
    },

    updated () {
      console.log('updated')
    },

    /**
    死亡阶段
    */
    beforeDestroy () {
      console.log('beforeDestroy')
    },

    destroyed () {
      console.log('destroyed')
    },

    // 激活: 初始显示后 / 再回到当前路由
    activated () {
      console.log('activated')
    },

    // 当前组件没有死亡, 但不可见: 离开当前路由
    deactivated () {
      console.log('deactivated')
    },

    // 捕获子组件传递过来错误
    errorCaptured (err, child, info) {
      console.log('errorCaptured')
      console.log(err, child, info)
      return false // 不再向外传递, 说明当前已经处理了错误
    },

    components: {
      Child
    }
  }
</script>