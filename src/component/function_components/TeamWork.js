import React from 'react';
import * as go from 'gojs';
import Controller from './goController/Noname.ts'
import { Icon, Menu} from 'semantic-ui-react'
import ToolBar from '../ui_components/ToolBar';
import stateManger from '../../dataManager/stateManager';
import { genCommonLinkWithText, genBiArrowLinkWithText, genArrowLinkWithText,} from './goController/GraphController.ts'

// 5月14日，添加了过程流图, 谭思危
export default class WorkFlow extends React.Component{
    constructor(props){
      super(props)   
      this.link_map = {
        '下一步': genArrowLinkWithText('下一步'),
        '啦啦啦': genArrowLinkWithText('啦啦啦'),
        // '从属关系': genArrowLinkWithText('从属关系'),
        // '自定义关系': genCommonLinkWithText('自定义关系')
      }
    }
    init_graph(){
      const controller = new Controller(this.refs.myDiagramDiv, this.refs.myPaletteDiv)
      this.controller = controller
      const {diagram, palette} = controller


      const palette_node_datas = [
        { category: 'task4',key:"消费主体"},
        { category: 'task5',key:"协同主体"},
        { key: 1, text: "组", isGroup: true, category: "Pool" },
        { key: 2, text: " ", isGroup: true, category: "Lane", group: 1},
        // { key: 3, text: "Lane", isGroup: true, category: "Lane", group: 1},
      ]
      palette.model = new go.GraphLinksModel(palette_node_datas);
      // controller.relayoutLanes();
      // console.log(palette.model.toJson())
      // diagram.addModelChangedListener(function(evt) {
      //   if (evt.isTransactionFinished) stateManger.overviewRefesh();
      // });
      diagram.addDiagramListener("LinkDrawn", function(diagramEvent) {
       console.log(diagramEvent.subject, diagramEvent) 
      });

      diagram.addDiagramListener("ObjectSingleClicked", e=> {
        var part = e.subject.part;
        if (!(part instanceof go.Link)) 
          // console.log("Clicked on " + part.data.key, part.data.category);
          stateManger.selectGraphObject(part)
      });

      // 设置初始
      controller.initLinkMap(this.link_map)
      // controller.linkTemplateMap.add('', this.link_map[Object.keys(this.link_map)[0]])
    }

    componentDidMount(){
      this.init_graph()
    }

    render(){
      const contorl_bar_height = 40
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