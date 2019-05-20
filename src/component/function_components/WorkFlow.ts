import * as go from 'gojs';
import { propCombine } from '../../dataManager/commonFunction';
const solid_circle = require('../../static/images/圆-实心.svg')
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
const custom_props = {
  stroke: null,
  width: custom_r,
  height: custom_r
}
const taskNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "RoundedRectangle", 
    propCombine([
      custom_props, {
      width: 120,
      height: 70,
      fill: '#00A6ED'
    }]),
    new go.Binding("fill", "color"),
  ),
  { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
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
  propCombine([custom_props, {fill: '#F6511D'}]),
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
  propCombine([custom_props, {fill: '#F6511D'}]),
  ),
  $(go.Picture, { source: solid_circle, 
      width: custom_r/2, height: custom_r/2, margin: 2 
  }),
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },
); 

const exclusiveGateWayNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond",
    propCombine([custom_props, {fill: '#FFB400'}]),
    new go.Binding("fill", "color")),
  $(go.TextBlock,{ margin: 3 },  
    new go.Binding("text", "key")),
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },
); 

const parallelGateWayNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "Diamond",  
    propCombine([custom_props, {fill: '#FFB400'}]),
    new go.Binding("fill", "color"),
  ),
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
    new go.Binding("text", "key")),
); 

