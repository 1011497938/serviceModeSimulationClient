import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GlobalOverview.ts' 
import { Icon, Menu} from 'semantic-ui-react'
import ToolBar from '../ui_components/ToolBar';
import dataStore from '../../dataManager/dataStore';

// 5月20日，添加了全局视图, 谭思危
export default class GlobalOverview extends React.Component{
   
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller
      // ['全局视图', '协同生态视图', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图']
      const node_datas = [
        ...['提供主体及网络', '消费主题', '载体及资源视图', '服务价值视图', '服务过程视图', '服务目标视图'].map(elm=> {return { key: elm, isGroup: true }}),
        // { key: "Alpha", color: "red", category: 'view', group: '222'},
        // { key: "Alpha1", color: "red", category: 'view', group: '2223'},
        // { key: "Alpha2", color: "red", category: 'view', group: '222'},
        // { key: "222", isGroup: true },
        // { key: "223", isGroup: true },
      ]
      const link_datas = []
      diagram.model = new go.GraphLinksModel(node_datas,link_datas);

      const palette_node_datas = dataStore.view_names.map(elm=>{
        return {
            key: elm, 
            isGroup: true
        }
      })
      palette.model = new go.GraphLinksModel(palette_node_datas);
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