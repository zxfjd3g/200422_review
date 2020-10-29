<template>
  <div>
    <h2>测试按钮权限</h2>
    <button v-if="$hasBP('test.add')">添加</button>
    <button v-if="$hasBP('test.button.update')">更新</button>
  </div>
</template>

<script>
export default {
  name: 'TestList',
}
</script>

<style lang="less" scoped>

</style>
