import * as go from 'gojs';
import { conditionalExpression } from '@babel/types';
import deepcopy from 'deepcopy'
const {
  GraphController, $, makePort,   
  nodeResizeAdornmentTemplate,
  nodeRotateAdornmentTemplate,
  nodeSelectionAdornmentTemplate,
  showSmallPorts,
  common_node_propety,
  view2controller,
} = require('./GraphController.ts');


// 用来获得各个视图的所有数据
const default_node_datas = [
  {key:"提供主体及网络", isGroup:true,  loc:"-89.23198649763111 150.2319864976311", category: "view"},
  {key:"消费主体", isGroup:true,  loc:"444.76801350236894 153.2319864976311", category: "view"},
  {key:"载体及资源视图", isGroup:true,  loc:"180.76801350236894 466.2319864976311", category: "view"},
  {key:"服务价值视图", isGroup:true,  loc:"185.76801350236894 -171.7680135023689", category: "view"},
  {key:"服务过程视图", isGroup:true,  loc:"182.76801350236894 258.2319864976311", category: "view"},
  {key:"服务目标视图", isGroup:true,  loc:"183.7680135023689 64.23198649763111", category: "view"}
]
const default_link_data = [
  {from:"载体及资源视图", to:"服务过程视图", text:"支持", category:"arrowlink", points:[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,367.2319864976311,201.00000000000006,367.2319864976311,201.00000000000006,283.9265177476311,201.00000000000006,273.9265177476311]},
  {from:"服务过程视图", to:"消费主体", text:"协作", category:"arrowlink", points:[249.00000000000006,263.2319864976311,259.00000000000006,263.2319864976311,434.3228270176737,263.2319864976311,434.3228270176737,158.2319864976311,421,158.2319864976311,431,158.2319864976311]},
  {from:"服务过程视图", to:"提供主体及网络", text:"协作", category:"arrowlink", points:[153.00000000000006,263.2319864976311,143.00000000000006,263.2319864976311,-11.67717298232634,263.2319864976311,-11.67717298232634,155.2319864976311,-5,155.2319864976311,-15,155.2319864976311]},
  {from:"服务过程视图", to:"服务目标视图", text:"实现", category:"arrowlink", points:[201.00000000000006,252.5374552476311,201.00000000000006,242.5374552476311,201.00000000000006,166.2319864976311,202,166.2319864976311,202,89.92651774763111,202,79.92651774763111]},
  {from:"服务目标视图", to:"服务价值视图", text:"实现", category:"arrowlink", points:[202,58.53745524763111,202,48.53745524763111,202,-48.76801350236889,204.00000000000006,-48.76801350236889,204.00000000000006,-146.07348225236888,204.00000000000006,-156.07348225236888]},
  {from:"服务价值视图", to:"提供主体及网络", text:"传递", category:"arrowlink", points:[204.00000000000006,-156.07348225236888,204.00000000000006,-146.07348225236888,204.00000000000006,-152.9999998826247,-71,-152.9999998826247,-71,134.5374552476311,-71,144.5374552476311]},
  {from:"服务价值视图", to:"消费主体", text:"传递", category:"arrowlink", points:[204.00000000000006,-156.07348225236888,204.00000000000006,-146.07348225236888,204.00000000000006,-153.9999998826247,463,-153.9999998826247,463,137.5374552476311,463,147.5374552476311]},
  {from:"提供主体及网络", to:"服务目标视图", text:"协作", category:"arrowlink", points:[-15,155.2319864976311,-5,155.2319864976311,-12.67717298232634,155.2319864976311,-12.67717298232634,69.23198649763111,144,69.23198649763111,154,69.23198649763111]},
  {from:"消费主体", to:"服务目标视图", text:"协作", category:"arrowlink", points:[431,158.2319864976311,421,158.2319864976311,432.3228270176737,158.2319864976311,432.3228270176737,69.23198649763111,260,69.23198649763111,250,69.23198649763111]},
  {from:"载体及资源视图", to:"消费主体", text:"交互", category:"2arrowlink", points:[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,463.0000001173753,463,463.0000001173753,463,178.92651774763112,463,168.92651774763112]},
  {from:"载体及资源视图", to:"提供主体及网络", text:"交互", category:"2arrowlink", points:[199.00000000000006,460.5374552476311,199.00000000000006,450.5374552476311,199.00000000000006,461.0000001173753,-71,461.0000001173753,-71,175.92651774763112,-71,165.92651774763112]}
]
// const data = []
// console.log(data===data, data===deepcopy(data))
const getAllDataArray = ()=>{
  let node_array = [...default_node_datas], link_array = [...default_link_data]
  for(let view in view2controller){
    // node_array.push({key:view, isGroup:true, category: "view"},)
    let view_controller = view2controller[view]
    const view_diagram = view_controller.diagram
    const view_node_array = view_diagram.model.nodeDataArray,
          view_link_array = view_diagram.model.linkDataArray
    node_array = [...node_array, ...deepcopy(view_node_array).map(elm=>{
      if(!elm.group){
        elm.group = view
      }
      // console.log(view)
      return elm
    })]
    link_array = [...link_array, ...deepcopy(view_link_array)]
  }
  return {
    node_array: node_array,
    link_array: link_array
  }
}

const combineMap = (view_templateMap, templateMap)=>{
  var it = view_templateMap.iterator;
  while (it.next()) {
    const {key, value} = it
    if(key==='')
      continue
    templateMap.add(key, value)
  }
}
// 获得所有的map
const getAllMap = ()=>{
  // 先将他们map全部合并
  const nodeTemplateMap = new go.Map<string, go.Node>();
  const linkTemplateMap = new go.Map<string, go.Link>();
  const groupTemplateMap = new go.Map<string, go.Group>();
  for(let view in view2controller){
    let view_controller = view2controller[view]
    const view_diagram = view_controller.diagram

    combineMap(view_controller.nodeTemplateMap,nodeTemplateMap)
    combineMap(view_controller.linkTemplateMap,linkTemplateMap)
    combineMap(view_controller.groupTemplateMap,groupTemplateMap)
  }
  return {
    nodeTemplateMap: nodeTemplateMap,
    linkTemplateMap: linkTemplateMap,
    groupTemplateMap: groupTemplateMap,
  }
}

export {
  getAllDataArray,
  getAllMap,
}
// const $ = go.GraphObject.make;

export default class Controller extends GraphController{
  constructor(diagram, palette){
    super(diagram, palette)

    this.groupTemplateMap.add('view', viewGroupTemplate)

    this.init()
  }
}

const viewGroupTemplate = 
  $(go.Group, "Auto",
    $(go.Shape, "RoundedRectangle",  // surrounds everything
      { parameter1: 10, fill: "gray" }
    ),
    $(go.Panel, "Vertical",  // position header above the subgraph
      $(go.TextBlock,     // group title near top, next to button
        { font: "Bold 12pt Sans-Serif" },
        new go.Binding('text', 'key')
      ),
      $(go.Shape, "RoundedRectangle",  // surrounds everything
        { parameter1: 10, fill: "white" }
      ),
      // $(go.Placeholder,     // represents area for all member parts
      //   { padding: 5, background: "white", opacity: 0.8 }
      // )
    ),
    common_node_propety(),
  );
