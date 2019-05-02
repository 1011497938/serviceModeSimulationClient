import React from 'react';
import './App.css';
import Test from './component/Test'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Nav from './component/Nav'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
class App extends React.Component{
  onViewChange = autorun(()=>{
    console.log('change to', stateManger.show_view_name.get())
  })

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
