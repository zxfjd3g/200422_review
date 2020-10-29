// import moment from 'moment'
import dayjs from 'dayjs'
import HintButton from './HintButton.vue'

/* 
安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。
如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

函数插件
*/
function myPlugin(Vue) {
  console.log('myPlugin()', Vue)
  // 扩展新语法 

  // 注册全局组件
  Vue.component(HintButton.name, HintButton)

  // 注册全局指令
  Vue.directive('upper-text', (el, binding) => {
    el.innerText = binding.value.toUpperCase()
  })   // v-text

  // 注册全局过滤器
  Vue.filter('date-format', (value) => {
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  })

  Vue.prototype.$xxx = function () {

  }
}



export default myPlugin