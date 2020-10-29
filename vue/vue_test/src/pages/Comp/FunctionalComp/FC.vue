
<script>
export default {
  name: 'FC',
  functional: true, // 当前是函数组件
  props: ['title', 'imgUrl'], // 声明接收属性
  
  /*
  函数组件:
    只能针对无状态(data)的组件
    不用创建实例对象, 支行更快
    可以没有根标签
  */
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

