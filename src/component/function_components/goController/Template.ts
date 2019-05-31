// 这里存了所有的模板
import * as go from 'gojs';
import 'gojs/extensions/Figures'
import stateManger from '../../../dataManager/stateManager';

const $ = go.GraphObject.make;
const custom_r= 60
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
         function makePort(name, spot, output, input) {
        // the port is basically just a small transparent square
        return $(go.Shape, "Circle",
          {
            fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
            stroke: null,
            desiredSize: new go.Size(7, 7),
            alignment: spot,  // align the port on the main Shape
            alignmentFocus: spot,  // just inside the Shape
            portId: name,  // declare this object to be a "port"
            fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
            fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
            cursor: "pointer"  // show a different cursor to indicate potential link point
          });
      }


// 显示或者不显示锚点
const showSmallPorts = (node, show) => {
    if (node.ports) {
        node.ports.each(function (port) {
            if (port.portId !== "") {  // don't change the default port, which is the big shape
                port.fill = show ? "rgba(0,0,0,.3)" : null;
            }
        });
    } else {
        // 一堆错，所以先注释了
        // console.error(node, node.ports, '为undefiend')
    }
}

// 所有控件都包含的属性
const common_node_propety = () => [
    // new go.Binding("location", "location").makeTwoWay(),
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("portId").makeTwoWay(),
    // new go.Binding("id").makeTwoWay(),

    makePort("T", go.Spot.Top, true, true),
    makePort("L", go.Spot.Left, true, true),
    makePort("R", go.Spot.Right, true, true),
    makePort("B", go.Spot.Bottom, true, true),
    { // handle mouse enter/leave events to show/hide the ports
        mouseEnter: function (e, node) { showSmallPorts(node, true); },
        mouseLeave: function (e, node) { showSmallPorts(node, false); }
    },
]


const linkSelectionAdornmentTemplate =
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
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4
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
                    editable: true
                },
                new go.Binding("text").makeTwoWay()
            )
        )
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




// 普通的group模板（就是一个框框）
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
            { alignment: go.Spot.Right, font: "Bold 12pt Sans-Serif" },
            new go.Binding("text", "id")
        ),
    );

const swimLanesGroupTemplateForPalette =
$(go.Group, 'Vertical',); 

const poolTemplate = ()=>{}

const poolTemplateForPalette =
$(go.Group, 'Vertical',
  {
    locationSpot: go.Spot.Center,
    computesBoundsIncludingLinks: false,
    isSubGraphExpanded: false
  },
  $(go.Shape, 'Process',
    { fill: 'white', desiredSize: new go.Size(custom_r , custom_r / 2) }),
  $(go.Shape, 'Process',
    { fill: 'white', desiredSize: new go.Size(custom_r , custom_r / 2) }),
  $(go.TextBlock,
    { margin: 5, editable: true },
    new go.Binding('text'))
);

const LaneTemplateForPalette =
$(go.Group, 'Vertical',); // empty in the palette, 直接在图中右键添加

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
          click: (e, obj)=>{
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


/*图形画布编辑模式
const taskNodeTemplate =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "RoundedRectangle", 
      custom_props, 
      {
        width: custom_r*2,
        height: custom_r,
        fill: 'lightyellow'
      },  
    ),
  $(go.TextBlock, new go.Binding("text", "key"),
    {
      font: "bold 11pt Helvetica, Arial, sans-serif",
      margin: 8,
      maxSize: new go.Size(160, NaN),
      wrap: go.TextBlock.WrapFit,
      editable: true  //文字是否可编辑
    },
    new go.Binding("text").makeTwoWay())  
 ),
 common_node_propety()
); */
// 流图中的控件

//图形的缩放
// var nodeSelectionAdornmentTemplate =
//         $(go.Adornment, "Auto",
//           $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
//           $(go.Placeholder)
//         );

//       var nodeResizeAdornmentTemplate =
//         $(go.Adornment, "Spot",
//           { locationSpot: go.Spot.Right },
//           $(go.Placeholder),
//           $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
//           $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
//           $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

//           $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
//           $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

//           $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
//           $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
//           $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
//         );

//       var nodeRotateAdornmentTemplate =
//         $(go.Adornment,
//           { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
//           $(go.Shape, "Circle", { name: "CIRCLE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
//           $(go.Shape, { geometryString: "M3.5 7 L3.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] })
//         );

 

// const common_shape=()=>[
//           { locationSpot: go.Spot.Center },
//           new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
//           { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
//           { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
//           { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
//           new go.Binding("angle").makeTwoWay(),
// ]



const min_r=40;

const cheng="#F6511D";
const huang="#FFB400";
const lan="#00A6ED";
const forgive="#7FB800";
const qianhuang="lightyellow";
const deepred="#c92728";

const custom_props = { //公共样式
  stroke: null,
  width: custom_r,
  height: custom_r,
}
const custom_icon_props = {
  fill: '#f7f7f7',
  strokeWidth:1.5,
  width: custom_r/2,
  height: custom_r/2,
  stroke: null
}
const first_props={ //第一个图案样式
  width: custom_r+10,
  height: custom_r/2+10,
  stroke:null,
  fill: qianhuang
}


const second_props={ //内圈样式
  fill: "#fff",
  stroke:"white",
  strokeWidth:1.5,
  width: min_r-10,
  height: min_r-10,
          
}

const five_props={
    stroke:null,
    // strokeWidth:1.5,
    fill:forgive,
    width: custom_r,
    height: custom_r,
    // strokeDashArray:[5,10]
}
const inFive_props={
    stroke:"black",
    fill:"#fff",
    width: custom_r-25,
    height: custom_r/2-6
}

const inSix_props={
    stroke:"black",
    strokeWidth:1.5,
    fill:"#fff",
    width: custom_r-24,
    height: custom_r-24
}

  const reText=()=>[
      $(go.TextBlock, new go.Binding("text", "id"),
                {
                  font: "10pt Helvetica, Arial, sans-serif",
                  margin: 8,
                  maxSize: new go.Size(160, NaN),
                  wrap: go.TextBlock.WrapFit,
                  editable: true,
                  stroke:null
                },
                new go.Binding("text").makeTwoWay())
    ]

//协同生态视图控件
const consumerNodeTemplate =
$(go.Node, 'Auto',
    $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
      common_node_propety(),
      reText()
 
); 


const consumerTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
  'consumer'
)


const produceNodeTemplate =
$(go.Node, 'Auto',
    $(go.Shape, "RoundedRectangle", first_props,{fill:cheng}),
      common_node_propety(),
      reText()
); 

const produceTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:cheng}),
  'producer'
)

//协同生态视图控件结束



//载体及资源视图开始

const carryNodeTemplate =$(go.Node, 'Spot',
    $(go.Shape, "RoundedRectangle", first_props,{fill:cheng}),
      common_node_propety(),
); 


const carryTemplateForPallete= genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:cheng}),
  'carrier'
)

const sourceNodeTemplate =$(go.Node, 'Spot',
    $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
      common_node_propety(),
); 
  

const sourceTemplateForPallete = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
  'resource'
)


//载体及资源视图完毕
//
//服务过程视图
const taskNodeTemplate =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "RoundedRectangle", first_props,{fill:qianhuang}),
      common_node_propety() ,
      reText()
 ),
); 

const taskTemplateForPallete = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:qianhuang}),
  'task'
)

const startNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle", custom_props, {fill:cheng}),
  common_node_propety(),
  reText(),

); 
const startTemplateForPallete = genForPalette(
  $(go.Panel, "Auto",//子元素在控件的位置
      $(go.Shape, "Circle", custom_props, {fill:cheng}),

  ),
  'start'
)


const endNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle", custom_props, {fill:cheng}),
    // 画中间图案
  $(go.Shape, "Circle",second_props),
  common_node_propety(),

  reText(),
              makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, true, false),
          { // handle mouse enter/leave events to show/hide the ports
            mouseEnter: function(e, node) { showSmallPorts(node, true); },
            mouseLeave: function(e, node) { showSmallPorts(node, false); }
          }

); 
const endTemplateForPallete  = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle", custom_props, {fill:cheng}),
      // 画中间图案
    $(go.Shape, "Circle",second_props),

  ),
  'end'
)


const timeNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle",custom_props, {fill:huang,stroke:"#f48828",strokeWidth:1.5}),
 // 画中间图案
  $(go.Shape, "BpmnEventTimer",inSix_props),  
  common_node_propety()
); 
const timeTemplateForPallete = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle",custom_props, {fill:huang,stroke:"#f48828",strokeWidth:1.5}),
 // 画中间图案
  $(go.Shape, "BpmnEventTimer",inSix_props),    
  ),
  'time'
)

const messageNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle",five_props),
 // 画中间图案
  $(go.Shape, "Email",inFive_props),
  common_node_propety()  
); 
const messageTemplateForPallete = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle",five_props),
 // 画中间图案
  $(go.Shape, "Email",inFive_props),    
  ),
  'message'
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
    custom_props, {fill: cheng},
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
      custom_props, {fill: cheng},
    ),
      // 画中间图案
    $(go.Shape, "ThinX",  
      custom_icon_props
    ),
  ),
  'exclusive'
)


const parallelNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond",  
    custom_props, {fill: huang},
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
      custom_props, {fill: huang},
    ),
      // 画中间图案
    $(go.Shape, "ThinCross",  
      custom_icon_props
    ),
  ),
  'parallel'
)



const aimNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Ellipse",  {fill:cheng,width:80,height:50,stroke:null}),
   common_node_propety()
); 
const aimNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Ellipse", {fill:cheng,width:80,height:50,stroke:null}),
  ),
  'strategic'
)

const feelNodeTemplate =
$(go.Node, 'Spot',
    $(go.Shape, "RoundedRectangle", first_props,{fill:qianhuang}),
      common_node_propety() ,
      reText()
); 

const feelTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:qianhuang}),
  'emotion'
)
const physicalNodeTemplate =
$(go.Node, 'Spot',
    $(go.Shape, "RoundedRectangle", first_props,{fill:"lightblue"}),
      common_node_propety() ,
      reText()
); 

const physicalTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:"lightblue"}),
  'physics'
)
const numNodeTemplate =
$(go.Node, 'Spot',
    $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
      common_node_propety() ,
      reText()

); 

const numTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
  'amount'
)

const sonNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Ellipse",  {fill:huang,width:80,height:50,stroke:null}),
   common_node_propety()
); 
const sonNodeTemplateForPalette = genForPalette(
    $(go.Shape, "Ellipse", {fill:huang,width:80,height:50,stroke:null}),
  'subgoal'
)











 






//这里存工具栏中的模板
const paletteTemplate = {
    link:{

    },
    node:{
        consumer:consumerTemplateForPalette,
        produce:produceTemplateForPalette,
        source:sourceTemplateForPallete,
        carrier:carryTemplateForPallete,
        task:taskTemplateForPallete,
        start:startTemplateForPallete,
        end:endTemplateForPallete,
        time:timeTemplateForPallete,
        message:messageTemplateForPallete,
        exclusive:exclusiveTemplateForPalette,
        parallel:parallelTemplateForPalette,
        strategic:aimNodeTemplateForPalette,
         subgoal:sonNodeTemplateForPalette,
         emotion:feelTemplateForPalette,
         physical:physicalTemplateForPalette,
         amount:numTemplateForPalette 
    },
    group:{
        Pool: poolTemplateForPalette,
        Lane: LaneTemplateForPalette,
    }
}
//这里存画布上的模板
const panelTemplate = {
  node:{
        consumer:consumerNodeTemplate,
        produce:produceNodeTemplate,
        source:sourceNodeTemplate,
        carrier:carryNodeTemplate,
        task:taskNodeTemplate,
        start:startNodeTemplate,
        end:endNodeTemplate,
        time:timeNodeTemplate,
        message:messageNodeTemplate,
        exclusive:exclusiveNodeTemplate,
        parallel:parallelNodeTemplate,
        strategic:aimNodeTemplate,
        subgoal:sonNodeTemplate,
        emotion:feelNodeTemplate,
        physical:physicalNodeTemplate,
        amount:numNodeTemplate
    },
    link: {
        '': commonLinkTemplate,
        common: commonLinkTemplate,
        arrow: ArrowLinkTemplate,
        bieArrow: BieArrowLinkTemplate,

        '联盟关系': genBiArrowLinkWithText('联盟关系'),
        '合作关系': genBiArrowLinkWithText('联盟关系'),
        '合资关系': genBiArrowLinkWithText('联盟关系'),
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

    group:{
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

const object2map = (object, map)=>{
    for(let key in object){
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

