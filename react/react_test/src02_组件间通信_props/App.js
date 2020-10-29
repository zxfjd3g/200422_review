import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import PropTest from './components/PropTest'

class App extends Component {
  // 初始化状态
  state = {
    num: 2
  }

  handleClick = () => {
    this.setState({
      num: this.state.num + 1
    })
  }

  addNum = (count) => {
    this.setState({
      num: this.state.num + count
    })
  } 

  render() {
    return (
      <div>
        <h2>App组件</h2>
        <p>{this.state.num}</p>
        <button onClick={this.handleClick}>更新</button>
        <br/>
        <PropTest num={this.state.num} addNum={this.addNum}/>
      </div>
    )
  }
}


export default App