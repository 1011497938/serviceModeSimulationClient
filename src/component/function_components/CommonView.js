import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';

import ComponentEditor from '../ui_components/ComponentEditor';
// import $ from "jquery";

// 对于大部分差不多的视图，可以直接使用继承
export default class CommonView extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        selected_component : undefined
      }
    }

    init_graph(){
      const {view_name} = this.props

      const controller = new Controller(this.refs.myDiagramDiv, view_name)
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data[view_name]
      diagram.model = new go.GraphLinksModel(node, link);
      // 双击弹出列表的功能
      diagram.addDiagramListener("ObjectDoubleClicked", e=> {
        var part = e.subject.part;
        if(part instanceof go.Group || part instanceof go.Link)
          return
        // console.log(part, part.data, this)
        const {selected_component} = this.state
        if(true||selected_component!==part){
          this.setState({selected_component: part})
        }
      });

      diagram.addModelChangedListener(function(evt) {

        if (evt.isTransactionFinished) 
          stateManger.overviewRefesh();
      });

      // // Overview
      // this.overview =
      //   $(go.Overview, this.refs.myOverviewDiv,  // the HTML DIV element for the Overview
      //     { observed: diagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
      
      this.diagram = diagram

      // $(this.refs.comp_form).draggable();
    }

    componentDidMount(){
      this.init_graph()
    }

    render(){
      const {selected_component} = this.state
      // console.log(this.diagram)
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div style={{position: 'absolute', top: 0, width:'100%', height:'100%',zIndex: 29}}>
            <div className='diagram' ref="myDiagramDiv"  style={{}}/>  
          </div>
          {/* 这里存放所有的表单 */}
          { 
            selected_component && 
            <ComponentEditor component={selected_component} diagram={this.diagram}/> 
          }
          <div className='overview' ref='myOverviewDiv'  /> 
        </div>
      )
    }
  }

