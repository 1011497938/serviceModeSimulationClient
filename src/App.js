import React from 'react';
import './App.css';
import Test from './component/Test'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'
import Nav from './component/Nav'
import TopMenu from './component/TopMenu'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
import dataStore from './dataManager/dataStore';
class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show_view_name: dataStore.view_names[0]
    }
  }
  onViewChange = autorun(()=>{
    const show_view_name = stateManger.show_view_name.get()
    // 这里有个bug
    console.log('change to', show_view_name)
    this.setState({show_view_name: show_view_name})
  })



  render(){
    const top_height = 60
    const {show_view_name} = this.state
    const needShow = name=>{
      return name=== show_view_name?'block':'none'
    }
    return (
      <div style={{position: 'absolute', width:'100%', height:'100%'}}>
        <div style={{position: 'absolute', width:'100%', top: 0, left: 0}}>
          <TopMenu/>
        </div>
        <div style={{position: 'absolute', height:'100%', top: top_height, left: 0}}>
          <Nav/>
        </div>
        <div style={{position: 'absolute', top: top_height, left: 270, width:'100%', height:'100%',display: needShow('全局视图')}}>
          <Test/>
        </div>
      </div>
    )
  }
}

export default App;
