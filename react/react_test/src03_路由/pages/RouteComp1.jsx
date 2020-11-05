import React from 'react'

export default function RouteComp1(props) {
  return (
    <div>
      <h3>RouteComp111</h3>
      <p>params count1: {props.match.params.count1}</p>
      <p>query count2: {props.location.search}(还需要手动进一解析)</p>
      <p>state count4: {props.location.state && props.location.state.count4}</p>
    </div>
  )
}
