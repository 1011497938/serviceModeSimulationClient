import * as go from 'gojs';
// import '../../other_codes/figure'
import '../../../../node_modules/gojs/extensions/Figures'
import { nodeTemplateMap, linkTemplateMap, groupTemplateMap, } from './Template.ts'
import jq from 'jquery'
import stateManger from '../../../manager/stateManager';
import { compCompany } from '../../../manager/attribute2';

export {
  GraphController,
  view2controller,
  updateAllGraph,
  // getDocPosition,
}

const view2controller = {}

// 强制更新所有视图
const updateAllGraph = ()=>{
  for(let view_name in view2controller){
    const {diagram} = view2controller[view_name]
    // console.log(view_name, diagram, view2controller[view_name])
    diagram.requestUpdate()
    // diagram.zoomToFit()
  }
}

const $ = go.GraphObject.make;

// 将视图上的坐标转换为实际坐标，只有全屏时有用,有问题
// const getDocPosition = graphObject => {
//   const init_position = graphObject.getDocumentPoint(go.Spot.Center)
//   // console.log(init_position.x, init_position.y, graphObject.location, )
//   const window_width = jq(window).width(), window_height = jq(window).height()
//   return [init_position.x + window_width/2, init_position.y + window_height/2]
// }

// 用来自动整理泳道图，神奇的代码之一
const relayoutDiagram = ()=>{
  const diagram = stateManger.show_view_controller.diagram
  diagram.layout.invalidateLayout();
  // 在group里面以后这里似乎会出问题
  diagram.findTopLevelGroups().each(function (g) { if (g.category === 'Pool' && g.layout !== null) g.layout.invalidateLayout(); });
  diagram.layoutDiagram();
  // console.log('relayoutDiagram ')
}
// requestUpdate


// 所有控制器的父类
export default class GraphController {
  diagram = undefined
  palette = undefined
  view_name = ''

  static default_link_type = ''  //初始化设置的连线


  constructor(diagram, view_name = undefined) {
    if (view_name) {
      view2controller[view_name] = this
      //this={"view_name":""}
      this.view_name = view_name
    }
// console.log(this.diagram)
    this.diagram = diagram
    

    // 这个地方可以加个改颜色的
  }

  // 设置现在连的线的类型
  setDeafultLineType(link_type) {
    // console.log(link_type, linkTemplateMap[link_type])
    GraphController.default_link_type = link_type
    linkTemplateMap.add('', linkTemplateMap.get(link_type))
  }

  // 初始化go，可以传入自定义的参数
  init(diagram_props = {}) {

    const diagramContextMenu = $<go.Adornment>('ContextMenu',
      $('ContextMenuButton',
        $(go.TextBlock, '全选'),
        // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
        {
          click: (e: go.InputEvent, obj: go.GraphObject) => {
            console.log(e, obj)
          }
        }
      )
    )

    //给泳道图布局 
    // this is called after nodes have been moved or lanes resized, to layout all of the Pool Groups again

    this.diagram = $(go.Diagram, this.diagram,  // must name or refer to the DIV HTML element
      Object.assign({
        // 右键弹框
        contextMenu: diagramContextMenu,
        // maxSelectionCount: 1,
        nodeTemplateMap: nodeTemplateMap,
        linkTemplateMap: linkTemplateMap,
        groupTemplateMap: groupTemplateMap,


          // "draggingTool.dragsLink": true,
          "draggingTool.isGridSnapEnabled": true,
          "linkingTool.isUnconnectedLinkValid": false,
          "linkingTool.portGravity": 40,
          "relinkingTool.isUnconnectedLinkValid": false,
          "relinkingTool.portGravity": 40,
          "relinkingTool.fromHandleArchetype":
            $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
          "relinkingTool.toHandleArchetype":
            $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
          "linkReshapingTool.handleArchetype":
            $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
          "rotatingTool.handleAngle": 270,
          "rotatingTool.handleDistance": 30,
          "rotatingTool.snapAngleMultiple": 15,
          "rotatingTool.snapAngleEpsilon": 15,
          "undoManager.isEnabled": true
      }, diagram_props)
    );
    const diagram = this.diagram

    // 给新加的线一个类型
    this.diagram.addDiagramListener("LinkDrawn", function(diagramEvent) {
      // console.log(diagramEvent.subject, diagramEvent)
      const {subject} = diagramEvent
      subject.data.category = GraphController.default_link_type
      // console.log(subject.data.category, subject.data) 
    });

    this.diagram.addDiagramListener("ExternalObjectsDropped", function(diagramEvent) {
      // console.log(diagramEvent.subject, diagramEvent)
      const {subject} = diagramEvent
      var it = subject.iterator;
      while (it.next()) {
        const item = it.value
        const {key, category} = item
        diagram.model.startTransaction("change" + key);
        diagram.model.setDataProperty(item.data, 'key', category + key);
        diagram.model.setDataProperty(item.data, 'name', category + key);
        diagram.model.commitTransaction("change" + key);
        compCompany.create(item, this)
        // console.log(it, it.value, item.key, item.data.key)
      }
      // subject.forEach(elm => {
      //   console.log(elm, elm.key, elm.data)
      // });
      
    });

    this.addPoolTemplate()
  }

  // 因为泳道图太过于变态了我直接用函数了
  // 移动和添加都用问题来着
  addPoolTemplate() {
    const { diagram, view_name } = this

    // console.log(myDiagram)
    // swimlanes
    const MINLENGTH = 400;  // this controls the minimum length of any swimlane
    const MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

    // compute the minimum size of a Pool Group needed to hold all of the Lane Groups
    const computeMinPoolSize = (pool: go.Group) => {
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
    const computeMinLaneSize = (lane: go.Group) => {
      if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
      return new go.Size(MINLENGTH, MINBREADTH);
    }
    // compute the minimum size for a particular Lane Group
    const computeLaneSize = (lane: go.Group) => {
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

    const groupStyle = () => {  // common settings for both Lane and Pool Groups
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
    var updateCrossLaneLinks = (group: go.Group) => {
      group.findExternalLinksConnected().each((l) => {
        l.visible = (l.fromNode !== null && l.fromNode.isVisible() && l.toNode !== null && l.toNode.isVisible());
      });
    }

    var laneEventMenu =  // context menu for each lane
      $<go.Adornment>('ContextMenu',
        $('ContextMenuButton',
          $(go.TextBlock, 'Add Lane'),
          // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
          { 
            click: (e: go.InputEvent, obj: go.GraphObject)=> 
              { 
                addLaneEvent((obj.part as go.Adornment).adornedObject as go.Node); 
              } 
          })
      );

    // console.log(diagram, view_name)
    // Add a lane to pool (lane parameter is lane above new lane)
    const addLaneEvent = (lane: go.Node) => {
      // 玄学，为啥全跑跑到服务目标视图上去了
      const diagram = stateManger.show_view_controller.diagram
      diagram.startTransaction('addLane');
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
        diagram.model.addNodeData(newlanedata);
      }
      diagram.commitTransaction('addLane');
      // console.log(diagram,view_name,diagram.model.nodeDataArray)
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


    groupTemplateMap.add('Pool', poolGroupTemplate)
    groupTemplateMap.add('Lane', swimLanesGroupTemplate)
  }
}