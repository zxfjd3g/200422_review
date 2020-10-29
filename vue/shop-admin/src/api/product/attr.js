/* 
商品平台属性相关接口请求函数模块
*/
import request from '@/utils/request'

export default {
  /*
  获取指定分类下的属性列表
  GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
  */
  getAttrList (category1Id, category2Id, category3Id) {
    return request.get(`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`)
  },

  /*
  获取指定属性ID的所有属性值列表
  GET /admin/product/getAttrValueList/{attrId}
  */
  getAttrValueList (attrId) {
    return request.get(`/admin/product/getAttrValueList/${attrId}`)
  },

  /* 
  添加和更新属性
  POST /admin/product/saveAttrInfo
  */
  saveAttr (attr) {
    return request.post('/admin/product/saveAttrInfo', attr)
  },

  /* 
  删除指定id的属性
  DELETE /admin/product/deleteAttr/{attrId}
  */
  deleteAttr (id) {
    return request.delete(`/admin/product/deleteAttr/${id}`)
  }
}