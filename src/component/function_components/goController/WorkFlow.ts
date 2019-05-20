import * as go from 'gojs';
const {
  GraphController, $, makePort,   
  nodeResizeAdornmentTemplate,
  nodeRotateAdornmentTemplate,
  nodeSelectionAdornmentTemplate,
  showSmallPorts,
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


