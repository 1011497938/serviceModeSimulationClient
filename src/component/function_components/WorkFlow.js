import React from 'react';
import * as go from 'gojs';
import Controller from './goController/WorkFlow.ts'
import { Icon, Menu} from 'semantic-ui-react'
import ToolBar from '../ui_components/ToolBar';

// 5月14日，添加了过程流图, 谭思危
export default class WorkFlow extends React.Component{
   
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller
      const node_datas = [
        { key: "why", text: "Pool", isGroup: true, },
        { key: "Pool1", text: "Pool", isGroup: true, category: "Pool" },
        { key: "Lane1", text: "Lane1", isGroup: true, group: "Pool1", color: "lightblue", category: "lane"},
        { key: "Lane2", text: "Lane2", isGroup: true, group: "Pool1", color: "lightgreen", category: "lane"},
        { key: "Lane3", text: "Lane3", isGroup: true, group: "Pool1", color: "lightyellow", category: "lane"},
        { key: "Lane4", text: "Lane4", isGroup: true, group: "Pool1", color: "orange" , category: "lane"},
        { key: "Alpha", color: "lightblue", category: 'task', group: 'why'},
        { key: "Alpha5", color: "lightblue", category: 'task', group: 'Lane1'},
        { key: "Alpha6", color: "lightblue", category: 'task', group: 'Lane1'},
        { key: "Alpha1", color: "lightblue", category: 'start', group: 'Lane2'},
        { key: "Alpha2", color: "lightblue", category: 'end', group: 'Lane2'},
        { key: "Alpha3", color: "lightblue", category: 'parallel', group: 'Lane3'},
        { key: "Alpha4", color: "lightblue", category: 'exclusive', group: 'Lane1'},
        { key: "Alpha4", color: "lightblue", category: 'exclusive', group: 'Lane4'},
      ]
      diagram.model = new go.GraphLinksModel(node_datas,[
        {from: 'Alpha', to: 'Alpha1', category: 'arrowlink'}
      ]);

      const palette_node_datas = [
        { key: "Alpha6", color: "lightblue", category: 'task'},
        { key: "Alpha1", color: "lightblue", category: 'start'},
        { key: "Alpha2", color: "lightblue", category: 'end'},
        { key: "Alpha3", color: "lightblue", category: 'parallel'},
        { key: "Alpha4", color: "lightblue", category: 'exclusive'},
      ]
      palette.model = new go.GraphLinksModel(palette_node_datas);
      controller.relayoutLanes();
      // console.log(palette.model.toJson())
    }

    componentDidMount(){
   
      this.init_graph()
    }

    render(){
      const contorl_bar_height = 60
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