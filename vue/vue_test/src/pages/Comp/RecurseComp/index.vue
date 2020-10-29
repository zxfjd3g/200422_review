<template>
  <div>
    <!-- 递归组件 -->
    <Tree :data='data'></Tree>
  </div>
</template>

<script>
  import Tree from './Tree'
  export default {
    data() {
      return {
        data: [
          {
            text: 1,
            children: [
              {
              text: '1-1',
              children: [{
                text: '1-1-1',
                children: [{
                  text: '1-1-1-1',
                }]
              }]
            }, {
              text: '1-2'
            }]
          }, 
          {
            text: 2,
            children: [
              {
                text: '2-2'
              }
            ]
          }, 
          {
            text: 3,
          }
        ]
      }
    },
    components: {
      Tree
    }
  }
</script>