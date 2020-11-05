import React, {Component} from 'react'
import ReactDOM from 'react-dom'
/* 
定义组件
1. 函数组件: 没有this, 没有state, 没有生命周期
2. 类组件: 有this, 可以有state, 有生命周期
*/
function App(props) {
  return (
    <div>
      <h2>App</h2>
      <p>{props.name}</p>
    </div>
  )
}

class App2 extends Component {

  state = {
    count: 0
  }

  constructor(props) {
    super(props)
    console.log('constructor() 创建组件实例对象')
  }

  componentWillMount () {
    console.log('componentWillMount() 组件将要挂载')
  }

  componentDidMount () {
    console.log('componentDidMount() 组件已经挂载')
    this.intervalId = setInterval(() => {
      console.log('-----')
      this.setState({
        count: this.state.count + 2
      })
    }, 2000)
  }
  componentWillUpdate () {
    console.log('componentWillUpdate() 界面将要更新')
  }

  componentDidUpdate() {
    console.log('componentWillMount() 界面已经更新')
  }

  componentWillUnmount () {
    console.log('componentWillUnmount, 组件将要卸载')
    clearInterval(this.intervalId)
  }


  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  handleDoubleClick = () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  }

  render () {
    console.log('render()') // n + 1
    return (
      <div>
        <h2>App</h2>
        <p>prop name: {this.props.name}</p>
        <p onClick={this.handleClick} onDoubleClick={this.handleDoubleClick}>state count: {this.state.count}</p>
      </div>
    )
  }
}



// export default App
export default App2