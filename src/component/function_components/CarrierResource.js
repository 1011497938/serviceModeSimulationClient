import React from 'react';
import * as go from 'gojs';
import Controller from './goController/CarrierResource.ts' 
import { Icon, Menu} from 'semantic-ui-react'
import ToolBar from '../ui_components/ToolBar';

// 5月18日，添加了载体和资源视图, 谭思危
export default class CarrierResource extends React.Component{
   
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller
      const node_datas = [
        { key: "Alpha", color: "red", category: 'carrier', },
        { // first node
          key: 1,
          columnDefinitions: [
            // each column definition needs to specify the column used
            { attr: "name", text: "Name", column: 0 },
            { attr: "phone", text: "Phone #", column: 1 },
            { attr: "office", text: "Office", column: 2 }
          ],
          people: [  // the table of people
            // each row is a person with an Array of Objects associating a column name with a text value
            { columns: [{ attr: "name", text: "Alice" }, { attr: "phone", text: "2345" }, { attr: "office", text: "C4-E18" }] },
            { columns: [{ attr: "name", text: "Bob" }, { attr: "phone", text: "9876" }, { attr: "office", text: "E1-B34" }] },
            { columns: [{ attr: "name", text: "Carol" }, { attr: "phone", text: "1111" }, { attr: "office", text: "C4-E23" }] },
            { columns: [{ attr: "name", text: "Ted" }, { attr: "phone", text: "2222" }, { attr: "office", text: "C4-E197" }] },
            { columns: [{ attr: "name", text: "Ted2" }, { attr: "phone", text: "2222" }, { attr: "office", text: "C4-E197" }] }
          ],
          category: 'resource',
        },
      ]
      diagram.model = new go.GraphLinksModel(node_datas,[
        // {from: 'Alpha', to: 'Alpha1', category: 'arrowlink'}
      ]);
      palette.model = new go.GraphLinksModel(node_datas);
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

  // left: panel_width, 