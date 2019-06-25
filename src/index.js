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
const hashHistory = createHashHistory();
const MyRouter = ()=> (
    <Router history={hashHistory}>
        <div style={{width:'100%', height:'100%'}}>
            <Route match exact path="/" component={App}/>
            <Route match path="/login" render={() => <h1>Login</h1>}/>
            <Route match exact path="/center" component={Center}/>
        </div>
    </Router>
)

ReactDOM.render(<MyRouter/>, document.getElementById('root'));


serviceWorker.unregister();