import React from 'react';
import * as go from 'gojs';
import Controller from './WorkFlow.ts'
import { Icon, Menu} from 'semantic-ui-react'

import ToolBar from '../ui_components/ToolBar';

export default class WorkFlow extends React.Component{
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller
      const node_datas = [
        { key: "控件1", color: "lightblue", category: 'task', },
        { key: "控件2", color: "lightblue", category: 'start', },
        { key: "控件3", color: "lightblue", category: 'end', },
        { key: "控件4", color: "lightblue", category: 'parallel', },
        { key: "控件5", color: "lightblue", category: 'exclusive', },
      ]

      palette.model = new go.GraphLinksModel(node_datas);
    }

    componentDidMount(){
         this.init_graph();
    }

    render(){
      const contorl_bar_height = 60
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%', height: contorl_bar_height}}>
            <ToolBar/>
          </div>
          <div style={{position: 'absolute', top: contorl_bar_height, width:'100%', height:'100%',}}>
            <div ref='myPaletteDiv'  style={{position: 'relative',float:'left',top: 0, width:'15%', height:'100%', backgroundColor: '#859e9e'}}/>
            <div ref="myDiagramDiv"  style={{position: 'relative',float:'left',top: 0, width:'85%', height:'100%', backgroundColor: '#f7f7f7'}}/>      
          </div>
        </div>
      )
    }
  } 