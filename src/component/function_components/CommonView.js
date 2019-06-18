import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data, view2postion} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';

import ComponentEditor from '../ui_components/ComponentEditor';
import ToolBar from '../ui_components/ToolBar';
// import $ from "jquery";

// 对于大部分差不多的视图，可以直接使用继承
export default class CommonView extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        selected_component: undefined,
        controller: undefined
      }
    }

    init_graph(){
      const {view_name} = this.props

      const controller = new Controller(this.refs.myDiagramDiv, view_name)
      controller.init()
      const {diagram} = controller

      const {node, link} = view2data[view_name]
      diagram.model = new go.GraphLinksModel(node, link);
      // 双击弹出列表的功能
      diagram.addDiagramListener("ObjectContextClicked", e=> {
        var part = e.subject.part;
        // console.log(part)
        stateManger.select_component_ingo = part
        // console.log(stateManger.select_component_ingo)
        if(part instanceof go.Group || part instanceof go.Link)
          return
        // console.log(part, part.data, this)
        const {selected_component} = this.state
        // console.log(part.data.key, selected_component)
        if(selected_component!==part){
          this.setState({selected_component: part})
        }
      });

      diagram.addDiagramListener("ObjectSingleClicked", e=> {
        var part = e.subject.part;
        // console.log(part.data.key, part.data.id)
        stateManger.select_component_ingo = part
      });
      diagram.addModelChangedListener(function(evt) {
        if (evt.isTransactionFinished) 
          stateManger.overviewRefesh();
      });
  
      this.diagram = diagram
      this.setState({controller: controller})
    }
    componentDidMount(){
      this.init_graph()
    }

    render(){
      // console.log('render common view')
      const {selected_component} = this.state
      const {controller} = this.state
      // console.log(controller)
      return (
        <div style={{top: 0 ,position: 'relative', width: '100%', height: '100%'}}>
          {/* 上面的工具栏 */}
          <div className={'工具栏'} style={{position: 'absolute', width:'100%', top: 0, left: 0, zIndex: 29}}>
            <ToolBar controller={controller}/>
          </div>
          <div style={{position: 'relative', width:'100%', height:'100%',zIndex: 28, }}>
            <div className='diagram' ref="myDiagramDiv" style={{paddingLeft:'20px'}}/>  
          </div> 
          {/* 这里存放所有的表单 background:"lightyellow",*/}
          { 
            selected_component && 
            <ComponentEditor parent={this} key={selected_component.data.key} component={selected_component} diagram={this.diagram}/> 
          }
          {/* <div className='overview' ref='myOverviewDiv' />  */}
        </div>
      )
    }
  }
