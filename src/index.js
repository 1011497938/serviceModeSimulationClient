import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './static/iconfont/iconfont.css';
import Center  from './component/function_components/Center';
import {
    Router, Route
} from 'react-router-dom'

import  createHashHistory from 'history/createBrowserHistory';
import Home from './Home';
import Login from  './component/function_components/Login'
import Model from  './component/function_components/Model'
import Rigister from './component/function_components/Rigister'

const hashHistory = createHashHistory();
const MyRouter = ()=> (
    <Router history={hashHistory}>
        <div style={{width:'100%', height:'100%'}}>
            <Route match exact path="/" component={App}/>
            <Route match exact path="/center" component={Center}/>
            <Route match exact path="/home" component={Home}/>
            <Route match exact path="/login" component={Login}/>
            <Route match exact path="/center/model" component={Model}/>
            <Route match exact path="/rigister" component={Rigister}/>

        </div>
    </Router>
)

ReactDOM.render(<MyRouter/>, document.getElementById('root'));


serviceWorker.unregister();