<template>
  <el-form inline>
    <el-form-item label="一级分类">
      <el-select v-model="category1Id" placeholder="请选择" @change="handleCategory1Change" :disabled="disabled">
        <el-option :label="c1.name" :value="c1.id" v-for="c1 in category1List" :key="c1.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="二级分类">
      <el-select v-model="category2Id" placeholder="请选择" @change="handleCategory2Change" :disabled="disabled">
        <el-option :label="c2.name" :value="c2.id" v-for="c2 in category2List" :key="c2.id"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="三级分类">
      <el-select v-model="category3Id" placeholder="请选择" @change="handleCategory3Change" :disabled="disabled">
        <el-option :label="c3.name" :value="c3.id" v-for="c3 in category3List" :key="c3.id"></el-option>
      </el-select>
    </el-form-item>
    
  </el-form>
</template>

<script>
export default {
  name: 'CategorySelector',

  data () {
    return {
      category1Id: null, // 选择的一级分类ID   初始值不要为数值, 可以为''或者null
      category2Id: '', // 选择的二级分类ID
      category3Id: '', // 选择的三级分类ID

      category1List: [], // 一级分类列表
      category2List: [], // 二级分类列表
      category3List: [], // 三级分类列表

      disabled: false, // 下拉列表是否不可操作, 默认是可操作的
    }
  },

  async mounted () {
    const result = await this.$API.category.getCategorys1()
    this.category1List = result.data
  },

  methods: {
    /* 
    一级分类项发生改变的事件回调
    */
    async handleCategory1Change (category1Id) {
      // 重置二级和三级分类数据
      this.category2Id = ''
      this.category2List = []
      this.category3Id = ''
      this.category3List = []

      // 请求获取对应的二级分类列表显示
      const result = await this.$API.category.getCategorys2(category1Id)
      this.category2List = result.data

      // 通知父组件
      this.$emit('categoryChange', {categoryId: this.category1Id, level: 1})
    },

    /* 
    二级分类项发生改变的事件回调
    */
    async handleCategory2Change (category2Id) {
      // 重置三级分类数据
      this.category3Id = ''
      this.category3List = []

      // 请求获取对应的二级分类列表显示
      const result = await this.$API.category.getCategorys3(category2Id)
      this.category3List = result.data

      // 通知父组件
      this.$emit('categoryChange', {categoryId: this.category2Id, level: 2})
    },

    /* 
    三级分类项发生改变的事件回调
    */
    async handleCategory3Change (category3Id) {
      // 通知父组件
      this.$emit('categoryChange', {categoryId: this.category3Id, level: 3})
    },
  }
}
</script>
