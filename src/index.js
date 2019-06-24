import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './static/iconfont/iconfont.css';
import {
    Router, Route
} from 'react-router-dom'
import  createHashHistory from 'history/createBrowserHistory';
const hashHistory = createHashHistory();
const MyRouter = ()=> (
    <Router history={hashHistory}>
        <div style={{width:'100%', height:'100%'}}>
            <Route match path="/app" component={App}/>
            <Route match path="/login" render={() => <h1>Login</h1>} />
            <Route match path="/user" render={() => <h1>User</h1>}/>
        </div>
    </Router>
)

ReactDOM.render(<MyRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();