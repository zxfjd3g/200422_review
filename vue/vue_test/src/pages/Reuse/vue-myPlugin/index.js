// import moment from 'moment'
import dayjs from 'dayjs'
import HintButton from './HintButton.vue'
/* 
插件是对象
*/

const myPlugin = {
  install (Vue) {
    console.log('myPlugin install()')
  
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

    Vue.prototype.$fn = function () {}
  }
}

export default myPlugin