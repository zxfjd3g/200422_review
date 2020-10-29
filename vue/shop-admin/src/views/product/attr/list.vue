<template>
  <div>
    <el-card style="margin-bottom:20px">
      <!-- this.$refs.cs.disabled = true/false -->
      <category-selector @categoryChange="handleCategoryChange" ref="cs"></category-selector>
    </el-card>
    <el-card>
      <div v-show="isShowList">
        <el-button type="primary" icon="el-icon-plus" @click="showAdd" :disabled="!category3Id">添加属性</el-button>
        <el-table
          v-loading="loading"
          style="margin-top: 20px"
          border
          :data="attrs"
        >
          <el-table-column type="index" label="序号" width="80" align="center"/>
          <el-table-column label="属性名称" width="150" prop="attrName"/>
          <el-table-column label="属性值列表">
            <template v-slot="{row, $index}">
              <el-tag v-for="(value, index) in row.attrValueList" :key="value.id" >{{value.valueName}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row, $index}">
              <hint-button title="修改属性" type="warning" size="small" icon="el-icon-edit" @click="showUpdate(row)"/>
              <el-popconfirm :title="`确定删除 ${row.attrName} 吗?`" 
                @onConfirm="deleteAttr(row.id)">
                 <hint-button slot="reference" title="删除属性" type="danger" size="small" icon="el-icon-delete"/>
              </el-popconfirm>
              
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!isShowList">
        <el-form inline>
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名称" v-model="attr.attrName"></el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attr.attrName">添加属性值</el-button>
        <el-button @click="isShowList = true">取消</el-button>

        <el-table border style="margin: 20px 0" :data="attr.attrValueList">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{row, $index}">  <!-- row: 当前行的属性值对象 -->
              <el-input :ref="$index" v-if="row.edit" v-model="row.valueName" size="small"
                @blur="toList(row, $index)" @keyup.enter.native="toList(row, $index)"></el-input>
              <span v-else @click="toEdit(row, $index)" style="display: inline-block; width: 100%">{{row.valueName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row, $index}">
              <el-popconfirm
                :title="`确定删除 ${row.valueName} 吗?`"
                @onConfirm="attr.attrValueList.splice($index, 1)"
              >
                <hint-button slot="reference" title="删除" icon="el-icon-delete" size="mini" type="danger"></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" :disabled="!attr.attrName || attr.attrValueList.length===0" @click="save">保存</el-button>
        <el-button @click="isShowList = true">取消</el-button>

      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'AttrList',

  data () {
    return {
      category1Id: '', // 一级分类id
      category2Id: '', // 二级分类id
      category3Id: '', // 三级分类id
      attrs: [], // 属性列表
      loading: false,
      isShowList: true, // 是否显示列表界面
      attr: {
        attrName: '',
        attrValueList: []
      }, // 当前操作(修改/添加)的属性对象
    }
  },


  watch: {
    isShowList (value) {
      // 更新cs的可操作性
      this.$refs.cs.disabled = !value
    } 
  },

  async mounted () {
    // 为了方便测试
    // this.category1Id = 2
    // this.category2Id = 13
    // this.category3Id = 61
    // this.getAttrs()
  },

  methods: {

    /* 
    删除属性
    */
    async deleteAttr (id) {
      const result = await this.$API.attr.deleteAttr(id)
      this.$message.success(result.message || '删除属性成功')
      this.getAttrs()
    },

    /* 
    添加/更新属性
    */
    async save () {
      // 准备数据
      const {attr} = this
      // 需要对收集的数据进行整理的操作(整理数据)
      attr.categoryId = this.category3Id
      attr.categoryLevel = 3

      // 在提交请求前需要对收集的参数数据进行特定整理(处理)
      // 1. 将属性值名称为空串的属性值过滤掉
      attr.attrValueList = attr.attrValueList.filter(value => {
        if (value.valueName) {
          // 2. 删除属性值对象中的edit属性
          delete value.edit  
          return true
        }
        return false
        // delete value.edit
        // return value.valueName
      })
      console.log('----', attr.attrValueList.length)
      // 如果一个属性值都没有, 没有必要发请求
      if (attr.attrValueList.length===0) {
        this.$message.error('必须至少指定一个属性值')
        return
      }

      
      attr.attrValueList.forEach(value => delete value.edit)


      // 提交添加/更新属性的请求
      await this.$API.attr.saveAttr(attr)
      // 成功后...
      // 提示成功 回到列表页面, 获取新列表显示
      this.$message.success('保存属性成功啦!!!')
      this.isShowList = true
      this.getAttrs()
    },

    /* 
    从编程模式 ==> 查看模式
    */
    toList (attrValue, index) {
      if (!attrValue.edit) return  // 避免2个事件重复处理
      const valueName = attrValue.valueName
      // 1. 如果输入的是空串, 还是编辑模式
      if (valueName==='') {
        this.$refs[index].focus()
        this.$message.warning('必须输入')
        return
      } 
      // 2. 如果与其它重复了, 还是编辑模式
      const isRepeat = this.attr.attrValueList.filter(value => value.valueName===valueName).length===2
      if (isRepeat) {
          this.$refs[index].focus()
        this.$message.warning('不能与其它名称重复')
        return
      }

      console.log('toList')
      attrValue.edit = false
    }, 

    /* 
    添加属性值
    */
    addAttrValue () {
      // 给属性值列表添加一个属性值对象
      this.attr.attrValueList.push({
        attrId: this.attr.id,
        valueName: '',
        edit: true
      })

      // 等到input显示(界面更新)后才获取焦点
      this.$nextTick(() => {
        // 最后一个input
        this.$refs[this.attr.attrValueList.length-1].focus()
      })
    },

    /* 
    从查看模式==>编程模式
    */
    toEdit (attrValue, index) {
      if (attrValue.hasOwnProperty('edit')) { // 对象自身上是否有edit属性
        attrValue.edit = true
      } else {
        this.$set(attrValue, 'edit', true)  // 此时不能用.来添加, 否则不是响应式的
      }

      // 让对应的input获得焦点
      // 通过调用input组件对象的focus(), 但必须在显示之后
      // 必须使用$nextTick(), 延迟到input显示之后才执行focus()
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },

    /* 
    显示修改界面
    */
    showUpdate (attr) {
      // 保存当前属性对象
      // this.attr = attr  // 问题: 属性名称修改不能取消   {list: [xxxx]}
     
      this.attr = {...attr} // 使用浅拷贝解决上面的问题 
      /* 
      {a: 'abc', list: [xxxx]}
      {a: 'abc', list: [xxxx]}
      */
        //问题: 修改属性值不能取消
        // 原因: 列表与修改界面共享同个属性值数组(原因: 使用的是浅拷贝)
        // 解决: 使用深拷贝
      // 方法1: 使用JOSN进行深拷贝
      // const cloneAttr = JSON.parse(JSON.stringify(attr))
      // 方法2: 使用lodash库
      const cloneAttr = cloneDeep(attr)
      this.attr = cloneAttr

      // const obj1 = {m: 1, n: [1, 2, 3]}
      // const obj2 = {...obj1}  // {m: 1, n: 还是上面的数组}
      // const obj3 = {m: 1, n: [1, 2, 3]}

      // 显示修改界面
      this.isShowList = false
    },

    /* 
    显示添加界面
    */
    showAdd () {
      // 重置attr
      this.attr = {
        attrName: '',
        attrValueList: [],
        // categoryId: this.category3Id,
        // categoryLevel: 3
      }
      // 显示添加界面
      this.isShowList = false
    },

    handleCategoryChange ({categoryId, level}) {
      if (level===1) {
        this.category1Id = categoryId
        // 重置二级和三级相关数据
        this.category2Id = ''
        this.category3Id = ''
        this.attrs = []
      } else if (level===2) { 
        this.category2Id = categoryId
        // 重置三级相关数据
        this.category3Id = ''
        this.attrs = []
      } else { // level=3
        this.category3Id = categoryId
        // 异步获取属性列表
        this.getAttrs()
      }
    },

    /* 
    异步获取属性列表
    */
    async getAttrs () {
      const { category1Id, category2Id, category3Id } = this
      this.loading = true
      const result = await this.$API.attr.getAttrList(category1Id, category2Id, category3Id)
      this.loading = false
      const attrs = result.data
      this.attrs = attrs
    }
  }
}
</script>
