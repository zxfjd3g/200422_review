/* 
路由器对象模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
import {Message} from 'element-ui'

// 声明使用
Vue.use(VueRouter)

// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// // 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  console.log('push()', onComplete, onAbort)
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete===undefined && onAbort===undefined) {
    return originPush.call(this, location).catch(() => {})
    // return originPush.call(this, location).catch(() => {})
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete===undefined && onAbort===undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}

const router = new VueRouter({ // 配置对象
  mode: 'history', // 没有#
  // 项目中的多个路由配置
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 指定路由跳转后滚条的坐标
    return { x: 0, y: 0 }
  }
})

/* a.只有登陆了, 才能查看交易/支付/个人中心界面 */
/* 
需要进行登陆检查的路由路径的数组
需要检查的路径是以其中某个开头的路径
*/
const checkPaths = ['/trade', '/pay', '/center'] 

// 注册全局前置守卫
router.beforeEach(async (to, from, next) => {
  console.log('全局 前置守卫')

  // 得到目标路由路径
  const targetPath = to.path
  // checkPaths.includes(targetPath)
    // 字符串的方法startsWith() / indexOf()
  const needCheck = checkPaths.some(path => targetPath.startsWith(path))   // /paysuccess /center/myorder
  const {token, userInfo} = store.state.user
  if (userInfo.name) {// 如果已经登陆了, 直接放行
    next()
    return
  }
  // 如果目标路径是需要检查路径
  try {
    if (needCheck) {
      if (token){
        await store.dispatch('getUserInfo')
        next()
      } else {
        // 当前没登陆且前面也没有登陆过, 强制跳转到login
        next('/login?redirect='+to.path)  // 携带目标路径的参数数据
      }
    } else { // 如果目标路径是不需要检查路径, 直接放行
      if (token) {
        store.dispatch('getUserInfo')
      }
      next()
    }
  } catch (error) {
    // 重置token
    await store.dispatch('user/logout')
    // 提示错误信息
    Message.error(error.message || 'Has Error')
    // 跳转到登陆页面, 并携带原本要跳转的路由路径, 用于登陆成功后跳转
    next(`/login?redirect=${to.path}`)
  }
})

export default router