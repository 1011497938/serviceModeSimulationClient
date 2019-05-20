import * as go from 'gojs';
import { conditionalExpression } from '@babel/types';
const {
  GraphController, $, makePort,   
  nodeResizeAdornmentTemplate,
  nodeRotateAdornmentTemplate,
  nodeSelectionAdornmentTemplate,
  showSmallPorts,
  common_node_propety,
} = require('./GraphController.ts');


// const $ = go.GraphObject.make;

export default class Controller extends GraphController{
  constructor(diagram, palette){
    super(diagram, palette)

    this.nodeTemplateMap.add('view', viewNodeTemplate)

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
const viewNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: 120,
      height: 70,
      fill: '#00A6ED'
    },
    // new go.Binding("fill", "color"),
  ),
  common_node_propety,
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