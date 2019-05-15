import React from 'react';
import * as go from 'gojs';
import Controller from './WorkFlow.ts'
import { Icon, Menu} from 'semantic-ui-react'

// 5月14日，添加了过程流图, 谭思危
export default class WorkFlow extends React.Component{

    init_graph(){
      console.log('hi')
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller
      const node_datas = [
        { key: "Alpha", color: "lightblue", category: 'task', },
        { key: "Alpha1", color: "lightblue", category: 'start', },
        { key: "Alpha2", color: "lightblue", category: 'end', },
        { key: "Alpha3", color: "lightblue", category: 'parallel', },
        { key: "Alpha4", color: "lightblue", category: 'exclusive', },
      ]
      diagram.model = new go.GraphLinksModel(node_datas,[
        {from: 'Alpha', to: 'Alpha1', category: 'arrowlink'}
      ]);
      palette.model = new go.GraphLinksModel(node_datas);
    }

    componentDidMount(){
      this.init_graph()
    }

    render(){
      const contorl_bar_height = 60
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%', height: contorl_bar_height}}>
            <Menu fluid>
              <Menu.Item onClick={()=>{}}>
                <Icon link name='close' />
              </Menu.Item>
              <Menu.Item onClick={()=>{}}>
                <Icon link name='long arrow alternate right' />
              </Menu.Item>
            </Menu>
          </div>
          <div style={{position: 'absolute', top: contorl_bar_height, width:'100%', height:'100%',}}>
            <div ref='myPaletteDiv'  style={{position: 'relative',float:'left',top: 0, width:'10%', height:'100%', backgroundColor: '#859e9e'}}/>
            <div ref="myDiagramDiv"  style={{position: 'relative',float:'left',top: 0, width:'90%', height:'100%', backgroundColor: '#f7f7f7'}}/>      
          </div>
        </div>
      )
    }
  }

  // left: panel_width, 