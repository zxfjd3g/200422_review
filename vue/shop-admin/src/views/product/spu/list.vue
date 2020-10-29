<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <CategorySelector @categoryChange="handleCategoryChange"></CategorySelector>
    </el-card>

    <el-card>

      <div v-show="!isShowSpuForm && !isShowSkuForm">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="showSpuAdd">添加SPU</el-button>

        <el-table border :data="spuList" style="margin: 20px 0">
          <el-table-column label="序号" type="index" width="80" align="center"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row, $index}">
              <hint-button title="添加SKU" type="primary" icon="el-icon-plus" size="mini" @click="showSkuAdd(row)"/>
              <hint-button title="修改SPU" type="primary" icon="el-icon-edit" size="mini" @click="showSpuUpdate(row)"/>
              <hint-button title="查看所有SKU" type="info" icon="el-icon-info" size="mini" @click="showSkuList(row)"/>
              <el-popconfirm
                :title="`确定删除 ${row.spuName} 吗?`"
                @onConfirm="deleteSpu(row.id)">
                <hint-button slot="reference" title="删除SPU" type="danger" icon="el-icon-delete" size="mini" />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination 
          style="text-align: center" 
          :current-page="page" 
          :page-sizes="[5, 10, 15]" 
          :page-size="limit"
          :total="total" 
          layout="prev, pager, next, jumper, ->, sizes, total" 
          @current-change="getSpuList"
          @size-change="handleSizeChange" />

      </div>

      <!-- 方式一: 使用 v-show + $parent -->
      <!-- <SpuForm v-show="isShowSpuForm"></SpuForm> -->
      <!-- 方式二: sync -->
      <SpuForm :visible.sync="isShowSpuForm" ref="spuForm" 
        @success="handleSuccess" @cancel="handleCancel" />
      <!-- <SpuForm :visible="isShowSpuForm" @update:visible="isShowSpuForm=$event"></SpuForm> -->

      <SkuForm v-show="isShowSkuForm" ref="skuForm" 
        @success="isShowSkuForm = false" :cancel="() => isShowSkuForm = false"/>
    </el-card>

    <el-dialog :title="`${spu.spuName} => SKU列表`" :visible.sync="isShowDialog">
      <el-table :data="skuList" v-loading="isLoading">
        <el-table-column prop="skuName" label="名称"></el-table-column>
        <el-table-column property="price" label="价格(元)"></el-table-column>
        <el-table-column property="weight" label="重量(KG)"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from '../components/SpuForm'
import SkuForm from '../components/SkuForm'
export default {
  name: 'SpuList',

  data () {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      spuList: [], // 当前页的spu数组
      total: 0, // 总数量
      page: 1, // 当前页码
      limit: 5, // 每页数量
      isShowSpuForm: false, // 是否显示SpuForm组件界面
      isShowSkuForm: false, // 是否显示SkuForm组件界面

      isLoading: false, // 是否正在加载中
      isShowDialog: false, // 是否显示sku列表的dialog
      spu: {}, // 要显示sku列表的spu对象
      skuList: [], // 指定spu下的sku列表
    }
  },

  async mounted () {
    // 为了方便测试
    this.category1Id = 2
    this.category2Id = 13
    this.category3Id = 61
    this.getSpuList()
  },

  methods: {

    /* 
    显示sku的添加界面
    */
    showSkuAdd (spu) {
      // 显示SkuForm界面
      this.isShowSkuForm = true
      // 准备SKuForm初始显示需要的条件数据
      // const data = {
      //   spuId: spu.id,
      //   spuName: spu.spuName,
      //   category1Id: this.category1Id,
      //   category2Id: this.category2Id,
      //   category3Id: this.category3Id,
      //   tmId: spu.tmId
      // }
      // 让skuForm组件对象去加载初始数据显示
      // this.$refs.skuForm.initLoadAddData(data)

      spu = {
        ...spu, // 尽量不要修改原本的数据
        category1Id: this.category1Id,
        category2Id: this.category2Id
      }
      this.$refs.skuForm.initLoadAddData(spu)
    },

    /* 
    删除指定spu
    */
    async deleteSpu (spuId) {
      // 发送ajax请求
      const result = await this.$API.spu.remove(spuId)
      // 提示成功
      this.$message.success('删除SPU成功')
      // 重新获取列表显示
      this.getSpuList()
    },

    /* 
    显示指定SPU下的SKU列表
    */
    async showSkuList (spu) {

      // 更新一个数据
      this.isShowDialog = true
      this.spu = spu
      this.skuList = [] // 重置一下前面显示的列表数据
      this.isLoading = true // 显示loading

      // 请求获取sku列表显示
      const result = await this.$API.sku.getListBySpuId(spu.id)
      this.isLoading = false // 隐藏loading
      const skuList = result.data
      this.skuList = skuList
    },

    /* 
    保存spu成功的监听回调
    */
    handleSuccess () {
      // 需要区别是添加还是更新
      this.getSpuList(this.spuId ? this.page : 1)
      // 清除spuID
      this.spuId = null
    },

    /* 
    取消SPU保存的回调
    */
    handleCancel () {
      // 清除spuID
      this.spuId = null
    },


    /* 
    显示SPU修改界面
    */
    showSpuUpdate (spu) {
      // 保存spu的id
      this.spuId = spu.id  // 只有点修改才会有

      // 显示form界面
      this.isShowSpuForm = true
      // 让form组件加载显示更新界面需要的数据
      this.$refs.spuForm.initLoadUpdateData(spu.id)
    },

    /* 
    显示SPU添加
    */
    showSpuAdd () {
      this.isShowSpuForm = true
      // 让form组件加载显示添加界面需要的数据
      this.$refs.spuForm.initLoadAddData(this.category3Id)
    },

    /* 
    处理分类发生改变的回调
    */
    handleCategoryChange ({categoryId, level}) {
      if (level===1) {
        // 重置数据(二/三级/列表数据)
        this.category2Id = ''
        this.category3Id = ''
        this.spuList = []
        this.total = 0
        // 保存到对应的分类ID上
        this.category1Id = categoryId
      } else if (level===2) {
        // 重置数据(三级/列表数据)
        this.category3Id = ''
        this.spuList = []
        this.total = 0
        // 保存到对应的分类ID上
        this.category2Id = categoryId
      } else {
        // 保存到对应的分类ID上
        this.category3Id = categoryId
        // 发请求获取SPU列表显示
        this.getSpuList(1)
      }
    },

    /* 
    异步获取指定页码SPU列表显示
    */
    async getSpuList (page=1) {
      this.page = page
      const result = await this.$API.spu.getList(page, this.limit, this.category3Id)
      const {records, total} = result.data
      this.spuList = records
      this.total = total
    },

    /* 
    每页数量改变的监听回调
    */
    handleSizeChange (limit) {
      this.limit = limit
      this.getSpuList()
    } 
  },

  components: {
    SpuForm,
    SkuForm
  }
}
</script>
