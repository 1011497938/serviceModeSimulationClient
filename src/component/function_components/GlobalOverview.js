import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data, view2postion} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';
import deepcopy from 'deepcopy'

const getNowView2Data = ()=>{
  const view2data = {}
  for(let view in view2controller){
      const controller = view2controller[view]
      const model = controller.diagram.model
      const node = deepcopy(model.nodeDataArray), link = deepcopy(model.linkDataArray)
      const view_position = view2postion[view]
      node.forEach(elm => {
        if (view === '全局视图') {
          return
        }
        if (!elm.group) {
          elm.group = view
        }
        const xy = go.Point.parse(elm.loc)

        xy.x += view_position[0]
        xy.y += view_position[1]
        if (view === '协同生态视图') {
          if (elm.category === 'consumer') {
            xy.x = -xy.x
          }
        }
        elm.loc = go.Point.stringify(xy)
      });
      link.forEach(elm=>{
        if (view === '全局视图') {
          return
        }
        delete elm.points
      })
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

      diagram.addModelChangedListener(function(evt) {
        // if (evt.isTransactionFinished) 
          // diagram.model.linkDataArray.forEach(elm=>{
          //   console.log(elm)
          // })
          // console.log(diagram.model.toJson())
      });

      // Overview
      // this.overview =
      //   $(go.Overview, this.refs.myOverviewDiv,  // the HTML DIV element for the Overview
      //     { observed: diagram, contentAlignment: go.Spot.Center });   // tell it which Diagram to show and pan

      diagram.zoomToFit()
      this.diagram = diagram
    }

    componentDidMount(){
      this.init_graph()

      this.refresh = autorun(()=>{
        // console.log('总体示图刷新')
        const {controller} = this
        const {diagram} = controller
        const show_view_name = stateManger.show_view_name.get()
        if(show_view_name==='全局视图'){
          if(!controller)
            return
          // console.log(controller.nodeTemplateMap)
          const {node,link} = getNowData()
          // console.log(node, link)
          // console.log(node_array)
          // diagram.startTransaction('refresh')
          diagram.model = new go.GraphLinksModel(node,link);  
          diagram.zoomToFit()        
          // diagram.commitTransaction('refresh')
        }
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