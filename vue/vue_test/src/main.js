import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import myPlugin from '@/pages/Reuse/vue-myPlugin'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.use(myPlugin) 
/* 
Vue.use()内部做了什么?
对象插件: 调用插件对象install方法(传入Vue)来安装插件(执行定义新语法的代码)
函数插件: 直接将其作为install来调用(传入Vue)来安装插件(执行定义新语法的代码)
*/

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store, // 所有组件都可以通过$store得到store对象
}).$mount('#app')

/* 
store对象的能力
  state
  getters
  dispatch(actionName, data)
  commit(mutationName, data)
*/