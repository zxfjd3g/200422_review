/*
    1. 自定义JS模块的懒加载
      在事件回调函数中使用import()动态加载自定义模块
    
    2. Vue路由组件懒加载
      // 注册返回动态import路由组件的函数路由组件
      const Foo = () => import('./Foo.vue')
      const router = new VueRouter({
        routes: [
          { path: '/foo', component: Foo }
        ]
      })
    
    3. React路由组件懒加载
      // 可以使用Suspence + lazy() + import()
      const Foo = lazy(() => import('./Foo.jsx'));
      <Suspence fallback={<Loading />}>
        <Router>
          <Route path="/foo" component={Foo} />
        </Router>
      <Suspence>
*/


// 动态导入语法
document.getElementById("btn").onclick = function () {
  // // 在点击的回调中才动态import  ==> math模块会懒加载
  import(/* webpackChunkName: "math" */"./math")
    .then((math) => {
      console.log("模块加载成功");
      console.log(math.add(2, 3));
      console.log(math.mul(3, 3));
    })
    .catch((err) => {
      console.log("模块加载失败", err);
    });
};
