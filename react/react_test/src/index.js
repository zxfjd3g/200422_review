import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, BrowserRouter} from 'react-router-dom'

import App from './App'
import './base.css'

ReactDOM.render((
  <BrowserRouter>
    <App/>
  </BrowserRouter>
), document.getElementById('root'))
