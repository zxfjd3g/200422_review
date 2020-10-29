import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 1. 创建路由器
const router = new VueRouter({
	// mode: 'history',
	mode: 'hash',
	routes,
})

// 2. 暴露
export default router
