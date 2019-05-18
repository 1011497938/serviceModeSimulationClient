import React from 'react';
import './App.css';
import Test from './component/function_components/Test'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'



import  TaskFormEdit from './component/ui_components/TaskFormEdit'
import Nav from './component/ui_components/Nav'
import TopMenu from './component/ui_components/TopMenu'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
import dataStore from './dataManager/dataStore';
import { Grid } from 'semantic-ui-react'

import Value from './component/function_components/Value';
import Aim from './component/function_components/Aim';
import WorkFlow from './component/function_components/WorkFlow'
import Teamwork from './component/function_components/TeamWork'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show_view_name: dataStore.default_view_name
    }
  }
  onViewChange = autorun(()=>{

    const show_view_name = stateManger.show_view_name.get()
      // 这里有个bug
    this.setState({
      show_view_name: show_view_name
    })
  })

  render(){
    const top_height = 60
    const {show_view_name} = this.state
    const needShow = name=>{
      return name=== show_view_name?'block':'none'
    }
    return (
      <div style={{width:'100%', height:'100%',}}>
        <div style={{position: 'absolute',width:'100%', top: 0, left: 0, height:top_height}}>
          <TopMenu/>
        </div>
        <div style={{position: 'absolute',width:'100%', height: '90%', top: top_height}}>
          <div style={{position: 'relative',float:'left', height:'100%', left: 0, width: '10%'}}>
            <Nav/>
          </div>

          {/* 各个go的面板 */}
          <div style={{position: 'relative',float:'left', width:'70%', height:'100%',}}>
            <div style={{display: needShow('服务价值视图'), height: '100%'}}>
              <Value/>
            </div>
            <div style={{display: needShow('服务过程视图'), height: '100%'}}>
              <WorkFlow/>
            </div>
            <div style={{display: needShow('服务目标视图'), height:'100%',}}>
              <Aim/>
            </div> 
            <div style={{display: needShow('协同生态视图'), height:'100%',}}>
              <Teamwork/>
            </div>              
          </div>
          <div style={{position: 'relative',float:'left', width:'20%', height:'100%',}}>
              <TaskFormEdit/>
          </div>

        </div>

      </div>
    )
  }
}

export default App;