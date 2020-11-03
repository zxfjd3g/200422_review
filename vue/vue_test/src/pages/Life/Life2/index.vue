<template>
  <div>
    <h2>生命周期测试2222</h2>
  </div>
</template>

<script>
  export default {
    name: 'Life2',

     /**
     初始化阶段
     */
    beforeCreate () {
      console.log('++beforeCreate')
    },
    created () {
      console.log('++created')
    },
    beforeMount () {
      console.log('++beforeMount')
    },
    mounted () {
      console.log('++mounted')
    },

    /**
    更新阶段
    */
    beforeUpdate () {
      console.log('++beforeUpdate')
    },

    updated () {
      console.log('++updated')
    },

    /**
    死亡阶段
    */
    beforeDestroy () {
      console.log('++beforeDestroy')
    },

    destroyed () {
      console.log('++destroyed')
    },

    // 激活: 初始显示后 / 再回到当前路由
    activated () {
      console.log('++activated')
    },

    // 当前组件没有死亡, 但不可见: 离开当前路由
    deactivated () {
      console.log('++deactivated')
    },

  }
</script>