import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data, view2postion} from '../../manager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../manager/stateManager';

import ComponentEditor from '../ui_components/ComponentEditor';
import ToolBar from '../ui_components/ToolBar';
import { ResizeObserver } from 'resize-observer';
import { thisExpression } from '@babel/types';
// import $ from "jquery";

// 对于大部分差不多的视图，可以直接使用继承
export default class CommonView extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        selected_component: undefined,
        controller: undefined,
        width: '100%',
        height: '100%'
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

      const ro = new ResizeObserver((event, value)=>{
        const {diagram} = this
        const {height, width} = event[0].contentRect
        diagram.requestUpdate() 
        diagram.zoomToFit()
        this.setState({width: width, height: height})
      })
      ro.observe(this.refs.container)
    }

    render(){

      const {selected_component, width, height, controller} = this.state
      const {view_name} = this.props
      return (
        <div ref='container' style={{marginTop:10  ,position: 'relative', width: '100%', height: '100%'}}>
          {/* 上面的工具栏 */}
          <div style={{position: 'absolute', width:'100%', zIndex: 29}}>
            <ToolBar controller={controller}/>
          </div>
          <div style={{position: 'absolute', top: 50, width:width, 
            height:height==='100%'?'100%':height-50,
            zIndex: 28 }}
          >
            <div onClick={()=> stateManger.changeView(view_name)} className='diagram' ref="myDiagramDiv" />  
          </div> 
          { 
            selected_component && 
            <ComponentEditor parent={this} key={selected_component.data.key} component={selected_component} diagram={this.diagram}/> 
          }
          {/*<div className='overview' ref='myOverviewDiv'/>*/}
        </div>
      )
    }
  }