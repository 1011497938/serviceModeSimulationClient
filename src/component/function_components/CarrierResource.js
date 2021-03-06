import React from 'react';
import * as go from 'gojs';
import Controller from './goController/CarrierResource.ts' 
import { Icon, Menu} from 'semantic-ui-react'
import ToolBar from '../ui_components/ToolBar';
import { genCommonLinkWithText, genBiArrowLinkWithText, genArrowLinkWithText,} from './goController/GraphController.ts'
import stateManger from '../../dataManager/stateManager';

// 存了各个视图的model
// const view2model = {

// }
// const view2
// 5月18日，添加了载体和资源视图, 谭思危
export default class CarrierResource extends React.Component{
    constructor(props){
      super(props)   
      this.link_map = {
        '相互依赖': genBiArrowLinkWithText('相互依赖'),
        '直接转化': genArrowLinkWithText('直接转化'),
        '从属关系': genArrowLinkWithText('从属关系'),
        '自定义关系': genCommonLinkWithText('自定义关系')
      }
    }
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller
      const node_datas = [
        {
          category: 'carrier',
          fields: [
            { name: "field", info: "value", color: "#F7B84B", figure: "Ellipse" },
          ],
          // loc: "0 0"
        },
        { // first node
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
        },
      ]
      const palette_node_datas = [
        {
          category: 'carrier',
          fields: [
            { name: "", info: "", color: "", figure: "" },
          ],
        },
        {
          columnDefinitions: [
            { attr: "name", text: "Name", column: 0 },
            { attr: "value", text: "Value", column: 1 },
          ],
          people: [
            { columns: [{ attr: "name", text: "" }, { attr: "value", text: "" }] },
          ],
          category: 'resource',
        },
      ]
      diagram.model = new go.GraphLinksModel(node_datas,[]);
      palette.model = new go.GraphLinksModel(palette_node_datas);
      controller.linkTemplateMap.add('', this.link_map[Object.keys(this.link_map)[0]])
      // console.log(palette.model.toJson())
      // diagram.addModelChangedListener(function(evt) {
      //   if (evt.isTransactionFinished) console.log(evt.model.toJson(), evt.sel);
      // });
      diagram.addDiagramListener("ObjectSingleClicked", e=> {
        var part = e.subject.part;
        if (!(part instanceof go.Link)) 
          // console.log("Clicked on " + part.data.key, part.data.category);
          stateManger.selectGraphObject(part)
      });
    }

    componentDidMount(){
   
      this.init_graph()
    }

    render(){
      const contorl_bar_height = 40
      // console.log(this.controller, this.link_map)
      return (
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%', height: contorl_bar_height}}>
            <ToolBar controller={this.controller} link_map={this.link_map}/>
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