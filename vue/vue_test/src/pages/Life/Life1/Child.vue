<template>
  <div>
    <h3>Child 组件</h3>
    <p>{{msg}}</p>
    <button @click="test">点击出错</button>
  </div>
</template>

<script>
  export default {
    name: 'Child',

    props: ['msg'],

    methods: {
      test() {
        console.log(msg)
      }
    },

    /**
    初始化阶段
    */
    beforeCreate() {
      console.log('--Child beforeCreate')
    },
    created() {
      console.log('--Child created')
    },
    beforeMount() {
      console.log('--Child eforeMount')
    },
    mounted() {
      console.log('--Child mounted')
    },

    /**
    更新阶段
    */
    beforeUpdate() {
      console.log('--Child beforeUpdate')
    },
    updated() {
      console.log('--Child updated')
    },

    /**
    死亡阶段
    */
    beforeDestroy() {
      console.log('--Child beforeDestroy')
    },
    destroyed() {
      console.log('--Child destroyed')
    },

    activated () {
      console.log('--Child activated')
    },

    deactivated () {
      console.log('--Child deactivated')
      
    },
  }
</script>