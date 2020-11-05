import $ from 'jquery'

console.log($)
// 动态导入语法
document.getElementById("btn").onclick = function () {
  // math.js就会懒加载
  /*
    预加载：等待页面其他资源加载完毕，再偷偷加载后面需要使用的资源
    文档: https://webpack.docschina.org/guides/code-splitting/#prefetchingpreloading-modules

    preload 预加载，会在父 chunk 加载时，以并行方式开始加载（当前必须要使用）
    prefetch 预获取，prefetch chunk 会在父 chunk 加载结束后空闲时开始加载（当前还不需要使用）
    <link rel="prefetch" as="script" href="./js/math.chunk.js">
    <link rel="preload" as="script" href="./js/load.chunk.js">  // 有问题, 不生成

    页面加载JS资源优先级：
      普通 script
      其次 preload 
      接着 script 加上 defer / async 属性
      最后 prefetch
    
    问题：存在浏览器兼容性问题
  */
  // import(/* webpackChunkName: "math", webpackPrefetch: true */ "./math")
  import(/* webpackChunkName: "math" */ "./math")
    .then((math) => {
      console.log("模块加载成功")
      console.log(math.add(2, 3))
      console.log(math.mul(3, 3))
    })
    .catch((err) => {
      console.log("模块加载失败", err)
    })
}

// import(/* webpackChunkName: "load", webpackPreload: true */ "./load")
import(/* webpackChunkName: "load" */ "./load")
  .then(() => {
    console.log("load模块加载成功")
  })
  .catch((err) => {
    console.log("模块加载失败", err)
  })
