import React from 'react';
import './App.css';
// import Test from './component/function_components/Test'
import { Icon, Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import {view2controller} from './component/function_components/goController/GraphController.ts'

// 各种表单
import  TaskFormEdit from './component/ui_components/form_edit/TaskFormEdit'
import  ProviderFormEdit from './component/ui_components/form_edit/ProviderFormEdit'
import  StartFormEdit from './component/ui_components/form_edit/StartFormEdit'
import  ResourceFormEdit from './component/ui_components/form_edit/ResourceFormEdit'
import  CarrierFormEdit from './component/ui_components/form_edit/CarrierFormEdit'

import Nav from './component/ui_components/Nav'
import MyPalatte from './component/function_components/MyPalatte'
import { autorun } from 'mobx';
import stateManger from './dataManager/stateManager';
import dataStore from './dataManager/dataStore';

import GlobalOverview from './component/function_components/GlobalOverview';
import CommonView from './component/function_components/CommonView'
import LoginModal from './component/ui_components/LoginModal';
import SelectLine from './component/ui_components/SelectLine';


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
      return name=== show_view_name?29:0
    }
    const view2Component = {
      '全局视图': GlobalOverview,
    //  '协同生态视图':,
    //  '载体及资源视图':,
    //  '服务价值视图':,
    //  '服务过程视图':,
    //  '服务目标视图':
    }

    return (
      <div style={{width:'100%', height:'100%', overflow: 'hidden'}}>
        {/* 左上角的logo */}
        <div  style={{position: 'absolute', top:21, left:60, zIndex: 31, fontSize: 20, fontWeight: 'blod'}}>服务模式</div>
        {/* 各个go的面板 */}
        <div style={{position: 'absolute', width:'100%', height:'100%', top:0, left:0}}>
          {dataStore.view_names.map(elm=>{
            const ViewComponent = view2Component[elm] || CommonView
            return (
            <div key={elm} style={{zIndex: needShow(elm)}} className={'main-view '  + elm}>
              {<ViewComponent view_name={elm}/>}
            </div>
            )
          })}
        </div>
        <div className='控件栏' style={{position: 'absolute', top:'17%', left:60, zIndex: 31}}>
          <MyPalatte/>
        </div>

        {/* 选择视图 */}
        <div style={{position: 'absolute', left:60, height: 50, top: '10%', zIndex: 31}}>
          <Nav/>
        </div>
        <div style={{position: 'absolute', right:'3%', height: 50, top: 20, zIndex: 31}}>
          <LoginModal/>
        </div>


        <div style={{
          borderRight:'2px solid black',
          position:'absolute', 
          top: '10%', right: '10%', 
          height: 110, width: 50, 
          zIndex:31}}
        >
          {/* 后退 */}
          <div className='tool-icon' style={{top: 5}}>
            <Icon className='isButtom' circular inverted name='angle left' size='large' 
            onClick={()=>{
              stateManger.show_view_controller.diagram.undoManager.undo()
            }}/>
          </div>
          {/* 前进 */}
          <div className='tool-icon' style={{top: 60, right: 8}}>
            <Icon className='isButtom' circular name='angle right' size='small'
            onClick={()=>{
              stateManger.show_view_controller.diagram.undoManager.redo()
            }}/>
          </div>
          {/* <div style={{left: 55, top:5, position: 'absolute'}}>
            <span>历史记录</span>
          </div> */}
        </div>
        
        {/* 下半部分工具栏， 有放大缩小之类的*/}
        <div style={{position:'absolute', top: '40%', right: '10%'}}>
          <div className='tool-icon' style={{top: 0, right: 0}}>
            <Icon className='isButtom' name='expand' size='large'/>
          </div>
          <div className='tool-icon' style={{top: 50, right: 0}}>
            <Icon className='isButtom' name='copy' size='large'/>
          </div>
          <div className='tool-icon' style={{top: 50, right: 40}}>
            <Icon className='isButtom' name='paste' size='large'/>
          </div>
          <div className='tool-icon' style={{top: 100, right: 0}}>
            <Icon className='isButtom' name='delete' color='teal' size='large'/>
          </div>
        </div>
        
        {/* 选择连线 */}
        <div style={{position:'absolute', top: '10%', right: '20%', zIndex:30}}>
          <SelectLine/>
        </div>

        {/* 提交保存新建按钮 */}
        <div style={{position: 'absolute', right:200, width: 400,height: 60, bottom: 0, zIndex: 31}}>
          {greenButton('保存', ()=>{}, {})}
          {/* {greenButton('新建', ()=>{}, {})}
          {greenButton('仿真', ()=>{}, {})} */}
        </div>
      </div>
    )
  }
}
const greenButton = (text, handleClick, style)=>{
  return (
    <div 
      className='isButtom' 
      style={Object.assign({
        width: 100, height: 60, bottom: 0, position: 'relative',
        textAlign: 'center', fontSize: 15, lineHeight: '50px',
        background: '#00b5ad',
        float: 'right', margin: 10,
        color: 'white'
      }, 
      style)}
    >
      {text}
    </div>
  )
}




export default App;