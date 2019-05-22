import * as go from 'gojs';
const {
  GraphController, $, makePort,   
  nodeResizeAdornmentTemplate,
  nodeRotateAdornmentTemplate,
  nodeSelectionAdornmentTemplate,
  showSmallPorts,
  stayInGroup,
} = require('./GraphController.ts');


// const $ = go.GraphObject.make;
// 还没有完成判断拖进哪个的功能
export default class Controller extends GraphController{
  constructor(diagram, palette){
    super(diagram, palette)
    this.nodeTemplateMap.add('aim', ellipseTemplate)
    this.nodeTemplateMap.add('task', taskNodeTemplate)
    this.nodeTemplateMap.add('start', startNodeTemplate)
    this.nodeTemplateMap.add('end', endNodeTemplate)
    this.nodeTemplateMap.add('parallel', parallelGateWayNodeTemplate)
    this.nodeTemplateMap.add('exclusive', exclusiveGateWayNodeTemplate)
    
    this.init()
    
  }

  // 重写一个新的,包含了从https://gojs.net/latest/samples/swimlanes.html抄来的泳道图
  // 太长了还不如自己写一个
  init(){
    let myDiagram = this.diagram, myPalette = this.palette
    // These parameters need to be set before defining the templates.
    var MINLENGTH = 200;  // this controls the minimum length of any swimlane
    var MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

    // this may be called to force the lanes to be laid out again
    this.relayoutLanes = ()=> {
      myDiagram.nodes.each(function(lane) {
        if (!(lane instanceof go.Group)) return;
        if (lane.category === "Pool") return;
        lane.layout.isValidLayout = false;  // force it to be invalid
      });
      myDiagram.layoutDiagram();
    }

    // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
    function relayoutDiagram() {
      myDiagram.layout.invalidateLayout();
      myDiagram.findTopLevelGroups().each(function(g) { if (g.category === "Pool") g.layout.invalidateLayout(); });
      myDiagram.layoutDiagram();
    }

    // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
    function computeMinPoolSize(pool) {
      // assert(pool instanceof go.Group && pool.category === "Pool");
      var len = MINLENGTH;
      pool.memberParts.each(function(lane) {
        // pools ought to only contain lanes, not plain Nodes
        if (!(lane instanceof go.Group)) return;
        var holder = lane.placeholder;
        if (holder !== null) {
          var sz = holder.actualBounds;
          len = Math.max(len, sz.width);
        }
      });
      return new go.Size(len, NaN);
    }
    
    // compute the minimum size for a particular Lane Group
    function computeLaneSize(lane) {
      // assert(lane instanceof go.Group && lane.category !== "Pool");
      var sz = computeMinLaneSize(lane);
      if (lane.isSubGraphExpanded) {
        var holder = lane.placeholder;
        if (holder !== null) {
          var hsz = holder.actualBounds;
          sz.height = Math.max(sz.height, hsz.height);
        }
      }
      // minimum breadth needs to be big enough to hold the header
      var hdr = lane.findObject("HEADER");
      if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height);
      return sz;
    }

    // determine the minimum size of a Lane Group, even if collapsed
    function computeMinLaneSize(lane) {
      if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
      return new go.Size(MINLENGTH, MINBREADTH);
    }

    // define a custom ResizingTool to limit how far one can shrink a lane Group
    function LaneResizingTool() {
      go.ResizingTool.call(this);
    }
    go.Diagram.inherit(LaneResizingTool, go.ResizingTool);

    LaneResizingTool.prototype.isLengthening = function() {
      return (this.handle.alignment === go.Spot.Right);
    };

    LaneResizingTool.prototype.computeMinSize = function() {
      var lane = this.adornedObject.part;
      // assert(lane instanceof go.Group && lane.category !== "Pool");
      var msz = computeMinLaneSize(lane);  // get the absolute minimum size
      if (this.isLengthening()) {  // compute the minimum length of all lanes
        var sz = computeMinPoolSize(lane.containingGroup);
        msz.width = Math.max(msz.width, sz.width);
      } else {  // find the minimum size of this single lane
        var sz = computeLaneSize(lane);
        msz.width = Math.max(msz.width, sz.width);
        msz.height = Math.max(msz.height, sz.height);
      }
      return msz;
    };

    LaneResizingTool.prototype.resize = function(newr) {
      var lane = this.adornedObject.part;
      if (this.isLengthening()) {  // changing the length of all of the lanes
        lane.containingGroup.memberParts.each(function(lane) {
          if (!(lane instanceof go.Group)) return;
          var shape = lane.resizeObject;
          if (shape !== null) {  // set its desiredSize length, but leave each breadth alone
            shape.width = newr.width;
          }
        });
      } else {  // changing the breadth of a single lane
        go.ResizingTool.prototype.resize.call(this, newr);
      }
      relayoutDiagram();  // now that the lane has changed size, layout the pool again
    };
    // end LaneResizingTool class


    // define a custom grid layout that makes sure the length of each lane is the same
    // and that each lane is broad enough to hold its subgraph
    function PoolLayout() {
      go.GridLayout.call(this);
      this.cellSize = new go.Size(1, 1);
      this.wrappingColumn = 1;
      this.wrappingWidth = Infinity;
      this.isRealtime = false;  // don't continuously layout while dragging
      this.alignment = go.GridLayout.Position;
      // This sorts based on the location of each Group.
      // This is useful when Groups can be moved up and down in order to change their order.
      this.comparer = function(a, b) {
        var ay = a.location.y;
        var by = b.location.y;
        if (isNaN(ay) || isNaN(by)) return 0;
        if (ay < by) return -1;
        if (ay > by) return 1;
        return 0;
      };
    }
    go.Diagram.inherit(PoolLayout, go.GridLayout);

    PoolLayout.prototype.doLayout = function(coll) {
      var diagram = this.diagram;
      if (diagram === null) return;
      diagram.startTransaction("PoolLayout");
      var pool = this.group;
      if (pool !== null && pool.category === "Pool") {
        // make sure all of the Group Shapes are big enough
        var minsize = computeMinPoolSize(pool);
        pool.memberParts.each(function(lane) {
          if (!(lane instanceof go.Group)) return;
          if (lane.category !== "Pool") {
            var shape = lane.resizeObject;
            if (shape !== null) {  // change the desiredSize to be big enough in both directions
              var sz = computeLaneSize(lane);
              shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
              shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
              var cell = lane.resizeCellSize;
              if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
              if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
            }
          }
        });
      }
      // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
      go.GridLayout.prototype.doLayout.call(this, coll);
      diagram.commitTransaction("PoolLayout");
    };
    // end PoolLayout class

    const $ = go.GraphObject.make;

    function groupStyle() {  // common settings for both Lane and Pool Groups
      return [
        {
          layerName: "Background",  // all pools and lanes are always behind all nodes and links
          background: "transparent",  // can grab anywhere in bounds
          movable: true, // allows users to re-order by dragging
          copyable: false,  // can't copy lanes or pools
          avoidable: false,  // don't impede AvoidsNodes routed Links
          minLocation: new go.Point(NaN, -Infinity),  // only allow vertical movement
          maxLocation: new go.Point(NaN, Infinity)
        },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify)
      ];
    }

    // hide links between lanes when either lane is collapsed
    function updateCrossLaneLinks(group) {
      group.findExternalLinksConnected().each(function(l) {
        l.visible = (l.fromNode.isVisible() && l.toNode.isVisible());
      });
    }
    // each Group is a "swimlane" with a header on the left and a resizable lane on the right
    // this.groupTemplateMap.add('lane', )
    this.groupTemplateMap.add('lane', 
      $(go.Group, "Horizontal", groupStyle(),
        {
          selectionObjectName: "SHAPE",  // selecting a lane causes the body of the lane to be highlit, not the label
          resizable: true, resizeObjectName: "SHAPE",  // the custom resizeAdornmentTemplate only permits two kinds of resizing
          resizeAdornmentTemplate :  // define a custom resize adornment that has two resize handles if the group is expanded
            $(go.Adornment, "Spot",
              $(go.Placeholder),
              $(go.Shape,  // for changing the length of a lane
                {
                  alignment: go.Spot.Right,
                  desiredSize: new go.Size(7, 50),
                  fill: "lightblue", stroke: "dodgerblue",
                  cursor: "col-resize"
                },
                new go.Binding("visible", "", function(ad) {
                  if (ad.adornedPart === null) return false;
                  return ad.adornedPart.isSubGraphExpanded;
                }).ofObject()
            ),
            $(go.Shape,  // for changing the breadth of a lane
              {
                alignment: go.Spot.Bottom,
                desiredSize: new go.Size(50, 7),
                fill: "lightblue", stroke: "dodgerblue",
                cursor: "row-resize"
              },
              new go.Binding("visible", "", function(ad) {
                if (ad.adornedPart === null) return false;
                return ad.adornedPart.isSubGraphExpanded;
              }).ofObject())
          ),
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
          mouseDrop: function(e, grp) {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
            if (!e.shift) return;  // cannot change groups with an unmodified drag-and-drop
            // don't allow drag-and-dropping a mix of regular Nodes and Groups
            if (!e.diagram.selection.any(function(n) { return n instanceof go.Group; })) {
              var ok = grp.addMembers(grp.diagram.selection, true);
              if (ok) {
                updateCrossLaneLinks(grp);
              } else {
                grp.diagram.currentTool.doCancel();
              }
            } else {
              e.diagram.currentTool.doCancel();
            }
          },
          subGraphExpandedChanged: function(grp) {
            var shp = grp.resizeObject;
            if (grp.diagram.undoManager.isUndoingRedoing) return;
            if (grp.isSubGraphExpanded) {
              shp.height = grp._savedBreadth;
            } else {
              grp._savedBreadth = shp.height;
              shp.height = NaN;
            }
            updateCrossLaneLinks(grp);
          }
        },
        new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
        // the lane header consisting of a Shape and a TextBlock
        $(go.Panel, "Horizontal",
          {
            name: "HEADER",
            angle: 270,  // maybe rotate the header to read sideways going up
            alignment: go.Spot.Center
          },
          $(go.Panel, "Horizontal",  // this is hidden when the swimlane is collapsed
            new go.Binding("visible", "isSubGraphExpanded").ofObject(),
            $(go.Shape, "Diamond",
              { width: 8, height: 8, fill: "white" },
              new go.Binding("fill", "color")),
            $(go.TextBlock,  // the lane label
              { font: "bold 13pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
              new go.Binding("text", "text").makeTwoWay())
          ),
          $("SubGraphExpanderButton", { margin: 5 })  // but this remains always visible!
        ),  // end Horizontal Panel
        $(go.Panel, "Auto",  // the lane consisting of a background Shape and a Placeholder representing the subgraph
          $(go.Shape, "Rectangle",  // this is the resized object
            { name: "SHAPE", fill: "white" },
            new go.Binding("fill", "color"),
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify)),
          $(go.Placeholder,
            { padding: 12, alignment: go.Spot.TopLeft }),
          $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
            {
              name: "LABEL",
              font: "bold 13pt sans-serif", editable: true,
              angle: 0, alignment: go.Spot.TopLeft, margin: new go.Margin(2, 0, 0, 4)
            },
            new go.Binding("visible", "isSubGraphExpanded", function(e) { return !e; }).ofObject(),
            new go.Binding("text", "text").makeTwoWay())
        )  // end Auto Panel
      )  // end Group
    )

    
    
    // 大的泳道 
    this.groupTemplateMap.add("Pool",
      $(go.Group, "Auto", groupStyle(),
        { // use a simple layout that ignores links to stack the "lane" Groups on top of each other
          layout: $(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
        },
        $(go.Shape,
          { fill: "white" },
          new go.Binding("fill", "color")),
        $(go.Panel, "Table",
          { defaultColumnSeparatorStroke: "black" },
          $(go.Panel, "Horizontal",
            { column: 0, angle: 270 },
            $(go.TextBlock,
              { font: "bold 16pt sans-serif", editable: true, margin: new go.Margin(2, 0, 0, 0) },
              new go.Binding("text").makeTwoWay())
          ),
          $(go.Placeholder,
            { column: 1 })
        )
      ));

    super.init({
      // layout: $(PoolLayout),
      // don't allow dropping onto the diagram's background unless they are all Groups (lanes or pools)
      mouseDragOver: function(e) {
        if (!e.diagram.selection.all(function(n) { return n instanceof go.Group; })) {
          e.diagram.currentCursor = 'not-allowed';
        }
      },
      mouseDrop: function(e) {
        if (!e.diagram.selection.all(function(n) { return n instanceof go.Group; })) {
          e.diagram.currentTool.doCancel();
        }
      },
      // a clipboard copied node is pasted into the original node's group (i.e. lane).
      "commandHandler.copiesGroupKey": true,
      "SelectionMoved": relayoutDiagram,  // this DiagramEvent listener is
      "SelectionCopied": relayoutDiagram, // defined above
      "animationManager.isEnabled": false,
    },{

    })
    myDiagram = this.diagram
  }
}


const custom_r = 70
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
const ellipseTemplate =
$(go.Node, 'Auto',
 $(go.Panel, "Auto", //子元素在面板的位置
  { name: "PANEL" },
  $(go.Shape, "Ellipse",  
     {fill: '#F6511D',stroke:'black', strokeWidth:1.5},
  ),
   $(go.TextBlock, new go.Binding("text", "key"),
  {
    font: "bold 11pt Helvetica, Arial, sans-serif",
    margin: 8,
    maxSize: new go.Size(160, NaN),
    wrap: go.TextBlock.WrapFit,
    editable: true,  //文字是否可编辑
  },
  new go.Binding("text").makeTwoWay()),  
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },)
); 



const taskNodeTemplate =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
  { name: "PANEL" },

  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: 70,
      height: 40,
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

  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },

); 

const startNodeTemplate =
$(go.Node, 'Auto',
 $(go.Panel, "Auto", //子元素在面板的位置
  { name: "PANEL" },
  $(go.Shape, "Circle",  
    custom_props, {fill: '#F6511D'},
  ),
   $(go.TextBlock, new go.Binding("text", "key"),
  {
    font: "bold 11pt Helvetica, Arial, sans-serif",
    margin: 8,
    maxSize: new go.Size(160, NaN),
    wrap: go.TextBlock.WrapFit,
    editable: true  //文字是否可编辑
  },
  new go.Binding("text").makeTwoWay()),  
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },)
); 

const endNodeTemplate =
$(go.Node, 'Auto',
 $(go.Panel, "Auto", //子元素在面板的位置
  { name: "PANEL" },
  $(go.Shape, "Circle",  
    custom_props, {fill: '#F6511D'},
  ),
    $(go.Shape, "Circle",  
    custom_icon_props
  ),
 $(go.TextBlock, new go.Binding("text", "key"),
  {
    font: "bold 11pt Helvetica, Arial, sans-serif",
    margin: 8,
    maxSize: new go.Size(160, NaN),
    wrap: go.TextBlock.WrapFit,
    editable: true  //文字是否可编辑
  } ), 
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },

)); 

const exclusiveGateWayNodeTemplate =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
    { name: "PANEL" },
  $(go.Shape, "Diamond",
    custom_props, {fill: '#FFB400'},
  ),
    $(go.Shape, "ThinX",  
    custom_icon_props
  ),
   $(go.TextBlock, new go.Binding("text", "key"),
  {
    font: "bold 11pt Helvetica, Arial, sans-serif",
    margin: 8,
    maxSize: new go.Size(160, NaN),
    wrap: go.TextBlock.WrapFit,
    editable: true  //文字是否可编辑
  } ), 
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },

)); 

const parallelGateWayNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond",  
    custom_props, {fill: '#FFB400'},
  ),
    // 画中间图案
  $(go.Shape, "ThinCross",  
    custom_icon_props
  ),
   $(go.TextBlock, new go.Binding("text", "key"),
  {
    font: "bold 11pt Helvetica, Arial, sans-serif",
    margin: 8,
    maxSize: new go.Size(160, NaN),
    wrap: go.TextBlock.WrapFit,
    editable: true  //文字是否可编辑
  } ), 
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },
  // $(go.TextBlock,
  // { margin: 3 },  
  //   new go.Binding("text", "key")),

  // new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
  // new go.Binding('desiredSize', 'gatewayType', nodePalGatewaySymbolSizeConverter)),
); 