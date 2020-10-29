<template>
  <ul>
    <li v-for="item in data" :key="item.text" @click.stop="handleClick(item)">
      {{ item.text }}
      <Tree :data="item.children" v-if="item.expanded"/>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tree',
  props: ['data'],
  methods: {
    handleClick (item) {
      if (item.hasOwnProperty('expanded')) {
        item.expanded = !item.expanded
      } else {
        // 向响应式对象item添加响应式数据
        this.$set(item, 'expanded', true)
      }
    }
  }
}
</script>