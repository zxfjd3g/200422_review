import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PropTest extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    incrementCount: PropTypes.func.isRequired,
  }

  render() {
    const {count}  = this.props
    return (
      <div>
        <h3>PropTest: {count}</h3>
        <button onClick={() => this.props.incrementCount(2)}>更新</button>
      </div>
    )
  }
}
