import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PropTest extends Component {

  static propTypes = {
    num: PropTypes.number.isRequired,
    addNum: PropTypes.func.isRequired,
  }


  render() {
    return (
      <div>
        <h3>PropTest组件</h3>
        <p>props num: {this.props.num}</p>
        <button onClick={() => {
          this.props.addNum(3)
        }}>更新num</button>
      </div>
    )
  }
}
