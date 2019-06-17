import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import {view2controller} from './goController/GraphController.ts'
import dataStore,{view2data, view2postion} from '../../dataManager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../dataManager/stateManager';
import deepcopy from 'deepcopy'


// console.log(view2data.协同生态视图.node)
const getNowView2Data = ()=>{
  const view2data = {}
  for(let view in view2controller){
      const controller = view2controller[view]
      const model = controller.diagram.model;
      const node = deepcopy(model.nodeDataArray), link = deepcopy(model.linkDataArray)
      const view_position = view2postion[view]
     
    
      node.forEach(elm => {
        if (view === '全局视图'){
               return
        }
        if (!elm.group) {
          elm.group = view
        }

        const xy = go.Point.parse(elm.loc)
        elm.key = view + elm.key
        xy.x += view_position[0]
        xy.y += view_position[1]
        if (view ==='协同生态视图'){
          if (elm.category==='consumer'){
            xy.x = -xy.x
          }
        }
        elm.loc = go.Point.stringify(xy)
      });
      link.forEach(elm=>{
        if (view ==='全局视图') {
             return
        }

        elm.from = view + elm.from
        elm.to = view + elm.to
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

  let node = [],link = [];
  for(let view in view2data){
      node = [...node, ...view2data[view].node]
      link = [...link, ...view2data[view].link]
  }
  return {
      node: node,
      link: link
  }
}
const itemheight=130;
const itemwidth=260;
const $ = go.GraphObject.make;
export default class GlobalOverview extends React.Component{

    init_graph1(){
      const controller= new Controller(this.refs.myDiagramD1iv1, '协同生态视图')
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data['协同生态视图'];
      diagram.model = new go.GraphLinksModel(node, link);

      diagram.addModelChangedListener(function(evt) {
      });
      diagram.zoomToFit()
      this.diagram = diagram
    }
   init_graph2(){
      const controller= new Controller(this.refs.myDiagramD1iv5, '载体及资源视图')
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data['载体及资源视图'];
      diagram.model = new go.GraphLinksModel(node, link);

      diagram.addModelChangedListener(function(evt) {
      });
      diagram.zoomToFit()
      this.diagram = diagram
    }
    init_graph3(){ //服务价值视图还没有视图
      const controller= new Controller(this.refs.myDiagramD1iv2, '协同生态视图')
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data['协同生态视图'];
      diagram.model = new go.GraphLinksModel(node, link);

      diagram.addModelChangedListener(function(evt) {
      });
      diagram.zoomToFit()
      this.diagram = diagram
    }
    init_graph4(){
      const controller= new Controller(this.refs.myDiagramD1iv4, '服务过程视图')
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data['服务过程视图'];
      diagram.model = new go.GraphLinksModel(node, link);

      diagram.addModelChangedListener(function(evt) {
      });
      diagram.zoomToFit()
      this.diagram = diagram
    }
    init_graph5(){
      const controller= new Controller(this.refs.myDiagramD1iv3, '服务目标视图')
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data['服务目标视图'];
      diagram.model = new go.GraphLinksModel(node, link);

      diagram.addModelChangedListener(function(evt) {
      });
      diagram.zoomToFit()
      this.diagram = diagram
    }
  init_graph6(){
      const controller= new Controller(this.refs.myDiagramD1iv6, '协同生态视图')
      controller.init()
      this.controller = controller
      const {diagram} = controller

      const {node, link} = view2data['协同生态视图'];
      diagram.model = new go.GraphLinksModel(node, link);

      diagram.addModelChangedListener(function(evt) {
      });
      diagram.zoomToFit()
      this.diagram = diagram
    }
    componentDidMount(){
      this.init_graph1()
      this.init_graph2()
      this.init_graph3()
      this.init_graph4()
      this.init_graph5()
      this.init_graph6()
      this.refresh = autorun(()=>{

        const {controller} = this

        const {diagram} = controller
        const show_view_name = stateManger.show_view_name.get()
        if(show_view_name==='协同生态视图'){
          if(!controller)
            return;
          const {node,link} = getNowData()
       
       
       
        }
      })
    }

    render(){
      return (
        <div style={{background:"lightyellow",width:"100%",height:"900px"}}>
          <div ref='box' className='box'>
            <div className='itembox' >
                 <div className='diagram' ref="myDiagramD1iv1" style={{height:itemheight,width:itemwidth}} />
                 <h5 >消费者</h5>
            </div>
            <div style={{height:900,display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
                  <div className='itembox'>
                       <div className='diagram' ref="myDiagramD1iv2" style={{height:itemheight,width:itemwidth}}/>
                       <h5 >服务价值视图</h5>
                  </div>
                  <div className='itembox' >
                       <div className='diagram' ref="myDiagramD1iv3" style={{height:itemheight,width:itemwidth}}/>
                       <h5 >服务目标视图</h5>
                  </div>                                      
                  <div className='itembox'  >
                       <div className='diagram' ref="myDiagramD1iv4" style={{height:itemheight,width:itemwidth}}/>
                       <h5 >服务过程视图</h5>
                  </div>                                      
                  <div className='itembox' >
                       <div className='diagram' ref="myDiagramD1iv5" style={{height:itemheight,width:itemwidth}}/>
                       <h5 >载体及资源视图</h5>
                  </div>                                      
            </div>
            <div className='itembox'  >
                 <div className='diagram' ref="myDiagramD1iv6" style={{height:itemheight,width:itemwidth}}/>
                 <h5 >生产者</h5>
            </div>          
             </div>
        </div>
      )
    }
  }

