<template>
  <div>
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :data="todos">
      <!-- 
        插槽: 由父组件来指定具体内容(带数据的标签) 
        什么时候需要用作用域插槽?: 决定父组件传递什么内容(带数据的标签)的数据在子组件
        子组件: 需要向父组件传递特定的数据: 通过<slot>的属性
        父组件: 接收子组件通过<slot>的属性回传的数据: 
          v-slot="scope"
          v-slot="{row, $index}"
      -->
      <template v-slot="{row, $index}">
        <span style="color: green" v-if="row.isComplete">{{row.text}}</span>
        <span v-else>{{row.text}}</span>
      </template>
    </List>
    <hr>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :data="todos">
      <template v-slot="{row, $index}">
        <span :style="{color: $index%2===0 ? 'green' : 'blue'}">{{$index}}--{{row.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: false},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List
    }
  }
</script>
