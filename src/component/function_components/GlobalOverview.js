import React from 'react';
import * as go from 'gojs';
import Controller from './goController/GraphController.ts'
import { view2controller } from './goController/GraphController.ts'
import dataStore, { view2data, view2postion } from '../../manager/dataStore';
import { autorun } from 'mobx';
import stateManger from '../../manager/stateManager';
import deepcopy from 'deepcopy'
import ToolBar from '../ui_components/ToolBar';
import { ResizeObserver } from 'resize-observer';

const $ = go.GraphObject.make;
// 5月20日，添加了全局视图, 谭思危
export default class GlobalOverview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      controller: undefined,
      width: '100%',
      height: '100%'
    }
  }
  init_graph(){
    const {view_name} = this.props
    const controller = new Controller(this.refs.myDiagramDiv, view_name)
    controller.init()
    const {diagram} = controller
    this.diagram = diagram
    this.controller = controller

    const node_datas = [
      {"key":"提供主体及网络", "isGroup":true,  "loc":"-89.23198649763111 150.2319864976311"},
      {"key":"消费主体", "isGroup":true,  "loc":"444.76801350236894 153.2319864976311"},
      {"key":"载体及资源视图", "isGroup":true,  "loc":"180.76801350236894 466.2319864976311"},
      {"key":"服务价值视图", "isGroup":true,  "loc":"185.76801350236894 -171.7680135023689"},
      {"key":"服务过程视图", "isGroup":true,  "loc":"182.76801350236894 258.2319864976311"},
      {"key":"服务目标视图", "isGroup":true,  "loc":"183.7680135023689 64.23198649763111"}
    ]
    const link_datas = [
      {"from":"载体及资源视图", "to":"服务过程视图", "text":"支持", "category":"arrowlink", "points":[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,367.2319864976311,201.00000000000006,367.2319864976311,201.00000000000006,283.9265177476311,201.00000000000006,273.9265177476311]},
      {"from":"服务过程视图", "to":"消费主体", "text":"协作", "category":"arrowlink", "points":[249.00000000000006,263.2319864976311,259.00000000000006,263.2319864976311,434.3228270176737,263.2319864976311,434.3228270176737,158.2319864976311,421,158.2319864976311,431,158.2319864976311]},
      {"from":"服务过程视图", "to":"提供主体及网络", "text":"协作", "category":"arrowlink", "points":[153.00000000000006,263.2319864976311,143.00000000000006,263.2319864976311,-11.67717298232634,263.2319864976311,-11.67717298232634,155.2319864976311,-5,155.2319864976311,-15,155.2319864976311]},
      {"from":"服务过程视图", "to":"服务目标视图", "text":"实现", "category":"arrowlink", "points":[201.00000000000006,252.5374552476311,201.00000000000006,242.5374552476311,201.00000000000006,166.2319864976311,202,166.2319864976311,202,89.92651774763111,202,79.92651774763111]},
      {"from":"服务目标视图", "to":"服务价值视图", "text":"实现", "category":"arrowlink", "points":[202,58.53745524763111,202,48.53745524763111,202,-48.76801350236889,204.00000000000006,-48.76801350236889,204.00000000000006,-146.07348225236888,204.00000000000006,-156.07348225236888]},
      {"from":"服务价值视图", "to":"提供主体及网络", "text":"传递", "category":"arrowlink", "points":[204.00000000000006,-156.07348225236888,204.00000000000006,-146.07348225236888,204.00000000000006,-152.9999998826247,-71,-152.9999998826247,-71,134.5374552476311,-71,144.5374552476311]},
      {"from":"服务价值视图", "to":"消费主体", "text":"传递", "category":"arrowlink", "points":[204.00000000000006,-156.07348225236888,204.00000000000006,-146.07348225236888,204.00000000000006,-153.9999998826247,463,-153.9999998826247,463,137.5374552476311,463,147.5374552476311]},
      {"from":"提供主体及网络", "to":"服务目标视图", "text":"协作", "category":"arrowlink", "points":[-15,155.2319864976311,-5,155.2319864976311,-12.67717298232634,155.2319864976311,-12.67717298232634,69.23198649763111,144,69.23198649763111,154,69.23198649763111]},
      {"from":"消费主体", "to":"服务目标视图", "text":"协作", "category":"arrowlink", "points":[431,158.2319864976311,421,158.2319864976311,432.3228270176737,158.2319864976311,432.3228270176737,69.23198649763111,260,69.23198649763111,250,69.23198649763111]},
      {"from":"载体及资源视图", "to":"消费主体", "text":"交互", "category":"2arrowlink", "points":[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,463.0000001173753,463,463.0000001173753,463,178.92651774763112,463,168.92651774763112]},
      {"from":"载体及资源视图", "to":"提供主体及网络", "text":"交互", "category":"2arrowlink", "points":[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,461.0000001173753,-71,461.0000001173753,-71,175.92651774763112,-71,165.92651774763112]}
    ]
    diagram.model = new go.GraphLinksModel(node_datas,link_datas);
  }

  componentDidMount(){
    this.init_graph()
    const ro = new ResizeObserver((event, value)=>{
      const {diagram} = this
      const {height, width} = event[0].contentRect
      diagram.requestUpdate() 
      diagram.zoomToFit()
      this.setState({width: width, height: height})
    })
    ro.observe(this.refs.container)
  }

  render() {
    const { width, height, controller } = this.state
    const { view_name } = this.props

    return (
      <div ref='container' style={{ marginTop: 0, position: 'relative', width: '100%', height: '100%' }}>
        {/* 上面的工具栏 */}
        {/* <div style={{position: 'absolute', width:'100%', zIndex: 29, top: 15}}>
            <ToolBar controller={controller}/>
        </div> */}
        <div style={{
          position: 'absolute', width: '100%', top: 15,
          height:height==='100%'?'100%':height-15,
          zIndex: 28,
        }}
        >
          <div onClick={() => stateManger.changeView(view_name)} className='diagram' ref="myDiagramDiv" />
        </div>
      </div>
    )
  }
}
