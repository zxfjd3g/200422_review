// import moment from 'moment'
import dayjs from 'dayjs'
import HintButton from './HintButton.vue'
/* 
插件是函数
*/
function myPlugin(Vue) {
  console.log('myPlugin')

  // 注册全局组件
  Vue.component(HintButton.name, HintButton)

  // 自定义过滤器
  Vue.filter('date-format', (value) => {
    // return moment(value).format('YYYY-MM-DD HH:mm:ss')
    return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  })
  // 自定义指令
  Vue.directive('upper-text', (el, binding) => {
    el.innerText = binding.value.toUpperCase()
  })
}

export default myPlugin