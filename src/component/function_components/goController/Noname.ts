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
    this.nodeTemplateMap.add('task', taskNodeTemplate);
    this.nodeTemplateMap.add('aim',ellipseTemplate)
    this.init()
  }
}

const custom_r = 60
const custom_props = {
  stroke: 'black',
  width: custom_r,
  height: custom_r,
  strokeWidth:1.5
}


const taskNodeTemplate =
$(go.Node, 'Auto',
  $(go.Panel, "Auto", //子元素在面板的位置
    $(go.Shape, "RoundedRectangle", 
      custom_props, 
      {
        width: 70,
        height: 40,
        fill: 'lightyellow'
      },  
    ),
  $(go.TextBlock, new go.Binding("text", "text"),
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

const ellipseTemplate =
$(go.Node, 'Auto',
 $(go.Panel, "Auto", //子元素在面板的位置
  { name: "PANEL" },
  $(go.Shape, "Ellipse",  
     {width: 110, height: 50, margin: 4,fill: '#F6511D',stroke:'black',strokeWidth:1.5},
  ),
  $(go.TextBlock, new go.Binding("text", "text"),
  {
    font: "bold 11pt Helvetica, Arial, sans-serif",
    margin: 8,
    maxSize: new go.Size(160, NaN),
    wrap: go.TextBlock.WrapFit,
    editable: true  //文字是否可编辑
  },
),
  new go.Binding("text").makeTwoWay()),  
  makePort("T", go.Spot.Top, true, true),
  makePort("L", go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, true, true),
  { // handle mouse enter/leave events to show/hide the ports
    mouseEnter: function(e, node) { showSmallPorts(node, true); },
    mouseLeave: function(e, node) { showSmallPorts(node, false); }
  },
); 