import React, {Component} from 'react'
import PropTest from './components/PropTest'

class App2 extends Component {

  state = {
    count: 0
  }

  incrementCount = (num) => {
    this.setState({
      count: this.state.count + num
    })
  }


  render () {
    const {count} = this.state
    return (
      <div>
        <h2>App: {this.state.count}</h2>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>更新</button>

        <hr/>

        <PropTest count={count} incrementCount={this.incrementCount}/>
      </div>
    )
  }
}



// export default App
export default App2