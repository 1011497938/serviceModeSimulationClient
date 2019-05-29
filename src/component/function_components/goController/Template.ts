// 这里存了所有的模板
import * as go from 'gojs';
import 'gojs/extensions/Figures'

const $ = go.GraphObject.make;

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
            desiredSize: new go.Size(10, 10),
            alignment: spot,  // align the port on the main Shape
            alignmentFocus: spot,  // just inside the Shape
            portId: name,  // declare this object to be a "port"
            fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
            fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
            cursor: "pointer"  // show a different cursor to indicate potential link point
        }
    )
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
    new go.Binding("key").makeTwoWay(),
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
            new go.Binding("text", "key")
        ),
    );

// 流图中的控件


const custom_r = 40
const icon_color = '#f7f7f7'
const custom_props = {
  stroke: null,
  strokeWidth:1.5,
  width: custom_r,
  height: custom_r
}
const custom_icon_props = {
  fill: '#f7f7f7',
  strokeWidth:1.5,
  width: custom_r/2,
  height: custom_r/2,
  stroke: null
}

const swimLanesGroupTemplateForPalette =
$(go.Group, 'Vertical',); // empty in the palette, 直接在图中右键添加


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
); 

const taskNodeTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: custom_r,
      height: custom_r/2,
      fill: 'lightyellow'
    },  
  ),
  'task'
)

const nodeEventTypeConverter = type=>{  // order here from BPMN 2.0 poster
    const type2figure = {
        end: 'Circle',
        start: 'CircleLine',
        time: 'BpmnEventTimer',
        message: 'BpmnTaskMessage',
        
        }
  // console.log(event_type, )
  return type2figure[type] || 'NotAllowed'
}

const eventNodeTemplate = 
$(go.Node, 'Spot',
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "Circle",  
      custom_props, {fill: '#F6511D'},
    ),
    $(go.Shape, 
      custom_icon_props,
      new go.Binding('figure', 'eventType', nodeEventTypeConverter),
      // new go.Binding('isV', 'eventType', event_type=> event_type==='start'?'#F6511D':'#f7f7f7'),
    ),
  ),
  common_node_propety()
); 

const eventNodeTemplateForPalette = 
  $(go.Node, 'Vertical',
    {
      locationObjectName: 'SHAPE',
      locationSpot: go.Spot.Center,
      selectionAdorned: false,
    },
    $(go.Panel, "Auto", //子元素在面板的位置
      $(go.Shape, "Circle",
        custom_props, { fill: '#F6511D' },
      ),
      $(go.Shape,
        custom_icon_props,
        new go.Binding('figure', 'eventType', nodeEventTypeConverter)
      ),
    ),
    $(go.TextBlock,
      { margin: 5},
      new go.Binding('text', 'eventType')
    )
  )

const nodeGateWayTypeConverter = type=>{
    const type2figure={
        parallel: 'ThinCross',
        exclusive: 'ThinX',
    }
    return  type2figure[type] || 'NotAllowed'
}
const gateWayNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond",  
    custom_props, {fill: '#FFB400'},
  ),
  $(go.Shape,   
    new go.Binding('figure', 'gateType', nodeGateWayTypeConverter),
    custom_icon_props
  ),
  common_node_propety()
); 

const gateWayNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "Diamond",  
      custom_props, {fill: '#FFB400'},
    ),
    $(go.Shape,   
        new go.Binding('figure', 'gateType', nodeGateWayTypeConverter),
        custom_icon_props
    ),
  ),
  'exclusive gateWay'
)

// 泳道图，代码太多了所以把它变成了一个函数
const poolTemplate = ()=>{

}
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


//这里存工具栏中的模板
const paletteTemplate = {
    link: {

    },
    node:{
        gateWay: gateWayNodeTemplateForPalette,
        event: eventNodeTemplateForPalette,
        task: taskNodeTemplateForPalette
    },
    group:{
        Pool: poolTemplateForPalette,
        Lane: LaneTemplateForPalette,
    }
}
//这里存画布上的模板
const panelTemplate = {
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
    node:{
        gateWay: gateWayNodeTemplate,
        event: eventNodeTemplate,
        task: taskNodeTemplate,
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


