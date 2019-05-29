// 这里存了所有的模板
import * as go from 'gojs';
import 'gojs/extensions/Figures'

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
      $(go.TextBlock, new go.Binding("text", "key"),
                {
                  font: "10pt Helvetica, Arial, sans-serif",
                  margin: 8,
                  maxSize: new go.Size(160, NaN),
                  wrap: go.TextBlock.WrapFit,
                  editable: true,
                  stroke:"#fff"
                },
                new go.Binding("text").makeTwoWay())
           ]

//协同生态视图控件
const consumerNodeTemplate =
$(go.Node, 'Spot',
    $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
      common_node_propety() ,
      reText()
 
); 


const consumerTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:forgive}),
  'consumer'
)


const produceNodeTemplate =
$(go.Node, 'Auto',
    $(go.Shape, "RoundedRectangle", first_props,{fill:cheng}),
      common_node_propety() ,
      reText()
); 

const produceTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props,{fill:cheng}),
  'producer'
)

//协同生态视图控件结束



//载体及资源视图开始

const carryNodeTemplate =
  $(go.Node, "Auto",
    $(go.Shape, { fill: "#eee", stroke: null, }),
    $(go.Panel, "Table",
      new go.Binding("itemArray", "people"),
      $(go.RowColumnDefinition,
        { separatorStrokeWidth: 0, separatorStroke: "none" }),
      $(go.RowColumnDefinition,
        { row: 0, background: forgive }),
      // the table headers -- remains even if itemArray is empty
      $(go.Panel, "TableRow",
        { isPanelMain: true },
        new go.Binding("itemArray", "columnDefinitions"),
        {
          itemTemplate:  
            $(go.Panel,
              new go.Binding("column"),
              $(go.TextBlock,
                { margin: new go.Margin(2), stroke: "white",font: "10pt sans-serif" },
                new go.Binding("text"))
            )
        }
      ),
      { // the rows for the people
        defaultAlignment: go.Spot.Center,
        defaultColumnSeparatorStroke:forgive,
        itemTemplate:  // bound to a person/row data object
          $(go.Panel, "TableRow",
            // which in turn consists of a collection of cell objects,
            // held by the "columns" property in an Array
            new go.Binding("itemArray", "columns"),
            // you could also have other Bindings here for the whole row
            {
              itemTemplate:  // bound to a cell object
                $(go.Panel,  // each of which as "attr" and "text" properties
                  { stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                  new go.Binding("column", "attr",
                    function (a, elt) {  // ELT is this bound item/cell Panel
                      function findColumnDefinitionForName(nodedata, attrname) {
                        var columns = nodedata.columnDefinitions;
                        for (var i = 0; i < columns.length; i++) {
                          if (columns[i].attr === attrname) return columns[i];
                        }
                        return null;
                      }
                      var cd = findColumnDefinitionForName(elt.part.data, a);
                      if (cd !== null) return cd.column;
                      // throw new Error("unknown column name: " + a);
                    }),
                  // you could also have other Bindings here for this cell
                  $(go.TextBlock, { editable: true },
                    { margin: new go.Margin(4), stroke: "#000",wrap: go.TextBlock.None },
                    new go.Binding("text").makeTwoWay())
                )
            }
          )
      }
    ),
    common_node_propety(),
  );

const carryTemplateForPallete = genForPalette(
  $(go.Panel, "Auto",
    $(go.Shape, { fill: "#eee", stroke: null, }),
    $(go.Panel, "Table",
      $(go.RowColumnDefinition,
        { separatorStrokeWidth: 0, separatorStroke: "none" }),
      $(go.RowColumnDefinition,
        { row: 0, background: forgive }),
      // the table headers -- remains even if itemArray is empty
      $(go.Panel, "TableRow",
        { isPanelMain: true },
        {
          itemArray: [            
            { attr: "name", text: "Name", column: 0 },
            { attr: "value", text: "Value", column: 1 },
          ],
          itemTemplate:  // bound to a column definition object
            $(go.Panel,
              new go.Binding("column"),
              $(go.TextBlock,
                { margin: new go.Margin(2),stroke: "#fff",font: "10pt sans-serif", },
                new go.Binding("text"))
            )
        }
      ),
      { // the rows for the people
        itemArray: [{ columns: [{ attr: "name", text: 'attr1' }, { attr: "value", text: 'value1' }] },],
        defaultAlignment: go.Spot.Center,
        defaultColumnSeparatorStroke:forgive,
        itemTemplate:  // bound to a person/row data object
          $(go.Panel, "TableRow",
            new go.Binding("itemArray", "columns"),
            {
              itemTemplate:  // bound to a cell object
                $(go.Panel,  // each of which as "attr" and "text" properties
                  { stretch: go.GraphObject.Fill, alignment: go.Spot.Center },
                  new go.Binding("column", "attr",
                    function (a, elt) {  // ELT is this bound item/cell Panel
                      // elt.data will be the cell object
                      // elt.panel.data will be the person/row data object
                      // elt.part.data will be the node data object
                      // "columnDefinitions" is on the node data object, so:
                      function findColumnDefinitionForName(nodedata, attrname) {
                        var columns = nodedata.columnDefinitions;
                        for (var i = 0; i < columns.length; i++) {
                          if (columns[i].attr === attrname) return columns[i];
                        }
                        return null;
                      }
                      var cd = findColumnDefinitionForName(elt.part.data, a);
                      if (cd !== null) return cd.column;
                      // throw new Error("unknown column name: " + a);
                    }),
                  // you could also have other Bindings here for this cell
                  $(go.TextBlock, { editable: true },
                    { margin: new go.Margin(2),  stroke: "#000",wrap: go.TextBlock.None },
                    new go.Binding("text").makeTwoWay())
                )
            }
          )
      }
    ),
  ),
  'carrier'
)



const sourceNodeTemplate =
  $(go.Node, "Auto",
    $(go.Shape, { fill: "#eee", stroke: null, }),
    $(go.Panel, "Table",
      new go.Binding("itemArray", "people"),
      $(go.RowColumnDefinition,
        { separatorStrokeWidth: 0, separatorStroke: "none" }),
      $(go.RowColumnDefinition,
        { row: 0, background: huang }),
      // the table headers -- remains even if itemArray is empty
      $(go.Panel, "TableRow",
        { isPanelMain: true },
        new go.Binding("itemArray", "columnDefinitions"),
        {
          itemTemplate:  
            $(go.Panel,
              new go.Binding("column"),
              $(go.TextBlock,
                { margin: new go.Margin(2), stroke: "white",font: "10pt sans-serif" },
                new go.Binding("text"))
            )
        }
      ),
      { // the rows for the people
        defaultAlignment: go.Spot.Center,
        defaultColumnSeparatorStroke: huang,
        itemTemplate:  // bound to a person/row data object
          $(go.Panel, "TableRow",
            // which in turn consists of a collection of cell objects,
            // held by the "columns" property in an Array
            new go.Binding("itemArray", "columns"),
            // you could also have other Bindings here for the whole row
            {
              itemTemplate:  // bound to a cell object
                $(go.Panel,  // each of which as "attr" and "text" properties
                  { stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                  new go.Binding("column", "attr",
                    function (a, elt) {  // ELT is this bound item/cell Panel
                      function findColumnDefinitionForName(nodedata, attrname) {
                        var columns = nodedata.columnDefinitions;
                        for (var i = 0; i < columns.length; i++) {
                          if (columns[i].attr === attrname) return columns[i];
                        }
                        return null;
                      }
                      var cd = findColumnDefinitionForName(elt.part.data, a);
                      if (cd !== null) return cd.column;
                      // throw new Error("unknown column name: " + a);
                    }),
                  // you could also have other Bindings here for this cell
                  $(go.TextBlock, { editable: true },
                    { margin: new go.Margin(4), stroke: "#000",wrap: go.TextBlock.None },
                    new go.Binding("text").makeTwoWay())
                )
            }
          )
      }
    ),
    common_node_propety(),
  );

const sourceTemplateForPallete = genForPalette(
  $(go.Panel, "Auto",
    $(go.Shape, { fill: "#eee", stroke: null, }),
    $(go.Panel, "Table",
      $(go.RowColumnDefinition,
        { separatorStrokeWidth: 0, separatorStroke: "none" }),
      $(go.RowColumnDefinition,
        { row: 0, background: huang }),
      // the table headers -- remains even if itemArray is empty
      $(go.Panel, "TableRow",
        { isPanelMain: true },
        {
          itemArray: [            
            { attr: "name", text: "Name", column: 0 },
            { attr: "value", text: "Value", column: 1 },
          ],
          itemTemplate:  // bound to a column definition object
            $(go.Panel,
              new go.Binding("column"),
              $(go.TextBlock,
                { margin: new go.Margin(2),stroke: "#fff",font: "10pt sans-serif", },
                new go.Binding("text"))
            )
        }
      ),
      { // the rows for the people
        itemArray: [{ columns: [{ attr: "name", text: 'attr1' }, { attr: "value", text: 'value1' }] },],
        defaultAlignment: go.Spot.Center,
        defaultColumnSeparatorStroke: "#F8ab59",
        itemTemplate:  // bound to a person/row data object
          $(go.Panel, "TableRow",
            new go.Binding("itemArray", "columns"),
            {
              itemTemplate:  // bound to a cell object
                $(go.Panel,  // each of which as "attr" and "text" properties
                  { stretch: go.GraphObject.Fill, alignment: go.Spot.Center },
                  new go.Binding("column", "attr",
                    function (a, elt) {  // ELT is this bound item/cell Panel
                      // elt.data will be the cell object
                      // elt.panel.data will be the person/row data object
                      // elt.part.data will be the node data object
                      // "columnDefinitions" is on the node data object, so:
                      function findColumnDefinitionForName(nodedata, attrname) {
                        var columns = nodedata.columnDefinitions;
                        for (var i = 0; i < columns.length; i++) {
                          if (columns[i].attr === attrname) return columns[i];
                        }
                        return null;
                      }
                      var cd = findColumnDefinitionForName(elt.part.data, a);
                      if (cd !== null) return cd.column;
                      // throw new Error("unknown column name: " + a);
                    }),
                  // you could also have other Bindings here for this cell
                  $(go.TextBlock, { editable: true },
                    { margin: new go.Margin(2),  stroke: "#000",wrap: go.TextBlock.None },
                    new go.Binding("text").makeTwoWay())
                )
            }
          )
      }
    ),
  ),
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
  reText()
); 
const startTemplateForPallete = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
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
  reText()
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
  'feel'
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
        carry:carryTemplateForPallete,
        task:taskTemplateForPallete,
        start:startTemplateForPallete,
        end:endTemplateForPallete,
        time:timeTemplateForPallete,
        message:messageTemplateForPallete,
        exclusive:exclusiveTemplateForPalette,
        parallel:parallelTemplateForPalette,
        aim:aimNodeTemplateForPalette,
         son:sonNodeTemplateForPalette,
         feel:feelTemplateForPalette,
         physical:physicalTemplateForPalette,
         num:numTemplateForPalette 
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
        carry:carryNodeTemplate,
        task:taskNodeTemplate,
        start:startNodeTemplate,
        end:endNodeTemplate,
        time:timeNodeTemplate,
        message:messageNodeTemplate,
        exclusive:exclusiveNodeTemplate,
        parallel:parallelNodeTemplate,
        aim:aimNodeTemplate,
        son:sonNodeTemplate,
        feel:feelNodeTemplate,
        physical:physicalNodeTemplate,
        num:numNodeTemplate
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

