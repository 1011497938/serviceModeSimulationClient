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
        {
          category: 'carrier',
          fields: [
            { name: "field1", info: "b", color: "#F7B84B", figure: "Ellipse" },
            { name: "field2", info: "a", color: "#F25022", figure: "Ellipse" },
            { name: "field3", info: "c", color: "#00BCF2" }
          ],
          // loc: "0 0"
        },
        { // first node
          // key: 1,
          columnDefinitions: [
            // each column definition needs to specify the column used
            { attr: "name", text: "Name", column: 0 },
            { attr: "phone", text: "Phone #", column: 1 },
          ],
          people: [  // the table of people
            // each row is a person with an Array of Objects associating a column name with a text value
            { columns: [{ attr: "name", text: "Alice" }, { attr: "phone", text: "2345" }] },
            { columns: [{ attr: "name", text: "Bob" }, { attr: "phone", text: "9876" }] },
          ],
          category: 'resource',
          // portId:'3'
        },
      ]
      diagram.model = new go.GraphLinksModel([],[
        // {from: 'Alpha', to: 'Alpha1', category: 'arrowlink'}
      ]);
      palette.model = new go.GraphLinksModel(node_datas);
      // console.log(palette.model.toJson())
      diagram.addModelChangedListener(function(evt) {
        if (evt.isTransactionFinished) console.log(evt.model.toJson(), evt.sel);
      });
    }

    componentDidMount(){
   
      this.init_graph()
    }

    render(){
      const contorl_bar_height = 40
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