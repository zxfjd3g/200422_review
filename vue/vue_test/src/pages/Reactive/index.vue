<template>
  <div>
    <p>msg3: {{msg3}}</p>
    <hr>
    <data-test :msg3="msg3" @update:msg3="msg3=$event"></data-test>
    <!-- <data-test :msg3.sync="msg3"></data-test> -->
  </div>
</template>

<script type="text/ecmascript-6">
  import DataTest from './DataTest'
  export default {
    name: 'Reactive',

    data () {
      return {
        msg3: 'atguigu'
      }
    },


    components: {
      DataTest
    }
  }
</script>