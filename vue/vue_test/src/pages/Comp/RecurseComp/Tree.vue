<template>
  <ul>
    <li v-for="item in data" :key="item.text" @click.stop="handleClick(item)">
      {{item.text}}
     <Tree2 :data="item.children" v-if="item.children && item.children.length>0" v-show="item.expand"/>
    </li>
  </ul>
</template>

<script>
export default {  // expand
  name: 'Tree2',
  props: ['data'],
  methods: {
   handleClick (item) {
     console.log('handleClick()')
     // 直接添加新属性是不会更新界面的
    //  item.expand = !item.expand
    if (item.hasOwnProperty('expand')) {
      // 如果存在, 直接修改
       item.expand = !item.expand
    } else {
      // 通过$set添加新属性
      this.$set(item, 'expand', true)
    }
   }
  }
}
</script>