import moment from 'moment'
import HintButton from './HintButton.vue'

/* 
对象插件
*/
const myPlugin = {
  // 当Vue.use(插件)时自动调用
  install (Vue) {
    console.log('install()', Vue)
    // 扩展新语法 

    // 注册全局组件
    Vue.component(HintButton.name, HintButton)

    // 注册全局指令
    Vue.directive('upper-text', (el, binding) => {
      el.innerText = binding.value.toUpperCase()
    })   // v-text

    // 注册全局过滤器
    Vue.filter('date-format', (value) => {
      return moment(value).format('YYYY-MM-DD HH:mm:ss')
    })

    Vue.prototype.$xxx = function () {
      
    }

  }
}

export default myPlugin