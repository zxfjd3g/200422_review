
<script>
/* 
<template>
  <div>
    <h2 v-if="title">{{title}}</h2>
    <img :src="imgUrl" alt="logo" v-if="imgUrl">
  </div>
</template>
*/
export default {
  name: 'FC',
  props: ['title', 'imgUrl'], // 声明接收属性
  
  /*
  函数式组件:
    无状态
    无法实例化
    内部没有任何生命周期处理函数
    轻量,渲染性能高,适合只依赖于外部数据传递而变化的组件(展示组件，无逻辑和状态修改)
  */
  functional: true, // 当前是函数组件
  render (createElement, context) {

    // 不能通过this取props, 当前是函数组件, 没有组件实例
    const {title, imgUrl} = context.props  // 包含组件标签传入的所有标签属性

    // createElement('h2', title)

    const vNodes = []
    if (title) {
      vNodes.push(<h2>{title}</h2>)  // jsx ==> 创建虚拟DOM对象
    }
    if (imgUrl) {
      vNodes.push(<img src={imgUrl}/>)
    }

    // const lis = ['a', 'b', 'c'].map(item => <li>{item}</li>)

    return vNodes // 返回的是包含多个虚拟DOM的数组
  }
}
</script>

