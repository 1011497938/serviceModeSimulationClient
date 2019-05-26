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
    
    this.palNodeTemplateMap.add('task1', taskNodeTemplateForPalette1)
    this.palNodeTemplateMap.add('task2', taskNodeTemplateForPalette2)
    this.palNodeTemplateMap.add('task3', taskNodeTemplateForPalette3)
    this.palNodeTemplateMap.add('task4', taskNodeTemplateForPalette4)
    this.palNodeTemplateMap.add('task5', taskNodeTemplateForPalette5)
    this.palNodeTemplateMap.add('start1', startNodeTemplateForPalette1)
   this.palNodeTemplateMap.add('start2', startNodeTemplateForPalette2)

    this.init()
  }

  // 重写一个新的,包含了从https://gojs.net/latest/samples/swimlanes.html抄来的泳道图
  init(){
    let myDiagram: go.Diagram;
    console.log(myDiagram)
  
  // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again
  function relayoutDiagram() {
    myDiagram.layout.invalidateLayout();
    myDiagram.findTopLevelGroups().each(function (g) { if (g.category === 'Pool' && g.layout !== null) g.layout.invalidateLayout(); });
    myDiagram.layoutDiagram();
  }

  
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
var taskNodeTemplate2=taskNodeTemplate1;
var taskNodeTemplate3=taskNodeTemplate1;
var taskNodeTemplate4=taskNodeTemplate1;
var taskNodeTemplate5=taskNodeTemplate1;
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
      fill: 'lightyellow'
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
      fill: 'lightyellow'
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




