import * as go from 'gojs';
// import '../../other_codes/figure'
import '../../../../node_modules/gojs/extensions/Figures'
export {
  $,
  GraphController,
  makePort, 
  showSmallPorts,
  nodeResizeAdornmentTemplate,
  nodeRotateAdornmentTemplate,
  nodeSelectionAdornmentTemplate,
  common_node_propety,
  common_link_propety,
  ArrowLinkTemplate,
  BidirctArrowLinkTemplate,
  commonLinkTemplate,
  genCommonLinkWithText,
  genForPalette,
}


const $ = go.GraphObject.make;

// 所有控制器的父类
export default class GraphController{
    diagram = undefined
    palette = undefined

    // 注意加下来这个会变成静态的了，所以视图之间的id也要唯一！！！
    palNodeTemplateMap = new go.Map<string, go.Node>();
    palLinkTemplateMap = new go.Map<string, go.Link>();
    palGroupTemplateMap = new go.Map<string, go.Group>();

    nodeTemplateMap = new go.Map<string, go.Node>();
    linkTemplateMap = new go.Map<string, go.Link>();
    groupTemplateMap = new go.Map<string, go.Group>();

    constructor(diagram, palette, view_name=''){
        this.diagram = diagram
        this.palette = palette
 
        this.linkTemplateMap.add('', commonLinkTemplate);  // default
        this.linkTemplateMap.add('arrowlink', ArrowLinkTemplate);
        this.linkTemplateMap.add('2arrowlink', BidirctArrowLinkTemplate);
        this.linkTemplateMap.add('common', commonLinkTemplate);

        this.groupTemplateMap.add('', commonGroupTemplate)
        this.groupTemplateMap.add('common', commonGroupTemplate)
        // 这个地方可以加个改颜色的
    }

    // 初始化go，可以传入自定义的参数
    init(diagram_props={}, palette_props={}){
      if(this.diagram){
        this.diagram = $(go.Diagram, this.diagram,  // must name or refer to the DIV HTML element
          Object.assign({
            // maxSelectionCount: 1,
            nodeTemplateMap: this.nodeTemplateMap,
            linkTemplateMap: this.linkTemplateMap,
            groupTemplateMap: this.groupTemplateMap,
            // 加格子
            grid: $(go.Panel, "Grid",
              $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
              $(go.Shape, "LineH", { stroke: "gray", strokeWidth: 0.5, interval: 10 }),
              $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
              $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
            ),
            "draggingTool.dragsLink": true,
            "linkingTool.portGravity": 20,
            "relinkingTool.portGravity": 20,
            "relinkingTool.fromHandleArchetype":
              $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
            "relinkingTool.toHandleArchetype":
              $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
            "linkReshapingTool.handleArchetype":
              $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
            "rotatingTool.handleAngle": 270,
            "rotatingTool.handleDistance": 30,
            "rotatingTool.snapAngleMultiple": 15,
            "rotatingTool.snapAngleEpsilon": 15,
            "undoManager.isEnabled": true
          }, diagram_props)
        );        
      }

      
      if(this.palette){
        this.palette = $(go.Palette, this.palette,  // must name or refer to the DIV HTML element
          Object.assign({ // share the templates with the main Diagram
            // mouseDrop: (e)=>{
            //   // if (!e.shift) return;  // cannot change groups with an unmodified drag-and-drop
            //   console.log(e, e.shift)
            // },
            nodeTemplateMap: this.palNodeTemplateMap,
            linkTemplateMap: this.palLinkTemplateMap,
            groupTemplateMap: this.palGroupTemplateMap,
            // nodeTemplateMap: this.palNodeTemplateMap,
            // groupTemplateMap: this.palGroupTemplateMap,
            layout: $(go.GridLayout,{
              // cellSize: new go.Size(1, 1),
              // spacing: new go.Size(5, 5),
            }, palette_props)
          })
        )
      }else{
        console.warn(this.palette, 'palette不存在')
      }

    }
}

// 生成工具栏的模板
const genForPalette = (shape,name) =>{
  return (
    $(go.Node, 'Vertical',
      {
        locationObjectName: 'SHAPE',
        locationSpot: go.Spot.Center,
        selectionAdorned: false
      },
      shape,
      $(go.TextBlock,
        { margin: 5, editable: true, text: name},
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
      desiredSize: new go.Size(10, 10),
      alignment: spot,  // align the port on the main Shape
      alignmentFocus: spot,  // just inside the Shape
      portId: name,  // declare this object to be a "port"
      fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
      fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
      cursor: "pointer"  // show a different cursor to indicate potential link point
    });
}
// 显示或者不显示锚点
const showSmallPorts = (node, show)=>{
  if(node.ports){
    node.ports.each(function(port) {
      if (port.portId !== "") {  // don't change the default port, which is the big shape
        port.fill = show ? "rgba(0,0,0,.3)" : null;
      }
    });
  }else{
    // 一堆错，所以先注释了
    // console.error(node, node.ports, '为undefiend')
  }
}

// 存了一些各组件都会需要的属性，直接加上就好了, 应该改为function的
const common_node_propety = ()=>[
    // new go.Binding("location", "location").makeTwoWay(),
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("portId").makeTwoWay(),
    new go.Binding("key").makeTwoWay(),
    makePort("T", go.Spot.Top, true, true),
    makePort("L", go.Spot.Left, true, true),
    makePort("R", go.Spot.Right, true, true),
    makePort("B", go.Spot.Bottom, true, true),
    { // handle mouse enter/leave events to show/hide the ports
      mouseEnter: function(e, node) { showSmallPorts(node, true); },
      mouseLeave: function(e, node) { showSmallPorts(node, false); }
    },
  ]

const common_link_propety = ()=>[

]


const nodeSelectionAdornmentTemplate =
$(go.Adornment, "Auto",
  $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
  $(go.Placeholder)
);

const nodeResizeAdornmentTemplate =
$(go.Adornment, "Auto",
  { locationSpot: go.Spot.Center},
  $(go.Placeholder),
  $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
  $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
  $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

  $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
  $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

  $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
  $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
  $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
);

const nodeRotateAdornmentTemplate =
$(go.Adornment,"Auto",
  { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
  $(go.Shape, "Circle", { name: "CIRCLE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
  $(go.Shape, { geometryString: "M3.5 7 L3.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] })
);


// 常用的连线
const avoid_cross_props = {
  routing: go.Link.AvoidsNodes,
  curve: go.Link.JumpOver,
  corner: 5,
  toShortLength: 4
}

const linkSelectionAdornmentTemplate =
$(go.Adornment, "Link",
  $(go.Shape,
    // isPanelMain declares that this Shape shares the Link.geometry
    { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
);

// 普通的连线
const commonLinkTemplate =
$(go.Link,       // the whole link panel
  { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
  avoid_cross_props,
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
  { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
  { relinkableFrom: true, relinkableTo: true, reshapable: true },
  avoid_cross_props,
  new go.Binding("points").makeTwoWay(),
  $(go.Shape,  // the link path shape
    { isPanelMain: true, strokeWidth: 2 }),
  $(go.Shape,  // the arrowhead
    { toArrow: "OpenTriangle", stroke: 'black' }),
  $(go.Panel, "Auto",
    new go.Binding("visible", "isSelected").ofObject(),
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
const BidirctArrowLinkTemplate =
  $(go.Link,  // the whole link panel
    { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
    { relinkableFrom: true, relinkableTo: true, reshapable: true },
    avoid_cross_props,
    new go.Binding("points").makeTwoWay(),
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
      new go.Binding("visible", "isSelected").ofObject(),
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

// 生成带固定文字的普通连线
const genCommonLinkWithText = text=>{
  return (
    $(go.Link,       // the whole link panel
      { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
      avoid_cross_props,
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
      )
    )
  )
}

//普通的group模板（就是一个框框）
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
      new go.Binding("text", "key")
    ),
  );

  