<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="showAdd">添加</el-button>
    <!-- 
      id:245
      logoUrl:"http://182.92.128.115:8080/group1/M00/00/30/rBFUDF8kx1GAOsZdAAAi2MfQvMY181.jpg"
      tmName:"华为"
     -->
    <el-table
      v-loading="loading"
      style="margin: 20px 0"
      border
      :data="trademarks"
    >
      <el-table-column
        align="center"
        label="序号"
        type="index"
        width="80"/>

      <el-table-column
        prop="tmName"
        label="品牌名称"/>

      <el-table-column
        label="品牌LOGO">
        <!-- 当前列不是显示对象的某个属性值, 而标签结构数据 -->
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" alt="" style="width: 100px; height: 80px">
        </template>
      </el-table-column>

       <el-table-column
          label="操作">
          <template v-slot="{row, $index}">
            <el-button type="warning" icon="el-icon-edit" size="small" @click="showUpdate(row)">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteTradmark(row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getTrademarks">
    </el-pagination>

    <el-dialog :title="form.id ? '修改' : '添加'" :visible.sync="dialogFormVisible">
      
      <el-form :model="form" :rules="rules" ref="ruleForm" style="width: 80%">
        <el-form-item label="品牌名称" label-width="120px" prop="tmName">
          <el-input v-model="form.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="120px" prop="logoUrl">
          <!-- 
            action: 处理上传图片的接口地址
            on-success: 指定上传成功的回调函数
            before-upload: 指定准备上传前的回调, 如果返回false不发请求
           -->
          <el-upload
            class="avatar-uploader"
            :action="$BASE_API + '/admin/product/fileUpload'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过50kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer"> <!-- 使用命名插槽 -->
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TrademarkList',

  data () {
    return {
      page: 1, // 当前页码
      limit: 3, // 每页数量
      trademarks: [], // 当前页的列表数据
      total: 0, // 总数量
      dialogFormVisible: false, // 对话框是否显示
      form: { // 收集品牌对象数据
        tmName: '',
        logoUrl: '',
      },

      rules: {
        /* 使用内置的校验规则 */
        tmName: [
          { required: true, message: '请输入活动名称' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          /* 使用自定义校验 */
          { validator: this.validateTmName, trigger: 'blur' }
        ],
        logoUrl: [
          { required: true, message: '必须指定图片', trigger: 'change'}
        ],
      },
      loading: false, // 是否显示loading
    }
  },

  async mounted () {
    this.getTrademarks(1)
  },

  methods: {

    /* 
    自定义校验规则函数
    value: 输入的值
    callback: 用来指定是否通过的函数, 当指定了提示信息时代表不通过

    长度3到5位
    */
    validateTmName (rule, value, callback) {
      if (value.length<3 || value.length>5) {
        callback('长度在 3 到 5 个字符') // 没有通过
      } else {
        callback() // 通过了
      }
    }, 

    /* 
    删除指定品牌
    */
    deleteTradmark (trademark) {
      // 显示确认
      this.$confirm(`确定删除 ${trademark.tmName} 吗?`, '提示', {
        type: 'warning'
      }).then(async () => { // 点击确定
        // 发送删除的请求
        await this.$API.trademark.remove(trademark.id)
        // 成功后, 提示成功, 重新显示列表
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        
        // 确定是当前页还是上一页
        // 当前页数量大于1 或者 如果只有一条数据了, 获取当前页, 否则获取上一页
        const page = (this.trademarks.length>1 || this.total===1) ? this.page : this.page -1
        
        this.getTrademarks(page)
        
      }).catch(() => { // 点击取消
        this.$message.info('已取消删除') 
      })
    },

    /* 
    添加或更新品牌
    */
    addOrUpdate () {

      // 进行表单的统一校验
      this.$refs.ruleForm.validate(async (valid) => { // 校验完成时自动调用
        if (valid) { // 全部通过
          // 准备数据
          const trademark = this.form
          // 提交ajax请求
          await this.$API.trademark.save(trademark)
          // 成功了, ....
          // 关闭对话
          this.dialogFormVisible = false
          // 提示成功
          this.$message.success(`${trademark.id?'修改':'添加'}成功`)
          // 获取列表显示
            // 修改显示当前页, 添加显示第1页
          this.getTrademarks(trademark.id ? this.page : 1)
        } else {
          console.log('没通过')
        }
      })

      
    },
    
    /* 
    on-success: 指定上传成功的回调函数
    res: 响应体对象
    */
    handleAvatarSuccess(res, file) {
      console.log('handleAvatarSuccess', res)
      // 保存上传成功的图片url
      this.form.logoUrl = res.data
      // 手动去对当前图片进行校验
      // this.$refs.ruleForm.validateField('logoUrl')
      // 手动清除错误提示信息
      this.$refs.ruleForm.clearValidate('logoUrl')
    },
            
    /* 
    before-upload: 指定准备上传前的回调, 如果返回false不发请求
    限制图片类型和大小
    */
    beforeAvatarUpload(file) {
      const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt50KB = file.size / 1024 < 50;

      if (!isJPGOrPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt50KB) {
        this.$message.error('上传头像图片大小不能超过 50KB!');
      }
      return isJPGOrPNG && isLt50KB; // 只有2个条件都满足才返回true, 提交上传的请求
    },

    /* 
    显示修改界面
    */
    showUpdate (trademark) {

      // 保存trademark
      // this.form = trademark  // 2个引用变量指向同一个对象的问题
      this.form = {...trademark} // 生成一个拷贝对象给form
      // 显示dialog
      this.dialogFormVisible = true
    },

    /* 
    显示添加界面
    */
    showAdd () {
      // 重置数据
      this.form = {
        tmName: '',
        logoUrl: '',
      }
      // 显示dialog
      this.dialogFormVisible = true  // 此时界面还没有更新(显示)

      // 移除校验的错误提示信息  ==> 必须在dialog显示之后执行才会有效果
      this.$nextTick(() => {
        this.$refs.ruleForm.clearValidate()
      })
      
    },

    /* 
    异步获取指定页码的分页数据显示
    */
    async getTrademarks (page) {
      this.page = page
      try {
        // 请求获取列表前显示loading
        this.loading = true
        const result = await this.$API.trademark.getPageList(page, this.limit)
        // 请求获取列表成功后隐藏loading
        this.loading = false
        const {records, total} = result.data
        this.trademarks = records
        this.total = total
      } catch (error) {
        // 做错误提示之外的工作
      }
      
    },

    /* 
    每页数量发生改变的监听回调
    pageSize: 最新的每页数量
    */
    handleSizeChange (pageSize) {
      // 更新每页数量
      this.limit = pageSize
      // 获取第一页显示
      this.getTrademarks(1)
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>