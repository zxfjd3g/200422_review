/* 
函数组件: 
  不能有自己的state, 不会创建组件对象, 没有this
类组件
  可以有自己的state, 会创建组件对象, 有this
*/
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

// function App(props) {
//   return (
//     <div>
//       <h2>App组件</h2>
//     </div>
//   )
// }

class App extends Component {
  // 初始化状态
  state = {
    num: 2
  }

  constructor (props) {
    super(props)
    console.log('创建组件实例对象')
  }

  componentWillMount () {
    console.log('componentWillMount--将要挂载显示')
  }

  // 在此执行一次异步任务: 启动定时器/发ajax
  componentDidMount () {
    console.log('componentDidMount--已经挂载显示')
    this.intervalId = setInterval(() => {
      this.setState({
        num: this.state.num + 1
      })
      // this.setState(state => ({num: state.num + 1}))
    }, 1000);

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }, 5000);
  }

  componentWillUpdate () {
    console.log('componentWillUpdate--将要更新显示')
  }


  componentDidUpdate () {
    console.log('componentDidUpdate--已经更新显示')
  }

  componentWillUnmount () {
    console.log('componentWillUnmount--将要卸载')
    clearInterval(this.intervalId)
  }

  render() {
    console.log('render()')
    return (
      <div>
        <h2>App组件-</h2>
        <p>{this.state.num}</p>
      </div>
    )
  }
}


export default App