import React, { Component } from 'react'
import {Link, Route} from 'react-router-dom'
import Child from './Child'

export default class RouteComp2 extends Component {
  render() {
    return (
      <div>
        <h3>RouteComp2</h3>
        <Link to="/rc2/child">Show Child</Link>
        <hr/>
        <Route path="/rc2/child" component={Child}/>
      </div>
    )
  }
}
