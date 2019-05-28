import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';
const $ = go.GraphObject.make;
// 5月20日，添加了全局视图, 谭思危
export default class GlobalOverview extends React.Component{
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, '全局视图')
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data['全局视图']
      diagram.model = new go.GraphLinksModel(node, link);

      // console.log(new go.Rect(-10000,-10000,100,100),new go.Rect())
      // diagram.scrollToRect(new go.Rect(-20,0,2,2))
      // diagram.scrollToRect(new go.Rect(-20,0,2,2))
      // controller.diagram.scroll('pixel', 'up', 100)
      // controller.diagram.zoomToRect(new go.Rect(0,0,100,100))
      // Overview
      this.overview =
        $(go.Overview, this.refs.myOverviewDiv,  // the HTML DIV element for the Overview
          { observed: diagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
      
      this.diagram = diagram
    }

    componentDidMount(){
      this.init_graph()

      // this.refresh = autorun(()=>{
      //   console.log('总体示图刷新')
      //   const {controller} = this
      //   const need_refresh = stateManger.overview_need_refesh.get()
      //   if(!controller)
      //     return
      // // console.log(controller.nodeTemplateMap)
      //   const {node_array,link_array} = getAllDataArray()
      //   // console.log(node_array)
      //   controller.diagram.model = new go.GraphLinksModel(node_array,link_array);
      // })
    }

    render(){
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div style={{position: 'absolute', top: 0, width:'100%', height:'100%',}}>
            {/* <div className='palatte' ref='myPaletteDiv'  style={{}}/> */}
            <div className='diagram'ref="myDiagramDiv"  style={{}}/>  
          </div>
          <div className='overview' ref='myOverviewDiv'  
            style={{}}
          />  
        </div>
      )
    }
  }

  // left: panel_width, 