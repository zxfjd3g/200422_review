<template>
  <div>
    <!-- 动态组件 & 缓存组件 & 异步组件 -->
    <button @click="currentComp = 'Home'">Home</button>
    <button @click="currentComp = 'Posts'">Posts</button>
    <!-- 没有缓存 -->
    <component :is="currentComp" />

    <!-- 有缓存 -->
    <keep-alive :exclude="['Home']">
      <component :is="currentComp"/>
    </keep-alive>

    <button @click="loadModule">动态/异步加载模块</button>
   
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  // 静态import ==> 被引入的模块会打包到一起
  // import Home from './components/Home'
  // import {default as Home, fn as fn2, } from  './components/Home'
  // import Posts from './components/Posts'

  /* 
  动态import
  import(modulePath): 被引入的模块会被单独打包(code split)   es8的新语法
  () => import(modulePath): 配置的组件, 函数开始不调用, 当第一次访问对应的路由路径时才会执行 ==> 请求加载打包文件
  import()返回promise, promise成功的结果就是整体模块对象
  本质上: 可以利用import()实现对任意模块的懒加载
  */
  // const Home = import('./components/Home')
  const Home = () => import('./components/Home')
  const Posts = () => import('./components/Posts')

  setTimeout(() => {
    import('./components/Posts').then(module => {
      console.log(module)
    })
  }, 2000);


  export default {
    name: 'DynamicCacheAsync',

    data () {
      return {
        currentComp: 'Home' // 初始要显示的动态组件的名称
      }
    },

    methods: {
      loadModule () {
        import('./math').then(module => {
          console.log(module)
          console.log(module.sum(1, 2))
          console.log(module.default(1, 2))
        })
      }
    },

    components: {
      Home,
      Posts
    }
  }
</script>
