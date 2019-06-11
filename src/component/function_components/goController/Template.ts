// 这里存了所有的模板
import * as go from 'gojs';
import 'gojs/extensions/Figures'
import stateManger from '../../../dataManager/stateManager';

const $ = go.GraphObject.make;
const custom_r = 60
// 生成工具栏的模板，必须传入panel之类的
const genForPalette = (shape, name) => {
  return (
    $(go.Node, 'Vertical',
      {
        locationObjectName: 'SHAPE',
        locationSpot: go.Spot.Center,
        selectionAdorned: false
      },
      shape,
      $(go.TextBlock,
        { margin: 5, text: name },
        new go.Binding('text', 'text')
      )
    )
  )
}


// 为组件加锚点的函数


// 所有控件都包含的属性
const common_node_propety = () => [
    // new go.Binding("location", "location").makeTwoWay(),
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("portId").makeTwoWay(),
    new go.Binding('key',"id").makeTwoWay(),
    { 
      fromLinkable: true, 
      cursor: 'pointer',
      toLinkable: true, 
      locationObjectName: 'SHAPE', locationSpot: go.Spot.Center,


      fromLinkableDuplicates: true,
      toLinkableDuplicates: true,


      fromSpot: go.Spot.AllSides,    // coming out from top side -- BAD!
      toSpot: go.Spot.AllSides,
    },
]


const linkSelectionAdornmentTemplate = //线选中之后的颜色
  $(go.Adornment, "Link",
    $(go.Shape,
      // isPanelMain declares that this Shape shares the Link.geometry
      { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
  );



const common_link_propety = () => [
  new go.Binding("points").makeTwoWay(),
  { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
  { relinkableFrom: true, relinkableTo: true, reshapable: true },
  // 防止交叉
  {

    routing: go.Link.AvoidsNodes,
    corner: 4,
    curve: go.Link.JumpGap,
    reshapable: true,
    resegmentable: true,
    relinkableFrom: true,
    relinkableTo: true

  },
]


// 这里都是常用的连线
// 普通的连线
const commonLinkTemplate =
  $(go.Link,       // the whole link panel
    common_link_propety(),
    $(go.Shape),  // the link shape, default black stroke
    $(go.TextBlock,
      {
        textAlign: "center",
        font: "10pt helvetica, arial, sans-serif",
        stroke: "#919191",
        margin: 2,
        minSize: new go.Size(10, NaN),
        editable: true
      },
      new go.Binding("text").makeTwoWay()
    )
  );

// 带箭头的实线
const ArrowLinkTemplate =
  $(go.Link,  // the whole link panel
    common_link_propety(),
    $(go.Shape,  // the link path shape
      { isPanelMain: true, strokeWidth: 2 }),
    $(go.Shape,  // the arrowhead
      { toArrow: "OpenTriangle", stroke: 'black' }),
    // $(go.Panel, "Auto",
    //   $(go.Shape, "RoundedRectangle",  // the link shape
    //     { fill: "#F8F8F8", stroke: null }),
    //   $(go.TextBlock,
    //     {
    //       textAlign: "center",
    //       font: "10pt helvetica, arial, sans-serif",
    //       stroke: "#919191",
    //       margin: 2,
    //       minSize: new go.Size(10, NaN),
    //       editable: false
    //     },
    //     new go.Binding("text").makeTwoWay()
    //   )
    // )
  );


// 带双向箭头的实线
const BieArrowLinkTemplate =
  $(go.Link,  // the whole link panel
    common_link_propety(),
    $(go.Shape,  // the link path shape
      { isPanelMain: true, strokeWidth: 2 }
    ),
    $(go.Shape,  // the arrowhead
      { toArrow: "OpenTriangle", stroke: 'black' }
    ),
    $(go.Shape,  // the arrowhead
      { fromArrow: "BackwardOpenTriangle", stroke: 'black' }
    ),
    $(go.Panel, "Auto",
      $(go.Shape, "RoundedRectangle",  // the link shape
        { fill: "#F8F8F8", stroke: null }
      ),
      $(go.TextBlock,
        {
          textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "#919191",
          margin: 2,
          minSize: new go.Size(10, NaN),
          editable: true
        },
        new go.Binding("text").makeTwoWay())
    )
  );

// 生成带固定文字的常用连线
const genCommonLinkWithText = text => {
  return (
    $(go.Link,       // the whole link panel
      common_link_propety(),
      $(go.Shape),  // the link shape, default black stroke
      $(go.TextBlock,
        {
          textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "black",
          margin: 2,
          minSize: new go.Size(10, NaN),
          editable: true,
          text: text,
        },
        new go.Binding("text").makeTwoWay(),
      )
    )
  )
}

const genBiArrowLinkWithText = text => {
  return $(go.Link,  // the whole link panel
    common_link_propety(),
    $(go.Shape,  // the link path shape
      { isPanelMain: true, strokeWidth: 2 }
    ),
    $(go.Shape,  // the arrowhead
      { toArrow: "OpenTriangle", stroke: 'black' }
    ),
    $(go.Shape,  // the arrowhead
      { fromArrow: "BackwardOpenTriangle", stroke: 'black' }
    ),
    $(go.Panel, "Auto",
      $(go.Shape, "RoundedRectangle",  // the link shape
        { fill: "#F8F8F8", stroke: null }
      ),
      $(go.TextBlock,
        {
          textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "#919191",
          margin: 2,
          minSize: new go.Size(10, NaN),
          editable: true,
          text: text,
        },
        new go.Binding("text").makeTwoWay(),
      )
    )
  )
}


const genArrowLinkWithText = text => {
  return $(go.Link,  // the whole link panel
    common_link_propety(),
    $(go.Shape,  // the link path shape
      { isPanelMain: true, strokeWidth: 2 }),
    $(go.Shape,  // the arrowhead
      { toArrow: "OpenTriangle", stroke: 'black' }),
    $(go.Panel, "Auto",
      $(go.Shape, "RoundedRectangle",  // the link shape
        { fill: "#F8F8F8", stroke: null }),
      $(go.TextBlock,
        {
          textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "#919191",
          margin: 2,
          minSize: new go.Size(10, NaN),
          editable: true,
          text: text,
        },
        new go.Binding("text").makeTwoWay(),
      )
    )
  );
}




//普通的group模板
const commonGroupTemplate =
  $(go.Group, "Auto",
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, "Auto",
      $(go.Shape, "RoundedRectangle",  // surrounds the Placeholder
        {
          parameter1: 14,
          fill: "#0D2C54",
          opacity: 0.4
        },
      ),
      $(go.Placeholder,    // represents the area of all member parts,
        { padding: 5 },        // with some extra padding around them
      ),
    ),
    common_node_propety(),
    $(go.TextBlock,         // group title
      { alignment: go.Spot.Right, font: " 12pt Sans-Serif", wrap: go.TextBlock.WrapFit,},
      new go.Binding("text", "key")
    ),
  );


const swimLanesGroupTemplateForPalette =
  $(go.Group, 'Vertical');

const poolTemplate = () => { }

const poolTemplateForPalette =
  $(go.Group, 'Vertical',
    {
      locationSpot: go.Spot.Center,
      computesBoundsIncludingLinks: false,
      isSubGraphExpanded: false
    },
    $(go.Shape, 'Process',
      { fill: 'white', desiredSize: new go.Size(custom_r, custom_r / 2) }),
    $(go.Shape, 'Process',
      { fill: 'white', desiredSize: new go.Size(custom_r, custom_r / 2) }),
    $(go.TextBlock,
      { margin: 5, editable: true },
      new go.Binding('text'))
  );

const LaneTemplateForPalette =
  $(go.Group, 'Vertical'); // empty in the palette, 直接在图中右键添加

// 全局视图
const viewGroupTemplate =
  $(go.Group, "Auto",
    // $(go.Shape, "RoundedRectangle",  // surrounds everything
    //   { parameter1: 10, fill: "gray" }
    // ),
    $(go.Panel, "Vertical",  // position header above the subgraph
      $(go.TextBlock,     // group title near top, next to button
        {
          font: "Bold 30pt Sans-Serif",
          width: 300,
          textAlign: 'center',
          click: (e, obj) => {
            // console.log(obj,  obj.Pb ,Object.keys(obj))
            stateManger.changeView(obj.Pb)
          }
        },
        new go.Binding('text', 'key')
      ),
      // $(go.Shape, "RoundedRectangle",  // surrounds everything
      //   { parameter1: 10, fill: "white" }
      // ),
    ),
    common_node_propety(),
  );


const min_r = 40;

const cheng = "#d92621";
const huang = "#fadb14";
const forgive = "#96cbf5";
const qianhuang = "#FFEB3B";


const newhuang="#ff9b21";
const deeplan="#2e3675";

const lightblue="#128fec";


const fen="#faa591";
const grey="#ec2336";
const lan="#32a6fd";
const taobao="#ff5500";
const deepblue="#1b82d2";
const lightgreen="#71d3d2";

const custom_props = { //公共样式
  stroke: null,
  width: custom_r,
  height: custom_r,
}
const custom_icon_props = {
  fill: '#f7f7f7',
  strokeWidth: 1.5,
  width: custom_r / 2,
  height: custom_r / 2,
  stroke: null
}
const first_props = { //第一个图案样式
  width: custom_r + 10,
  height: custom_r / 2 + 10,
  stroke: null,
  fill: qianhuang
}


const second_props = { //内圈样式
  fill: "#fff",
  stroke: "white",
  strokeWidth: 1.5,
  width: min_r - 10,
  height: min_r - 10,

}

const five_props = {
  stroke: null,
  // strokeWidth:1.5,
  fill: "#71d3d2",
  width: custom_r,
  height: custom_r,
  // strokeDashArray:[5,10]
}
const inFive_props = {
  stroke: "black",
  fill: "#fff",
  width: custom_r - 25,
  height: custom_r / 2 - 6
}

const inSix_props = {
  stroke: "#000",
  strokeWidth: 1,
  fill: "#fff",
  width: custom_r - 24,
  height: custom_r - 24
}



const reText = () => [
  $(go.TextBlock, 
    // new go.Binding("text", "key"),
    {
      font: "10pt Helvetica, Arial, sans-serif",
      margin: 8,
      maxSize: new go.Size(160, NaN),
      wrap: go.TextBlock.WrapFit,
      fromLinkable: false, 
      toLinkable: false,  
      // editable: true,
      stroke: "#fff"
    },
    new go.Binding("text", 'name').makeTwoWay())
]

//协同生态视图控件
const consumerNodeTemplate =
  $(go.Node, 'Auto',
    $(go.Panel,"Auto",$(go.Shape, "RoundedRectangle", first_props, { fill: deepblue })),
    common_node_propety(),
    reText()
  );



const consumerTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props, { fill: deepblue }),

  '消费主体'

)


const producerNodeTemplate =
$(go.Node, 'Auto',
    $(go.Panel,"Auto",$(go.Shape, "RoundedRectangle", first_props,{fill:taobao})),
      common_node_propety(),
      reText()
); 


const produceTemplateForPalette = genForPalette(

  $(go.Shape, "RoundedRectangle", first_props, { fill:taobao}),
  '生产主体'

)

//协同生态视图控件结束



//载体及资源视图开始


const carryNodeTemplate =$(go.Node, 'Auto',

    $(go.Panel,"Auto",$(go.Shape, "RoundedRectangle", first_props,{fill:"#5FC407",
    })),

    common_node_propety(),
    reText(),
); 


const carryTemplateForPallete= genForPalette(

  $(go.Shape, "RoundedRectangle", first_props,{fill:"#5FC407"}),

  '载体'
)

const sourceNodeTemplate =$(go.Node, 'Auto',
    $(go.Panel,"Auto",$(go.Shape, "RoundedRectangle", first_props,{fill:lightblue})),
      common_node_propety(),
      reText(),
); 
  

const sourceTemplateForPallete = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:lightblue}),
  '资源'
)

//载体及资源视图完毕
//
//服务过程视图
const taskNodeTemplate =
  $(go.Node, 'Auto',
    $(go.Panel, "Auto", //子元素在面板的位置
      $(go.Shape, "RoundedRectangle", first_props, { fill:lightblue }),
    ),
    reText(),
    common_node_propety(),
  );

const taskTemplateForPallete = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props, { fill:lightblue}),
  '任务'
)

const startNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle", custom_props, {fill:grey}),
  common_node_propety(),
  reText(),

); 

const startTemplateForPallete = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle", custom_props, { fill:grey }),

  ),

  '开始事件'

)


const endNodeTemplate =
  $(go.Node, 'Spot',
    $(go.Shape, "Circle", custom_props, { fill: grey }),
    // 画中间图案
  $(go.Shape, "Circle",second_props),
  common_node_propety(),
); 

const endTemplateForPallete = genForPalette(

  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle", custom_props, { fill: grey }),
    // 画中间图案
    $(go.Shape, "Circle", second_props),

  ),

  '结束事件'

)


const timeNodeTemplate =
  $(go.Node, 'Spot',
    $(go.Shape, "Circle", custom_props, { fill: huang, stroke: "#f48828", strokeWidth: 1.5 }),
    // 画中间图案
    $(go.Shape, "BpmnEventTimer", inSix_props),
    common_node_propety()
  );
const timeTemplateForPallete = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle", custom_props, { fill: huang, stroke: "#f48828", strokeWidth: 1.5 }),
    // 画中间图案
    $(go.Shape, "BpmnEventTimer", inSix_props),
  ),

  '时间'

)

const messageNodeTemplate =
  $(go.Node, 'Spot',
    $(go.Shape, "Circle", five_props),
    // 画中间图案
    $(go.Shape, "Email", inFive_props),
    common_node_propety()
  );
const messageTemplateForPallete = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle", five_props),
    // 画中间图案
    $(go.Shape, "Email", inFive_props),
  ),

  '消息事件'
)


// const thirdNodeTemplate =
// $(go.Node, 'Spot',
//   $(go.Shape, "Diamond", custom_props, {fill:forgive}),
//   common_node_propety()
// ); 
// const thirdNodeTemplateForPalette = genForPalette(
//   $(go.Panel, "Auto", //子元素在控件的位置
//     $(go.Shape, "Diamond", custom_props, {fill:forgive}),
//   ),
//   'third'
// )

// const fourNodeTemplate =
// $(go.Node, 'Spot',
//   $(go.Shape, "Circle", custom_props, {fill:deepred}),
//   common_node_propety()
// ); 
// const fourNodeTemplateForPalette = genForPalette(
//   $(go.Panel, "Auto", //子元素在控件的位置
//     $(go.Shape, "Circle", custom_props, {fill:deepred}),
//   ),
//   'four'
// )


const exclusiveNodeTemplate =
  $(go.Node, 'Spot',
    $(go.Shape, "Diamond",
      custom_props, { fill: fen },
    ),
    // 画中间图案
    $(go.Shape, "ThinX",
      custom_icon_props
    ),
    common_node_propety()
  );
const exclusiveTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "Diamond",
      custom_props, { fill: fen },
    ),
    // 画中间图案
    $(go.Shape, "ThinX",
      custom_icon_props
    ),
  ),

  '互斥网关'

)


const parallelNodeTemplate =
  $(go.Node, 'Spot',
    $(go.Shape, "Diamond",
      custom_props, { fill:huang},
    ),
    // 画中间图案
    $(go.Shape, "ThinCross",
      custom_icon_props
    ),
    common_node_propety()
  );


const parallelTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "Diamond",
      custom_props, { fill:huang},
    ),
    // 画中间图案
    $(go.Shape, "ThinCross",
      custom_icon_props
    ),
  ),


  '并行网关'

)



const strategicNodeTemplate =
  $(go.Node, 'Auto',
    $(go.Panel,"Auto",$(go.Shape, "Ellipse", { fill:taobao, width: 80, height: 50, stroke: null })),
    common_node_propety(),
     reText(),
  );
const strategicNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Ellipse", { fill:taobao, width: 80, height: 50, stroke: null }),
  ),
  '战略目标'
)

const emotionNodeTemplate =
  $(go.Node, 'Auto',
    $(go.Panel,"Auto",$(go.Shape, "RoundedRectangle", first_props, { fill:fen})),
    common_node_propety(),
    reText()
  );

const emotionTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props, { fill: fen }),
  '情感目标'
)
const physicalNodeTemplate =
  $(go.Node, 'Auto',
    $(go.Panel,"Auto",$(go.Shape, "RoundedRectangle", first_props, { fill:lightgreen })),
    common_node_propety(),
    reText()
  );

const physicalTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props, { fill:lightgreen }),
  '物理目标'
)
const numNodeTemplate =
  $(go.Node, 'Auto',
    $(go.Panel,"Auto",
      $(go.Shape, "RoundedRectangle", first_props, { fill:lan })
      ),
    common_node_propety(),
    reText()
  );






const numTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props, { fill:lan }),
  '数值目标'
)

const businessNodeTemplate =
  $(go.Node, 'Auto',
     $(go.Panel,"Auto",$(go.Shape, "Ellipse", { fill:"#ea7b37", width: 80, height: 50, stroke: null })),
    reText(),
    common_node_propety()
  );
const businessNodeTemplateForPalette = genForPalette(
  $(go.Shape, "Ellipse", { fill:"#ea7b37", width: 80, height: 50, stroke: null }),
  '业务目标'
)


















//这里存工具栏中的模板
const paletteTemplate = {
    link: {},
    node:{
        consumer:consumerTemplateForPalette,
        producer:produceTemplateForPalette,        
        resource:sourceTemplateForPallete,
        carrier:carryTemplateForPallete,
        task:taskTemplateForPallete,
        start:startTemplateForPallete,
        end:endTemplateForPallete,
        time:timeTemplateForPallete,
        message:messageTemplateForPallete,
        exclusive:exclusiveTemplateForPalette,
        parallel:parallelTemplateForPalette,
        strategic:strategicNodeTemplateForPalette,
        business:businessNodeTemplateForPalette,
        emotion:emotionTemplateForPalette,
        physics:physicalTemplateForPalette,
        amount:numTemplateForPalette 
    },
    group:{
        Pool: poolTemplateForPalette,
        Lane: LaneTemplateForPalette,
    }
}

//这里存画布上的模板
const panelTemplate = {
  node: {
    consumer: consumerNodeTemplate,
    producer: producerNodeTemplate,

    resource: sourceNodeTemplate,
    carrier: carryNodeTemplate,

    task: taskNodeTemplate,
    start: startNodeTemplate,
    end: endNodeTemplate,
    time: timeNodeTemplate,
    message: messageNodeTemplate,
    exclusive: exclusiveNodeTemplate,
    parallel: parallelNodeTemplate,

    strategic: strategicNodeTemplate,
    business: businessNodeTemplate,
    emotion: emotionNodeTemplate,
    physics: physicalNodeTemplate,
    amount: numNodeTemplate
  },
  link: {
    '': commonLinkTemplate,
    common: commonLinkTemplate,
    arrow: ArrowLinkTemplate,
    bieArrow: BieArrowLinkTemplate,

    '联盟关系': genBiArrowLinkWithText('联盟关系'),
    '合作关系': genBiArrowLinkWithText('合作关系'),
    '合资关系': genBiArrowLinkWithText('合资关系'),
    '从属关系': genArrowLinkWithText('从属关系'),
    '购买方': genArrowLinkWithText('购买方'),
    '自定义': genCommonLinkWithText('自定义'),

    '直接转换': genBiArrowLinkWithText('直接转换'),
    '相互依赖': genBiArrowLinkWithText('相互依赖'),

    '协同关系': genBiArrowLinkWithText('协同关系'),
    '排他关系': genBiArrowLinkWithText('排他关系'),

    '协作': genBiArrowLinkWithText('协作'),
    '传递': genArrowLinkWithText('传递'),
    '交互': genBiArrowLinkWithText('交互'),
    '支持': genArrowLinkWithText('支持'),
    '实现': genArrowLinkWithText('实现'),

    '下一步': ArrowLinkTemplate,
  },


  group: {
    '': commonGroupTemplate,
    view: viewGroupTemplate,
  }
}

const palNodeTemplateMap = new go.Map<string, go.Node>();
const palLinkTemplateMap = new go.Map<string, go.Link>();
const palGroupTemplateMap = new go.Map<string, go.Group>();

const nodeTemplateMap = new go.Map<string, go.Node>();
const linkTemplateMap = new go.Map<string, go.Link>();
const groupTemplateMap = new go.Map<string, go.Group>();

const object2map = (object, map) => {
  for (let key in object) {
    map.add(key, object[key])
  }
}
object2map(paletteTemplate.link, palLinkTemplateMap)
object2map(paletteTemplate.group, palGroupTemplateMap)
object2map(paletteTemplate.node, palNodeTemplateMap)

object2map(panelTemplate.link, linkTemplateMap)
object2map(panelTemplate.group, groupTemplateMap)
object2map(panelTemplate.node, nodeTemplateMap)

export {
  paletteTemplate,
  panelTemplate,

  palNodeTemplateMap,
  palGroupTemplateMap,
  palLinkTemplateMap,

  nodeTemplateMap,
  linkTemplateMap,
  groupTemplateMap,
}
