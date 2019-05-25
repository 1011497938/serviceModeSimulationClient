import React from 'react';
import './App.css';
import Test from './component/function_components/Test'
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'semantic-ui-css/semantic.min.css'

// 各种表单
import  TaskFormEdit from './component/ui_components/form_edit/TaskFormEdit'
import  ProviderFormEdit from './component/ui_components/form_edit/ProviderFormEdit'
import  StartFormEdit from './component/ui_components/form_edit/StartFormEdit'
import  ResourceFormEdit from './component/ui_components/form_edit/ResourceFormEdit'
import  CarrierFormEdit from './component/ui_components/form_edit/CarrierFormEdit'

import Nav from './component/ui_components/Nav'
import TopMenu from './component/ui_components/TopMenu'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
import dataStore from './dataManager/dataStore';
import WorkFlow from './component/function_components/WorkFlow';
import Value from './component/function_components/Value';
import Aim from './component/function_components/Aim';
import Teamwork from './component/function_components/TeamWork'

import CarrierResource from './component/function_components/CarrierResource';
import GlobalOverview from './component/function_components/GlobalOverview';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show_view_name: dataStore.default_view_name,

      selected_graph_object_type : undefined,
      selected_graph_object : undefined,
    }
  }

  componentDidMount(){
    this.onViewChange = autorun(()=>{
      const show_view_name = stateManger.show_view_name.get()
        // 这里有个bug
      this.setState({
        show_view_name: show_view_name
      })
    })
    this.onObjectChange = autorun(()=>{
      const signal = stateManger.selected_graph_object_needrefesh.get()
      const {selected_graph_object} = stateManger
      console.log(selected_graph_object, signal, this)
      this.setState({
        selected_graph_object: selected_graph_object,
      })
    })
  }

  // 在这里写控件和表格的对应关系
  renderForm(){
    const type2form = {
      'provider': ProviderFormEdit,
      'start':　StartFormEdit,
      'resource': ResourceFormEdit,
      'task': TaskFormEdit,
      'carrier': CarrierFormEdit,
    }
    const {selected_graph_object} = this.state
    
    if(!selected_graph_object)
      return undefined  //或者返回一个空表单

    let {key, category, eventType} = selected_graph_object.data
    if(category==='event'){
      category = eventType
    }
    const Component = type2form[category]
    // console.log(key, category, Component)
    if(!Component){
      return undefined
    }
    // console.log(Component)
    return <Component graph_object={selected_graph_object}/>
  }

  render(){
    const top_height = 50
    const {show_view_name} = this.state
    const needShow = name=>{
      // 设一个第一次限制渲染
      return name=== show_view_name?30:0
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
            <div style={{zIndex: needShow('全局视图')}} className='main-view 全局视图'>
              <GlobalOverview/>
            </div>
            <div style={{zIndex: needShow('协同生态视图')}} className='main-view 协同生态视图'>
              <Teamwork/>
            </div>   
            <div style={{zIndex: needShow('载体及资源视图')}} className='main-view 载体及资源视图'>
              <CarrierResource/>
            </div>
            <div style={{zIndex: needShow('服务价值视图')}} className='main-view 服务价值视图'>
              <Value/>
            </div>
            <div style={{zIndex: needShow('服务过程视图')}} className='main-view 服务过程视图'>
              <WorkFlow/>
            </div>
            <div style={{zIndex: needShow('服务目标视图')}} className='main-view 服务目标视图'>
              <Aim/>
            </div> 
            <div style={{zIndex: needShow('协同生态视图')}} className='main-view 协同生态视图'>
              <Teamwork/>
            </div> 
                          
          </div>
          <div style={{position: 'absolute', left: '80%', width:'20%', height:'100%',}}>
              {this.renderForm()}
          </div>

        </div>

      </div>
    )
  }
}

export default App;