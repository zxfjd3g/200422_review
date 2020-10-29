import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter, 
  BrowserRouter, 
  Route, 
  Link, 
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'

import App from './App'

// 将App渲染到页面上
ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'))