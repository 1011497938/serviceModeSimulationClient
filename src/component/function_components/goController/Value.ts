import * as go from 'gojs';
const {
  common_node_propety,
  GraphController, $, makePort,   
  nodeResizeAdornmentTemplate,
  nodeRotateAdornmentTemplate,
  nodeSelectionAdornmentTemplate,
  showSmallPorts,
  stayInGroup,
  genForPalette,
} = require('./GraphController.ts');


// const $ = go.GraphObject.make;
// 还没有完成判断拖进哪个的功能
// 5/22开始泳道图
// 还需要注意的功能
// 工具栏布局，点击自动生成id，空间的工厂类
export default class Controller extends GraphController{
  constructor(diagram, palette){
    super(diagram, palette, '服务价值视图')
    this.nodeTemplateMap.add('first', firstNodeTemplate)
    this.nodeTemplateMap.add('second', secondNodeTemplate)
    this.nodeTemplateMap.add('third', thirdNodeTemplate)
    this.nodeTemplateMap.add('four', fourNodeTemplate)
    this.nodeTemplateMap.add('five', fiveNodeTemplate)
    this.nodeTemplateMap.add('six', sixNodeTemplate)
    // this.nodeTemplateMap.add('event', eventNodeTemplate)
    // 
    this.nodeTemplateMap.add('seven', sevenNodeTemplate)
    this.nodeTemplateMap.add('eight', eightNodeTemplate)
    this.nodeTemplateMap.add('nine', nineNodeTemplate)
    this.nodeTemplateMap.add('parallel', parallelGateWayNodeTemplate)
    this.nodeTemplateMap.add('exclusive', exclusiveGateWayNodeTemplate)

    this.palNodeTemplateMap.add('seven', sevenNodeTemplateForPallete)
    this.palNodeTemplateMap.add('eight', eightNodeTemplateForPallete)
	this.palNodeTemplateMap.add('nine', nineNodeTemplateForPalette)

    this.palNodeTemplateMap.add('first', firstNodeTemplateForPalette)
    this.palNodeTemplateMap.add('second', secondNodeTemplateForPalette)
    this.palNodeTemplateMap.add('third', thirdNodeTemplateForPalette)
    this.palNodeTemplateMap.add('four', fourNodeTemplateForPalette)
    this.palNodeTemplateMap.add('five', fiveNodeTemplateForPalette)
    this.palNodeTemplateMap.add('six', sixNodeTemplateForPalette)
  this.palNodeTemplateMap.add('parallel', parallelGateWayNodeTemplateForPalette)
    this.palNodeTemplateMap.add('exclusive', exclusiveGateWayNodeTemplateForPalette)    
    // this.palNodeTemplateMap.add('event', eventNodeTemplateForPalette)

    this.init()
  }

  // 重写一个新的,从https://gojs.net/latest/projects/bpmn/BPMN.html#抄来的泳道图
  init(){
    let myDiagram: go.Diagram;
    function relayoutDiagram() {
    myDiagram.layout.invalidateLayout();
    myDiagram.findTopLevelGroups().each(function (g) { if (g.category === 'Pool' && g.layout !== null) g.layout.invalidateLayout(); });
    myDiagram.layoutDiagram();
  }
      super.init({
        mouseDrop: function (e: go.InputEvent) {

        },
        'SelectionMoved': relayoutDiagram,  // defined below
        'SelectionCopied': relayoutDiagram
      },{

      })
      myDiagram = this.diagram
  }
}


const custom_r = 60
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
  fill: cheng,
  stroke:"white",
  strokeWidth:1.5,
  width: min_r,
  height: min_r,
		  
}

const five_props={
	stroke:"black",
	strokeWidth:1.5,
	fill:lan,
	width: custom_r,
    height: custom_r,
    strokeDashArray:[5,10]
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






const firstNodeTemplate =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "RoundedRectangle", first_props),
      common_node_propety() 
 ),
); 

const firstNodeTemplateForPalette = genForPalette(
  $(go.Shape, "RoundedRectangle", first_props),
  'first'
)


const secondNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle", custom_props, {fill:cheng}),
    // 画中间图案
  $(go.Shape, "Circle",second_props),
  common_node_propety()
); 
const secondNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle", custom_props, {fill:cheng}),
      // 画中间图案
    $(go.Shape, "Circle",second_props),

  ),
  'second'
)


const thirdNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond", custom_props, {fill:forgive}),
  common_node_propety()
); 
const thirdNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Diamond", custom_props, {fill:forgive}),
  ),
  'third'
)

const fourNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle", custom_props, {fill:deepred}),
  common_node_propety()
); 
const fourNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle", custom_props, {fill:deepred}),
  ),
  'four'
)



const fiveNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle",five_props),
 // 画中间图案
  $(go.Shape, "Email",inFive_props),
  common_node_propety()  
); 
const fiveNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle",five_props),
 // 画中间图案
  $(go.Shape, "Email",inFive_props),    
  ),
  'five'
)

const sixNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle",custom_props, {fill:huang,stroke:"#f48828",strokeWidth:1.5}),
 // 画中间图案
  $(go.Shape, "BpmnEventTimer",inSix_props),  
  common_node_propety()
); 
const sixNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Circle",custom_props, {fill:huang,stroke:"#f48828",strokeWidth:1.5}),
 // 画中间图案
  $(go.Shape, "BpmnEventTimer",inSix_props),    
  ),
  'six'
)



const fieldTemplate =
  $(go.Panel, "TableRow",  // this Panel is a row in the containing Table
    // new go.Binding("portId", "name"),  // this Panel is a "port"
    {
      background: "transparent",  // so this port's background can be picked by the mouse
      fromSpot: go.Spot.LeftRightSides,  // links only go from the right side to the left side
      toSpot: go.Spot.LeftRightSides,
      // allow drawing links from or to this port:
      fromLinkable: true, toLinkable: true,
    },
    { // allow the user to select items -- the background color indicates whether "selected"
      //?? maybe this should be more sophisticated than simple toggling of selection
      click: function(e, item) {
        // assume "transparent" means not "selected", for items
        var oldskips = item.diagram.skipsUndoManager;
        item.diagram.skipsUndoManager = true;
        if (item.background === "transparent") {
          item.background = "dodgerblue";
        } else {
          item.background = "transparent";
        }
        item.diagram.skipsUndoManager = oldskips;
      }
    },
    $(go.Shape,
      {
        width: 6, height: 6, column: 0, strokeWidth: 2, margin: 4, stroke: null,
        // but disallow drawing links from or to this shape:
        fromLinkable: false, toLinkable: false
      },
      new go.Binding("figure", "figure"),
      new go.Binding("fill", "color")
    ),
    $(go.TextBlock,
      {
        margin: new go.Margin(0, 2), column: 1, font: "bold 13px sans-serif",
        // and disallow drawing links from or to this text:
        fromLinkable: false, toLinkable: false
      },
      new go.Binding("text", "name")),
    $(go.TextBlock,
      { margin: new go.Margin(0, 2), column: 2, font: "13px sans-serif" },
      new go.Binding("text", "info"))
  );


const sevenNodeTemplate =
  $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    // this rectangular shape surrounds the content of the node
    $(go.Shape,
      { fill: "#EEEEEE" , stroke: null,}),
    // the content consists of a header and a list of items
    $(go.Panel, "Vertical",
      // this is the header for the whole node
      $(go.Panel, "Auto",
        { stretch: go.GraphObject.Horizontal },  // as wide as the whole node
        $(go.Shape,
          { fill: forgive, stroke: null }),
        $(go.TextBlock,
          {
            alignment: go.Spot.Center,
            margin: 3,
            stroke: "white",
            textAlign: "center",
            font: "bold 12pt sans-serif"
          },
          new go.Binding("text", "key"))),
      // this Panel holds a Panel for each item object in the itemArray;
      // each item Panel is defined by the itemTemplate to be a TableRow in this Table
      $(go.Panel, "Table",
        {
          name: "TABLE",
          padding: 2,
          minSize: new go.Size(100, 10),
          defaultStretch: go.GraphObject.Horizontal,
          itemTemplate: fieldTemplate
        },
        new go.Binding("itemArray", "fields")
      )  // end Table Panel of items
    ),  // end Vertical Panel
    common_node_propety()
  );  // end Node


const sevenNodeTemplateForPallete = genForPalette(
  $(go.Panel, "Auto",
    // this rectangular shape surrounds the content of the node
    $(go.Shape,
      { fill: "#EEEEEE" ,stroke: null,}),
    // the content consists of a header and a list of items
    $(go.Panel, "Vertical",
      // this is the header for the whole node
      $(go.Panel, "Auto",
        { stretch: go.GraphObject.Horizontal },  // as wide as the whole node
        $(go.Shape,
          { fill: forgive, stroke: null }),
        $(go.TextBlock,
          {
            alignment: go.Spot.Center,
            margin: 3,
            stroke: "white",
            textAlign: "center",
            font: "bold 12pt sans-serif",
            text: 'carrier'
          },
        )
      ),
      // this Panel holds a Panel for each item object in the itemArray;
      // each item Panel is defined by the itemTemplate to be a TableRow in this Table
      $(go.Panel, "Table",
        {
          name: "TABLE",
          padding: 2,
          minSize: new go.Size(100, 10),
          defaultStretch: go.GraphObject.Horizontal,
          itemTemplate: fieldTemplate,
          itemArray: [{ name: "field", info: "value", color: "#8ba987", figure: "Ellipse" },],
        },
      )  // end Table Panel of items
    ),  // end Vertical Panel
  ),  // end Node
  'seven'
)



const eightNodeTemplate =
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
          itemTemplate:  // bound to a column definition object
            $(go.Panel,
              new go.Binding("column"),
              $(go.TextBlock,
                { margin: new go.Margin(3), stroke: "white",font: "bold 12pt sans-serif" },
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
                    { margin: new go.Margin(3), stroke: "white",wrap: go.TextBlock.None },
                    new go.Binding("text").makeTwoWay())
                )
            }
          )
      }
    ),
    common_node_propety(),
  );

const eightNodeTemplateForPallete = genForPalette(
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
                { margin: new go.Margin(3),stroke: "white",font: "bold 12pt sans-serif", },
                new go.Binding("text"))
            )
        }
      ),
      { // the rows for the people
        itemArray: [{ columns: [{ attr: "name", text: 'name' }, { attr: "value", text: '0' }] },],
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
                  $(go.TextBlock, { editable: false },
                    { margin: new go.Margin(3),  stroke: "#000",wrap: go.TextBlock.None },
                    new go.Binding("text").makeTwoWay())
                )
            }
          )
      }
    ),
  ),
  'eight'
)


const exclusiveGateWayNodeTemplate =
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
const exclusiveGateWayNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "Diamond",  
      custom_props, {fill: cheng},
    ),
      // 画中间图案
    $(go.Shape, "ThinX",  
      custom_icon_props
    ),
  ),
  'exclusive GateWay'
)


const parallelGateWayNodeTemplate =
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

const parallelGateWayNodeTemplateForPalette = genForPalette(
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



const nineNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Ellipse",  {fill:cheng,width:80,height:50,stroke:null}),
   common_node_propety()
); 
const nineNodeTemplateForPalette = genForPalette(
  $(go.Panel, "Auto", //子元素在控件的位置
    $(go.Shape, "Ellipse", {fill:cheng,width:80,height:50,stroke:null}),
  ),
  'nine'
)