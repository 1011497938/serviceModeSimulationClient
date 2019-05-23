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
      // diagram.addModelChangedListener(function(evt) {
      //   if (evt.isTransactionFinished) console.log(evt.model.toJson());
      // });
      // const palette_node_datas = dataStore.view_names.map(elm=>{
      //   return {
      //       key: elm, 
      //       isGroup: true
      //   }
      // })
      // palette.model = new go.GraphLinksModel(palette_node_datas);
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
            {/* <div ref='myPaletteDiv'  style={{position: 'relative',float:'left',top: 0, width:'15%', height:'100%', backgroundColor: '#859e9e'}}/> */}
            <div ref="myDiagramDiv"  style={{position: 'relative',float:'left',top: 0, width:'85%', height:'100%', backgroundColor: '#f7f7f7'}}/>      
          </div>
        </div>
      )
    }
  }

  // left: panel_width, 