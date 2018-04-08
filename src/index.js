import React from "react"
import ReactDOM from "react-dom" 
import {Router} from 'react-router-dom'

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

import App from "./routes.js"
import style from "./sass/style.scss"

ReactDOM.render((
  <Router history={history}>
      <App/>
   </Router> 
), document.getElementById('main'));
