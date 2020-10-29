import React, {Component} from 'react'
import {
  Route, 
  Link, 
  NavLink,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import RouteComp1 from './pages/RouteComp1'
import RouteComp2 from './pages/RouteComp2'
import './App.css'


class App extends Component {
  // 初始化状态
  state = {
    num: 2
  }

  render() {
    return (
      <div>
        <h2>App组件</h2>
        <NavLink to="/rc1/2?count2=3">路由组件111</NavLink> &nbsp;&nbsp;&nbsp;
        <NavLink to="/rc2">路由组件222</NavLink> &nbsp;&nbsp;&nbsp;
        <button onClick={() => {
          this.props.history.push('/rc1/6', {count4: 5})
        }}>进入路由组件222</button>

        <hr/>

        {/* 
          向路由组件传递数据的方式
            1). params参数
            2). query参数(有点麻烦, 需要进一解析才可以用)
            3). props  (路由使用的render)
            4). state (1. 必须history模式, 2. 编程式路由导航)
        */}
        <Switch>
          <Redirect from="/" to="/rc1/1" exact/>
          <Route path="/rc1/:count1" component={RouteComp1} exact></Route>
          <Route path="/rc2" render={() => <RouteComp2 count3={4}/>}></Route>
          {/* 只要上面没有匹配, 直接匹配它 */}
          <Route render={()=> <h2>404</h2>}/>
        </Switch>

      </div>
    )
  }
}


export default withRouter(App)