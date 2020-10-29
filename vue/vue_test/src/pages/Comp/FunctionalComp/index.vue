<template>
  <div>
    <!-- 函数式组件 -->
    <FC title="今日头条" imgUrl="https://www.baidu.com/img/flexible/logo/pc/result.png"/>
    <br>
    <FC title="抖音"/>
  </div>
</template>

<script>
import FC from './FC'
export default {
  name: 'FunctionalComp',
  components: {
    FC
  }
}
</script>