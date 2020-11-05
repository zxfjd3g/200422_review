import React, { Component } from 'react'

export default class RouteComp1 extends Component {
  render() {
    return (
      <div>
        <h3>RrouteComp1</h3>
        <p>params count1: {this.props.match.params.count1}</p>
        <p>query count2: {this.props.location.search}--需要进一步解析</p>
        <p>state count3: {this.props.location.state && this.props.location.state.count3}</p>
      </div>
    )
  }
}

/* 
history: 包含路由跳转相关的方法
location: 包含一些数据属性
  pathname: 请求的path   /xxx/1
  search: 包含所有query参数的字符串   ?name=tom&age=12
  state: 通过push/replace传递过来的对象
match
  params: 包含所有params参数的对象   {count1: 1}
*/