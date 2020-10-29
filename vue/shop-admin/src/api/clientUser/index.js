import request from '@/utils/request'

export default {
  /* 
  获取会员分页列表(带搜索)
  */
  getPageList(page, limit, searchParams) {
    
    return request({
      url: `/admin/user/${page}/${limit}`,
      method: 'GET',
      params: searchParams
    })
  }
}

/* 

export const t = 1
const a = 1
const b = 2
exprot {
  a,
  b
}

{
  default: {},
  t: 1,
  a,
  b
}
*/