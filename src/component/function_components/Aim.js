import React from 'react';
import * as go from 'gojs';
import Controller from './goController/Noname.ts'
import { Icon, Menu} from 'semantic-ui-react'
import ToolBar from '../ui_components/ToolBar';

// 5月14日，添加了过程流图, 谭思危
export default class WorkFlow extends React.Component{
   
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller


      const palette_node_datas = [
        { category: 'start1',key:"战略目标"},
        { category: 'task2',key:"情感"},
        { category: 'task1',key:"物理"},
        { category: 'task3',key:"数字"},
        { category: 'start2',key:"子目标"}

      ]
      palette.model = new go.GraphLinksModel(palette_node_datas);
      // controller.relayoutLanes();
      // console.log(palette.model.toJson())
    }

    componentDidMount(){
      this.init_graph()
    }

    render(){
      const contorl_bar_height = 40
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%', height: contorl_bar_height}}>
            <ToolBar controller={this.controller}/>
          </div>
          <div style={{position: 'absolute', top: contorl_bar_height, width:'100%', height:'100%',}}>
            <div ref='myPaletteDiv'  style={{position: 'relative',float:'left',top: 0, width:'15%', height:'100%', backgroundColor: '#859e9e'}}/>
            <div ref="myDiagramDiv"  style={{position: 'relative',float:'left',top: 0, width:'85%', height:'100%', backgroundColor: '#f7f7f7'}}/>      
          </div>
        </div>
      )
    }
  }

  // left: panel_width, 