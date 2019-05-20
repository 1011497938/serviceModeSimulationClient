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

export default class Controller extends GraphController{
  constructor(diagram, palette){
    super(diagram, palette)

    this.nodeTemplateMap.add('task', taskNodeTemplate)
    this.nodeTemplateMap.add('start', startNodeTemplate)
    this.nodeTemplateMap.add('end', endNodeTemplate)
    this.nodeTemplateMap.add('parallel', parallelGateWayNodeTemplate)
    this.nodeTemplateMap.add('exclusive', exclusiveGateWayNodeTemplate)

    this.init()
    
  }

  // 重写一个新的,包含了从https://gojs.net/latest/samples/swimlanes.html抄来的泳道图
  // 太长了还不如自己写一个
  init2(){
    console.log('初始化工作流程图', this)
    let myDiagram = this.diagram, myPalette = this.palette
    // These parameters need to be set before defining the templates.
    var MINLENGTH = 200;  // this controls the minimum length of any swimlane
    var MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

    // this may be called to force the lanes to be laid out again
    function relayoutLanes() {
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

    super.init({
      layout: $(PoolLayout),
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
      // automatically re-layout the swim lanes after dragging the selection
      "SelectionMoved": relayoutDiagram,  // this DiagramEvent listener is
      "SelectionCopied": relayoutDiagram, // defined above
      "animationManager.isEnabled": false,
    },{

    })


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


  }
}


const custom_r = 80
const icon_color = '#f7f7f7'
const custom_props = {
  stroke: null,
  width: custom_r,
  height: custom_r
}
const custom_icon_props = {
  fill: '#f7f7f7',
  width: custom_r/2,
  height: custom_r/2,
  stroke: null
}
const taskNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: 120,
      height: 70,
      fill: '#00A6ED'
    },
  ),
  // { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
  // { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
  // { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },
  $(go.TextBlock,
  { margin: 3 },  
    new go.Binding("text", "key"))
); 

const startNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle",  
    custom_props, {fill: '#F6511D'},
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

const endNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Circle",  
    custom_props, {fill: '#F6511D'},
  ),
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },
  $(go.Shape, "Circle",  
    custom_icon_props
  ),
); 

const exclusiveGateWayNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond",
    custom_props, {fill: '#FFB400'},
  ),
  // $(go.TextBlock,{ margin: 3 },  
  //   new go.Binding("text", "key")),
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },
  $(go.Shape, "ThinX",  
    custom_icon_props
  ),
); 

const parallelGateWayNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond",  
    custom_props, {fill: '#FFB400'},
  ),
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
  // 画中间图案
  $(go.Shape, "ThinCross",  
    custom_icon_props
  ),
  // new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
  // new go.Binding('desiredSize', 'gatewayType', nodePalGatewaySymbolSizeConverter)),
); 


