<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <!-- 
        插槽: 由父组件来指定具体内容(带数据的标签) 
        什么时候需要用作用域插槽?: 决定父组件传递什么内容(带数据的标签)的数据在子组件
        子组件: 需要向父组件传递特定的数据: 通过<slot>的属性
        父组件: 接收子组件通过<slot>的属性回传的数据: 
          v-slot="scope"
          v-slot="{row, $index}"
      -->
     <slot :row="item" :$index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>