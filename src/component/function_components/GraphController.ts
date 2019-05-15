import * as go from 'gojs';

const keyCompare = (a, b)=>{
  const at = a.data.key;
  const bt = b.data.key;
  if (at < bt) return -1;
  if (at > bt) return 1;
  return 0;
}
const $ = go.GraphObject.make;

// 所有控制器的父类
export default class GraphController{
    diagram = undefined
    palette = undefined

    // 这两个鬼东西暂时先不用
    palNodeTemplateMap = new go.Map<string, go.Node>();
    palGroupTemplateMap = new go.Map<string, go.Group>();

    nodeTemplateMap = new go.Map<string, go.Node>();
    linkTemplateMap = new go.Map<string, go.Link>();
    groupTemplateMap = new go.Map<string, go.Group>();

    constructor(diagram, palette){
        this.diagram = diagram
        this.palette = palette

        // 这个地方可以加个改颜色的
    }

    init(){
      this.diagram = $(go.Diagram, this.diagram,  // must name or refer to the DIV HTML element
        {
          nodeTemplateMap: this.nodeTemplateMap,
          linkTemplateMap: this.linkTemplateMap,
          groupTemplateMap: this.groupTemplateMap,
  
          // commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js
          // default to having arrow keys move selected nodes
          // 'commandHandler.arrowKeyBehavior': 'move',
  
          // mouseDrop: function (e: go.InputEvent) {
            // const {diagram} = this
            // // when the selection is dropped in the diagram's background,
            // // make sure the selected Parts no longer belong to any Group
            // const ok = diagram.commandHandler.addTopLevelParts(diagram.selection, true);
            // if (!ok) diagram.currentTool.doCancel();
          // },
          // linkingTool: new BPMNLinkingTool(), // defined in BPMNClasses.js
          // relinkingTool: new BPMNRelinkingTool(), // defined in BPMNClasses.js
          // 'SelectionMoved': relayoutDiagram,  // defined below
          // 'SelectionCopied': relayoutDiagram
        });

      this.palette = $(go.Palette, this.palette,  // must name or refer to the DIV HTML element
        { // share the templates with the main Diagram
          nodeTemplateMap: this.nodeTemplateMap,
          groupTemplateMap: this.groupTemplateMap,
          // nodeTemplateMap: this.palNodeTemplateMap,
          // groupTemplateMap: this.palGroupTemplateMap,
          layout: $(go.GridLayout,{
            cellSize: new go.Size(1, 1),
            spacing: new go.Size(5, 5),
            comparer: keyCompare
          })
      })
    }

}

export {
  $,
  keyCompare,
  GraphController
}