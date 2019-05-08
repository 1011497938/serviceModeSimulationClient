import React from 'react';
import './App.css';
import Test from './component/Test'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import Nav from './component/Nav'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
class App extends React.Component{
  onViewChange = autorun(()=>{
    console.log('change to', stateManger.show_view_name.get())
  })

  render(){
    return (
      <div style={{position: 'absolute'}}>
        <div style={{position: 'absolute', height:'100%', top: 0, left: 0}}>
          <Nav/>
        </div>
        <div style={{position: 'absolute', top: 0, left: 270}}>
          <Test/>
        </div>
        {/*  */}
      </div>
    )
  }
}

export default App;
