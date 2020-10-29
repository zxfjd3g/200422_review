<template>
  <div class="test1">
    <h2>ScopedTest</h2>

    <br>
    <Test2></Test2>
  </div>
</template>
<script>
import Test2 from './Test2'
export default {
  name: 'ScopedTest',
  components: {
    Test2
  }
}
</script>

<style scoped>
  
</style>
