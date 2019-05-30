import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';
import deepcopy from 'deepcopy'

const getNowView2Data = ()=>{
  const view2data = {}
  for(let view in view2controller){
      const controller = view2controller[view]
      const model = controller.diagram.model
      const node = deepcopy(model.nodeDataArray), link = deepcopy(model.linkDataArray)
      node.forEach(elm => {
          if(!elm.group){
              elm.group = view
              // console.log(elm, )
          }
          
      });
      view2data[view] = {
          node: node,
          link: link,
      }
  }
  return view2data
}
const getNowData = ()=>{
  const view2data = getNowView2Data()
  let node = [], link = []
  for(let view in view2data){
      node = [...node, ...view2data[view].node]
      link = [...link, ...view2data[view].link]
  }
  return {
      node: node,
      link: link
  }
}

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
      // this.overview =
      //   $(go.Overview, this.refs.myOverviewDiv,  // the HTML DIV element for the Overview
      //     { observed: diagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan
      
      this.diagram = diagram
    }

    componentDidMount(){
      this.init_graph()

      this.refresh = autorun(()=>{
        console.log('总体示图刷新')
        const {controller} = this
        const need_refresh = stateManger.overview_need_refesh.get()
        if(!controller)
          return

        // console.log(controller.nodeTemplateMap)
        const {node,link} = getNowData()
        console.log(link)
        // console.log(node_array)
        controller.diagram.model = new go.GraphLinksModel(node,link);
      })
    }

    render(){
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div style={{position: 'absolute', top: 0, width:'100%', height:'100%',}}>
            {/* <div className='palatte' ref='myPaletteDiv'  style={{}}/> */}
            <div className='diagram'ref="myDiagramDiv"  style={{}}/>  
          </div>
          {/* <div className='overview' ref='myOverviewDiv'  
            style={{}}
          />   */}
        </div>
      )
    }
  }

  // left: panel_width, 