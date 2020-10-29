/* 
包含品牌管理相关接口请求函数
*/
import request from '@/utils/request'

const api_name = '/admin/product/baseTrademark'

export default {

  /* 
  根据id获取品牌
  GET /admin/product/baseTrademark/get/{id}
  */
  getById (id) {
    // return request({
    //   url: `${api_name}/get/${id}`,
    //   // method: 'get'
    // })
    // return request.get(`${api_name}/get/${id}`)
    return request(`${api_name}/get/${id}`)
  },

  /* 
  获取所有品牌的列表
  GET /admin/product/baseTrademark/getTrademarkList
  */
  getList() {
    return request('/admin/product/baseTrademark/getTrademarkList')
  },


  /* 
  删除指定id的品牌
  DELETE /admin/product/baseTrademark/remove/{id}
  */
  remove(id) {
    return request.delete(`/admin/product/baseTrademark/remove/${id}`)
  },

  /* 
  添加品牌
  POST /admin/product/baseTrademark/save
  trademark的结构: {logoUrl, tmName}
  */
  add (trademark) {
    return request.post('/admin/product/baseTrademark/save', trademark)
  },



  
  /* 
  更新品牌
  PUT /admin/product/baseTrademark/update
  trademark的结构: {id, logoUrl, tmName}
  */
  update (trademark) {
    return request.put('/admin/product/baseTrademark/update', trademark)
  },

  /* 
  添加/更新品牌
  */
  save (trademark) {
    if (trademark.id) {
      return request.put('/admin/product/baseTrademark/update', trademark)
    } else {
      return request.post('/admin/product/baseTrademark/save', trademark)
    }
  },

  /* 
  获取品牌分页列表
  GET /admin/product/baseTrademark/{page}/{limit}
  */
  getPageList (page, limit) {
    return request(`/admin/product/baseTrademark/${page}/${limit}`)
  },
}
