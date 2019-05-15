import * as go from 'gojs';
import { propCombine } from '../../dataManager/commonFunction';
const solid_circle = require('../../static/images/圆-实心.svg')
const {GraphController, $} = require('./GraphController.ts');


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
$(go.Node, 'Auto',
  $(go.Shape, "RoundedRectangle", 
    propCombine([
      custom_props, {
      width: 120,
      height: 70,
      fill: '#00A6ED'
    }]),
    new go.Binding("fill", "color")),

  $(go.TextBlock,
  { margin: 3 },  
    new go.Binding("text", "key"))
); 

const startNodeTemplate =
$(go.Node, 'Auto',
  $(go.Shape, "Circle",  
  propCombine([custom_props, {fill: '#F6511D'}]),
  ),
); 

const endNodeTemplate =
$(go.Node, 'Auto',
  $(go.Shape, "Circle",  
  propCombine([custom_props, {fill: '#F6511D'}]),
  ),
  $(go.Picture, 
    { source: solid_circle, 
      width: custom_r/2, height: custom_r/2, margin: 2 
    }),
); 

const exclusiveGateWayNodeTemplate =
$(go.Node, 'Auto',
  $(go.Shape, "Diamond",
    propCombine([custom_props, {fill: '#FFB400'}]),
    new go.Binding("fill", "color")),
  $(go.TextBlock,
  { margin: 3 },  
    new go.Binding("text", "key"))
); 

const parallelGateWayNodeTemplate =
$(go.Node, 'Auto',
  $(go.Shape, "Diamond",  
    propCombine([custom_props, {fill: '#FFB400'}]),
    new go.Binding("fill", "color")),
  $(go.TextBlock,
  { margin: 3 },  
    new go.Binding("text", "key"))
); 

const fullLineLinkTemplate =
$(go.Node, 'Auto',
  $(go.Shape, "Circle",  
    propCombine([custom_props, ]),
    new go.Binding("fill", "color")),
  $(go.TextBlock,
  { margin: 3 },  
    new go.Binding("text", "key"))
); 


