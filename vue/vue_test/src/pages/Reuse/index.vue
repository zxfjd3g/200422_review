<template>
  <div>
    <hint-button title="添加商品" type="primary" icon="el-icon-plus"/>
    <HintButton title="删除商品" type="danger" icon="el-icon-delete"/>

    <p>{{startTime | date-format}}</p>
    
    <p v-upper-text="msg"></p>

  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'Reuse',

    data () {
      return {
        msg: 'I Will Back',
        startTime: Date.now()-1000,
      }
    },
  }
</script>