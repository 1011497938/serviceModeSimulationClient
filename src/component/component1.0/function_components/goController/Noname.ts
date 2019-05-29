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
    super(diagram, palette)
    this.nodeTemplateMap.add('task1', taskNodeTemplate1)
    this.nodeTemplateMap.add('task2', taskNodeTemplate2)
    this.nodeTemplateMap.add('task3', taskNodeTemplate3)
    this.nodeTemplateMap.add('task4', taskNodeTemplate4)
    this.nodeTemplateMap.add('task5', taskNodeTemplate5)    
    this.nodeTemplateMap.add('start1', startNodeTemplate1)
    this.nodeTemplateMap.add('start2', startNodeTemplate2)

  this.palGroupTemplateMap.add('Pool', poolTemplateForPalette)
    this.palGroupTemplateMap.add('Lane', swimLanesGroupTemplateForPalette)

    this.palNodeTemplateMap.add('task1', taskNodeTemplateForPalette1)
    this.palNodeTemplateMap.add('task2', taskNodeTemplateForPalette2)
    this.palNodeTemplateMap.add('task3', taskNodeTemplateForPalette3)
    this.palNodeTemplateMap.add('task4', taskNodeTemplateForPalette4)
    this.palNodeTemplateMap.add('task5', taskNodeTemplateForPalette5)
    this.palNodeTemplateMap.add('start1', startNodeTemplateForPalette1)
   this.palNodeTemplateMap.add('start2', startNodeTemplateForPalette2)

    this.init()
  }

  init(){
    let myDiagram: go.Diagram;
    // console.log(myDiagram)
    // swimlanes
    const MINLENGTH = 400;  // this controls the minimum length of any swimlane
    const MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

    // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
    function computeMinPoolSize(pool: go.Group) {
      // assert(pool instanceof go.Group && pool.category === "Pool");
      let len = MINLENGTH;
      pool.memberParts.each(function (lane) {
        // pools ought to only contain lanes, not plain Nodes
        if (!(lane instanceof go.Group)) return;
        const holder = lane.placeholder;
        if (holder !== null) {
          const sz = holder.actualBounds;
          len = Math.max(len, sz.width);
        }
      });
      return new go.Size(len, NaN);
    }

    // determine the minimum size of a Lane Group, even if collapsed
    function computeMinLaneSize(lane: go.Group) {
      if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
      return new go.Size(MINLENGTH, MINBREADTH);
    }
    // compute the minimum size for a particular Lane Group
    function computeLaneSize(lane: go.Group) {
      // assert(lane instanceof go.Group && lane.category !== "Pool");
      const sz = computeMinLaneSize(lane);
      if (lane.isSubGraphExpanded) {
        const holder = lane.placeholder;
        if (holder !== null) {
          const hsz = holder.actualBounds;
          sz.height = Math.max(sz.height, hsz.height);
        }
      }
      // minimum breadth needs to be big enough to hold the header
      const hdr = lane.findObject('HEADER');
      if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height);
      return sz;
    }
    // define a custom grid layout that makes sure the length of each lane is the same
    // and that each lane is broad enough to hold its subgraph
    class PoolLayout extends go.GridLayout {
      public cellSize = new go.Size(1, 1);
      public wrappingColumn = 1;
      public wrappingWidth = Infinity;
      public isRealtime = false;  // don't continuously layout while dragging
      public alignment = go.GridLayout.Position;
      // This sorts based on the location of each Group.
      // This is useful when Groups can be moved up and down in order to change their order.
      public comparer = function (a: go.Part, b: go.Part) {
        const ay = a.location.y;
        const by = b.location.y;
        if (isNaN(ay) || isNaN(by)) return 0;
        if (ay < by) return -1;
        if (ay > by) return 1;
        return 0;
      };
      public doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
        const diagram = this.diagram;
        if (diagram === null) return;
        diagram.startTransaction('PoolLayout');
        const pool = this.group;
        if (pool !== null && pool.category === 'Pool') {
          // make sure all of the Group Shapes are big enough
          const minsize = computeMinPoolSize(pool);
          pool.memberParts.each(function (lane) {
            if (!(lane instanceof go.Group)) return;
            if (lane.category !== 'Pool') {
              const shape = lane.resizeObject;
              if (shape !== null) {  // change the desiredSize to be big enough in both directions
                const sz = computeLaneSize(lane);
                shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
                shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
                const cell = lane.resizeCellSize;
                if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
                if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
              }
            }
          });
        }
        // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
        super.doLayout.call(this, coll);
        diagram.commitTransaction('PoolLayout');
      }
    }

    const groupStyle =()=> {  // common settings for both Lane and Pool Groups
      return [
        {
          layerName: 'Background',  // all pools and lanes are always behind all nodes and links
          background: 'transparent',  // can grab anywhere in bounds
          movable: true, // allows users to re-order by dragging
          copyable: false,  // can't copy lanes or pools
          avoidable: false  // don't impede AvoidsNodes routed Links
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
      ];
    }

  // hide links between lanes when either lane is collapsed
  const updateCrossLaneLinks = (group: go.Group)=> {
    group.findExternalLinksConnected().each((l) => {
      l.visible = (l.fromNode !== null && l.fromNode.isVisible() && l.toNode !== null && l.toNode.isVisible());
    });
  }

  const laneEventMenu =  // context menu for each lane
    $<go.Adornment>('ContextMenu',
      $('ContextMenuButton',
        $(go.TextBlock, 'Add Lane'),
        // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
        { click: function (e: go.InputEvent, obj: go.GraphObject) { addLaneEvent((obj.part as go.Adornment).adornedObject as go.Node); } })
    );


  // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
  function relayoutDiagram() {
    myDiagram.layout.invalidateLayout();
    myDiagram.findTopLevelGroups().each(function (g) { if (g.category === 'Pool' && g.layout !== null) g.layout.invalidateLayout(); });
    myDiagram.layoutDiagram();
  }

  // Add a lane to pool (lane parameter is lane above new lane)
  function addLaneEvent(lane: go.Node) {
    myDiagram.startTransaction('addLane');
    if (lane != null && lane.data.category === 'Lane') {
      // create a new lane data object
      const shape = lane.findObject('SHAPE');
      const size = new go.Size(shape ? shape.width : MINLENGTH, MINBREADTH);
      const newlanedata = {
        category: 'Lane',
        text: 'New Lane',
        color: 'white',
        isGroup: true,
        loc: go.Point.stringify(new go.Point(lane.location.x, lane.location.y + 1)), // place below selection
        size: go.Size.stringify(size),
        group: lane.data.group
      };
      // and add it to the model
      myDiagram.model.addNodeData(newlanedata);
    }
    myDiagram.commitTransaction('addLane');
  }

  const swimLanesGroupTemplate =
      $(go.Group, 'Spot', groupStyle(),
        {
          name: 'Lane',
          contextMenu: laneEventMenu,
          minLocation: new go.Point(NaN, -Infinity),  // only allow vertical movement
          maxLocation: new go.Point(NaN, Infinity),
          selectionObjectName: 'SHAPE',  // selecting a lane causes the body of the lane to be highlit, not the label
          resizable: true, resizeObjectName: 'SHAPE',  // the custom resizeAdornmentTemplate only permits two kinds of resizing
          layout: $(go.LayeredDigraphLayout,  // automatically lay out the lane's subgraph
            {
              isInitial: false,  // don't even do initial layout
              isOngoing: false,  // don't invalidate layout when nodes or links are added or removed
              direction: 0,
              columnSpacing: 10,
              layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
            }),
          computesBoundsAfterDrag: true,  // needed to prevent recomputing Group.placeholder bounds too soon
          computesBoundsIncludingLinks: false,  // to reduce occurrences of links going briefly outside the lane
          computesBoundsIncludingLocation: true,  // to support empty space at top-left corner of lane
          handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
          mouseDrop: function (e: go.InputEvent, grp: go.GraphObject) {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
            // don't allow drag-and-dropping a mix of regular Nodes and Groups
            if (!e.diagram.selection.any((n) => (n instanceof go.Group && n.category !== 'subprocess') || n.category === 'privateProcess')) {
              if (!(grp instanceof go.Group) || grp.diagram === null) return;
              const ok = grp.addMembers(grp.diagram.selection, true);
              if (ok) {
                updateCrossLaneLinks(grp);
                relayoutDiagram();
              } else {
                grp.diagram.currentTool.doCancel();
              }
            }
          },
          subGraphExpandedChanged: function (grp: go.Group) {
            if (grp.diagram === null) return;
            if (grp.diagram.undoManager.isUndoingRedoing) return;
            const shp = grp.resizeObject;
            if (grp.isSubGraphExpanded) {
              shp.height = (grp as any)['_savedBreadth'];
            } else {
              (grp as any)['_savedBreadth'] = shp.height;
              shp.height = NaN;
            }
            updateCrossLaneLinks(grp);
          }
        },
        // new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),

        $(go.Shape, 'Rectangle',  // this is the resized object
          { name: 'SHAPE', fill: 'white', stroke: null },  // need stroke null here or you gray out some of pool border.
          new go.Binding('fill', 'color'),
          new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),

        // the lane header consisting of a Shape and a TextBlock
        $(go.Panel, 'Horizontal',
          {
            name: 'HEADER',
            angle: 270,  // maybe rotate the header to read sideways going up
            alignment: go.Spot.LeftCenter, alignmentFocus: go.Spot.LeftCenter
          },
          $(go.TextBlock,  // the lane label
            { editable: true, margin: new go.Margin(2, 0, 0, 8) },
            new go.Binding('visible', 'isSubGraphExpanded').ofObject(),
            new go.Binding('text', 'text').makeTwoWay()),
          $('SubGraphExpanderButton', { margin: 4, angle: -270 })  // but this remains always visible!
        ),  // end Horizontal Panel
        $(go.Placeholder,
          { padding: 12, alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft }),
        $(go.Panel, 'Horizontal', { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft },
          $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
            {
              name: 'LABEL',
              editable: true, visible: false,
              angle: 0, margin: new go.Margin(6, 0, 0, 20)
            },
            new go.Binding('visible', 'isSubGraphExpanded', function (e) { return !e; }).ofObject(),
            new go.Binding('text', 'text').makeTwoWay())
        )
      );  // end swimLanesGroupTemplate

      // define a custom resize adornment that has two resize handles if the group is expanded
      // myDiagram.groupTemplate.resizeAdornmentTemplate =
      swimLanesGroupTemplate.resizeAdornmentTemplate =
      $(go.Adornment, 'Spot',
        $(go.Placeholder),
        $(go.Shape,  // for changing the length of a lane
          {
            alignment: go.Spot.Right,
            desiredSize: new go.Size(7, 50),
            fill: 'lightblue', stroke: 'dodgerblue',
            cursor: 'col-resize'
          },
          new go.Binding('visible', '', function (ad) {
            if (ad.adornedPart === null) return false;
            return ad.adornedPart.isSubGraphExpanded;
          }).ofObject()),
        $(go.Shape,  // for changing the breadth of a lane
          {
            alignment: go.Spot.Bottom,
            desiredSize: new go.Size(50, 7),
            fill: 'lightblue', stroke: 'dodgerblue',
            cursor: 'row-resize'
          },
          new go.Binding('visible', '', function (ad) {
            if (ad.adornedPart === null) return false;
            return ad.adornedPart.isSubGraphExpanded;
          }).ofObject())
      );


      const poolGroupTemplate =
      $(go.Group, 'Auto', groupStyle(),
        {
          computesBoundsIncludingLinks: false,
          // use a simple layout that ignores links to stack the "lane" Groups on top of each other
          layout: $(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
          { fill: 'white' },
          new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
          { defaultColumnSeparatorStroke: 'black' },
          $(go.Panel, 'Horizontal',
            { column: 0, angle: 270 },
            $(go.TextBlock,
              { editable: true, margin: new go.Margin(5, 0, 5, 0) },  // margin matches private process (black box pool)
              new go.Binding('text').makeTwoWay())
          ),
          $(go.Placeholder,
            { background: 'darkgray', column: 1 })
        )
      ); // end poolGroupTemplate


      this.groupTemplateMap.add('Pool', poolGroupTemplate)
      this.groupTemplateMap.add('Lane', swimLanesGroupTemplate)
      super.init({
        mouseDrop: function (e: go.InputEvent) {
          // when the selection is dropped in the diagram's background,
          // make sure the selected Parts no longer belong to any Group
          // const ok = myDiagram.commandHandler.addTopLevelParts(myDiagram.selection, true);
          // if (!ok) myDiagram.currentTool.doCancel();
        },
        'SelectionMoved': relayoutDiagram,  // defined below
        'SelectionCopied': relayoutDiagram
      },{

      })
      myDiagram = this.diagram
  }
}


  
   



const custom_r = 90
const icon_color = '#f7f7f7'
const custom_props = {
  stroke: 'black',
  strokeWidth:1.5,
  width: custom_r,
  height: custom_r
}
const custom_icon_props = {
  fill: '#f7f7f7',
  strokeWidth:1.5,
  width: custom_r/2,
  height: custom_r/2,
  stroke: 'black'
}





const taskNodeTemplate1 =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "RoundedRectangle", 
      custom_props, 
      {
        width: custom_r,
        height: custom_r/2,
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
const taskNodeTemplate4 =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "RoundedRectangle", 
      custom_props, 
      {
        width: custom_r,
        height: custom_r/2,
        fill: '#f6511d'
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
var taskNodeTemplate2=taskNodeTemplate1;
var taskNodeTemplate3=taskNodeTemplate1;

var taskNodeTemplate5=taskNodeTemplate4;
const taskNodeTemplateForPalette1 = genForPalette(
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: custom_r,
      height: custom_r/2,
      fill: 'lightyellow'
    },  
  ),
  '物理'
)
const taskNodeTemplateForPalette2 = genForPalette(
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: custom_r,
      height: custom_r/2,
      fill: 'lightyellow'
    },  
  ),
  '情感'
)
const taskNodeTemplateForPalette3 = genForPalette(
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: custom_r,
      height: custom_r/2,
      fill: 'lightyellow'
    },  
  ),
  '数字'
)
const taskNodeTemplateForPalette4 = genForPalette(
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: custom_r,
      height: custom_r/2,
      fill: '#f6511d'
    },  
  ),
  '消费主体'
)
const taskNodeTemplateForPalette5 = genForPalette(
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: custom_r,
      height: custom_r/2,
      fill: '#f6511d'
    },  
  ),
  '目标主体'
)

const startNodeTemplate1 =
$(go.Node, 'Auto',
 $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "Ellipse",  
      {
      stroke: 'black',
      strokeWidth:1.5,
      width:100,
      height:50,
      fill: '#F6511D'
    },
    ),
  ),
  common_node_propety(),
    $(go.TextBlock, new go.Binding("text", "key"),
    {
      font: "bold 11pt Helvetica, Arial, sans-serif",
      margin: 8,
      maxSize: new go.Size(160, NaN),
      wrap: go.TextBlock.WrapFit,
      editable: true  //文字是否可编辑
    },
    new go.Binding("text").makeTwoWay())  
); 

const startNodeTemplateForPalette1 = genForPalette(
  $(go.Shape, "Ellipse",  
    {
      stroke: 'black',
      strokeWidth:1.5,
      width:100,
      height:50,
      fill: '#F6511D'
    },
  ),
  '战略目标'
)


const startNodeTemplate2 =
$(go.Node, 'Auto',
 $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "Ellipse",  
      {
      stroke: 'black',
      strokeWidth:1.5,
      width:100,
      height:50,
      fill: '#F6511D'
    },
    ),
  ),
  common_node_propety(),
    $(go.TextBlock, new go.Binding("text", "key"),
    {
      font: "bold 11pt Helvetica, Arial, sans-serif",
      margin: 8,
      maxSize: new go.Size(160, NaN),
      wrap: go.TextBlock.WrapFit,
      editable: true  //文字是否可编辑
    },
    new go.Binding("text").makeTwoWay())  
); 

const startNodeTemplateForPalette2 = genForPalette(
  $(go.Shape, "Ellipse",  
    {
      stroke: 'black',
      strokeWidth:1.5,
      width:100,
      height:50,
      fill: '#F6511D'
    },
  ),
  '子目标'
)


const poolTemplateForPalette =
$(go.Group, 'Vertical',
  {
    locationSpot: go.Spot.Center,
    computesBoundsIncludingLinks: false,
    isSubGraphExpanded: false
  },
  $(go.Shape, 'Process',
    { fill: 'white', desiredSize: new go.Size(custom_r , custom_r / 2) }),
  $(go.TextBlock,
    { margin: 5, editable: true },
    new go.Binding('text'))
);

const swimLanesGroupTemplateForPalette =
$(go.Group, 'Vertical',); // empty in the palette, 直接在图中右键添加



