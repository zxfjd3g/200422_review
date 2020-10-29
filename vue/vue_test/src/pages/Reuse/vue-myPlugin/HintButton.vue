<template>
  <el-tooltip effect="dark" :content="title" placement="top">
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </el-tooltip>
</template>

<script>
export default {
  name: 'HintButton',
  props: ['title'],

  created () {
    console.log(this.$attrs, this.$listeners)
  },
}
</script>