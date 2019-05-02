import React from 'react';
import './App.css';
import Test from './component/Test'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Nav from './component/Nav'
class App extends React.Component{
  render(){
    return (
      <div>
        <Nav/>
        <Test/>
      </div>
    )
  }
}

export default App;
