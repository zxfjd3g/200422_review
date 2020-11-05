import React, {Component} from 'react'
import {
  NavLink,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'
import RouteComp1 from './pages/RouteComp1'
import RouteComp2 from './pages/RouteComp2'


class App2 extends Component {



  render () {
    return (
      <div>
        <h2>App</h2>

        {/* 
        向路由组件传递数据的3种方式
        1. params
        2. query: 需要进一步解析才能得到参数值
        3. state: 必须是BrowserRouter
        */}

        <NavLink to="/rc1/1?count2=2">路由组件1</NavLink>
        <NavLink to="/rc2">路由组件2</NavLink>

        <button onClick={() => {
          // this.props.history.push('/rc1/3?count2=4')
          this.props.history.push('/rc1/3?count2=4', {count3: 5})
        }}>查看路由组件1</button>

        <hr/>

        <Switch>
          {/* 访问项目根路由自动去rc1 */}
          <Redirect from="/" to="/rc1" exact></Redirect>
          <Route path="/rc1/:count1" component={RouteComp1} exact></Route>
          <Route path="/rc2" component={RouteComp2}></Route>
          {/* 不用单独定义组件 */}
          <Route render={() => <h2>404</h2>}></Route>
          
        </Switch>

      </div>
    )
  }
}



// export default App
export default withRouter(App2)