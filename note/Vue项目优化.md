### 1. Vue代码层面优化

####  v-for 遍历列表

指定非下标的唯一key

不同时使用 v-if

#### 图片资源懒加载

如使用v-lazyload

#### 路由懒加载

const Home = () => import('./pages/Home')

#### 第三方插件的按需引入

如: element-ui / vant 

#### 大数组优化1

当前组件如果只是为纯展示组件时，拿到数据后使用`Object.freeze()`将数据冻结，这样数据就无法进行响应变化。

```js
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users); // 这样数组内部就没有做数据劫持处理, 效率更高
  }
};
```



#### 大数组优化2

当组件处于非常长的列表时，数据过多导致DOM元素同样多，导致卡顿。

使用业界常用手段`虚拟列表`，只渲染可以看到的窗口的区域DOM。

虚拟列表的基本实现思路:

​    用vue的for循环渲染列表，自己手动加一个滚动条，然后通过监听scroll，

​    算出应该显示到第几个，通过计算属性截取显示的数据

真实项目可以使用第三方插件:

​	[vue-virtual-scroll-list](https://github.com/tangbc/vue-virtual-scroll-list)

#### 事件销毁

Vue 组件销毁时，实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。单独添加的监听事件是不会移除的，需要手动移除事件的监听，以免造成内存泄漏。

```
created() {
	document.addEventListener('scroll', this.onScroll, false);
},
beforeDestory() {
	document.removeEventListener('scroll', this.onScroll, false);
}
```

### 

### 2. webpack配置层面优化

#### 拆分打包与压缩



#### 资源预加载(prefetch)

#### 生产环境时不生成 SourceMap

productionSourceMap: false

减少打包文件

#### 文件名hash化

对打包文件名用上contenthash

#### 代码Tree Shaking



### 3. 基础的Web技术层面的优化

#### 开启 Gzip

- 下载: yarn add compression-webpack-plugin --dev

- vue.config.js

```
var CompressionWebpackPlugin = require('compression-webpack-plugin');
...
configureWebpack: config => {
  config.plugins.push(
      new CompressionWebpackPlugin({
          test: new RegExp('\\.(js|css)$'),
          threshold: 8192,
          minRatio: 0.8
      })
 )
```

- nginx.conf中

![image-20201104204956356](.\images\gzip.png)

