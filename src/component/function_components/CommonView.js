import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';
const $ = go.GraphObject.make;
// 对于大部分差不多的视图，可以直接使用继承
export default class CommonView extends React.Component{
    init_graph(){
      const {view_name} = this.props

      const controller = new Controller(this.refs.myDiagramDiv, view_name)
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data[view_name]
      diagram.model = new go.GraphLinksModel(node, link);

      // Overview
      this.overview =
        $(go.Overview, this.refs.myOverviewDiv,  // the HTML DIV element for the Overview
          { observed: diagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
      
      this.diagram = diagram
    }

    componentDidMount(){
      this.init_graph()
    }

    render(){
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div style={{position: 'absolute', top: 0, width:'100%', height:'100%',}}>
            <div className='diagram' ref="myDiagramDiv"  style={{}}/>  
          </div>
          <div className='overview' ref='myOverviewDiv'  />  
        </div>
      )
    }
  }

  // left: panel_width, 