import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { relative } from 'path';
import { Grid } from 'semantic-ui-react'
import { Icon, Menu} from 'semantic-ui-react'

var box;
var $ = go.GraphObject.make; 
export default class Aim2 extends React.Component{
     
    componentDidMount(){
    
       // for conciseness in defining templates
//建立画图区
     var  myDiagram =
        $(go.Diagram, this.refs.myDiagramDiv,  // must name or refer to the DIV HTML element
          {
     
            "draggingTool.dragsLink": true,
            "draggingTool.isGridSnapEnabled": true,
            "linkingTool.isUnconnectedLinkValid": true,
            "linkingTool.portGravity": 20,
            "relinkingTool.isUnconnectedLinkValid": true,
            "relinkingTool.portGravity": 20,
            "relinkingTool.fromHandleArchetype":
              $(go.Shape, "Diamond", { segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "tomato", stroke: "darkred" }),
            "relinkingTool.toHandleArchetype":
              $(go.Shape, "Diamond", { segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8), fill: "darkred", stroke: "tomato" }),
            "linkReshapingTool.handleArchetype":
              $(go.Shape, "Diamond", { desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
            "rotatingTool.handleAngle": 270,
            "rotatingTool.handleDistance": 30,
            "rotatingTool.snapAngleMultiple": 15,
            "rotatingTool.snapAngleEpsilon": 50,
            "undoManager.isEnabled": true
          });

     

      box=myDiagram;

      function makePort(name, spot, output, input) {
        // the port is basically just a small transparent square
        return $(go.Shape, "Circle",
          {
            fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
            stroke: null,
            desiredSize: new go.Size(7, 7),
            alignment: spot,  // align the port on the main Shape
            alignmentFocus: spot,  // just inside the Shape
            portId: name,  // declare this object to be a "port"
            fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
            fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
            cursor: "pointer"  // show a different cursor to indicate potential link point
          });
      }

      var nodeSelectionAdornmentTemplate =
        $(go.Adornment, "Auto",
          $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
          $(go.Placeholder)
        );

      var nodeResizeAdornmentTemplate =
        $(go.Adornment, "Spot",
          { locationSpot: go.Spot.Right },
          $(go.Placeholder),
          $(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.Top, cursor: "n-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

          $(go.Shape, { alignment: go.Spot.Left, cursor: "w-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.Right, cursor: "e-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),

          $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.Bottom, cursor: "s-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(6, 6), fill: "lightblue", stroke: "deepskyblue" })
        );

      var nodeRotateAdornmentTemplate =
        $(go.Adornment,
          { locationSpot: go.Spot.Center, locationObjectName: "CIRCLE" },
          $(go.Shape, "Circle", { name: "CIRCLE", cursor: "pointer", desiredSize: new go.Size(7, 7), fill: "lightblue", stroke: "deepskyblue" }),
          $(go.Shape, { geometryString: "M3.5 7 L3.5 30", isGeometryPositioned: true, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] })
        );

      myDiagram.nodeTemplate =
        $(go.Node, "Spot",
          { locationSpot: go.Spot.Center },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
          { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
          { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
          new go.Binding("angle").makeTwoWay(),
          // the main object is a Panel that surrounds a TextBlock with a Shape
          $(go.Panel, "Auto",
            { name: "PANEL" },
            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.Shape, "Rectangle",  // default figure
              {
                portId: "", // the default port: if no spot on link data, use closest side
                fromLinkable: true, toLinkable: true, cursor: "pointer",
                fill: "white",  // default color
                strokeWidth: 2
              },
              new go.Binding("figure"),
              new go.Binding("fill")),
            $(go.TextBlock,
              {
                font: "bold 11pt Helvetica, Arial, sans-serif",
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          ),
          // four small named ports, one on each side:
          makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, true, false),
          { // handle mouse enter/leave events to show/hide the ports
            mouseEnter: function(e, node) { showSmallPorts(node, true); },
            mouseLeave: function(e, node) { showSmallPorts(node, false); }
          }
        );

      function showSmallPorts(node, show) {
        node.ports.each(function(port) {
          if (port.portId !== "") {  // don't change the default port, which is the big shape
            port.fill = show ? "rgba(0,0,0,.3)" : null;
          }
        });
      }

      var linkSelectionAdornmentTemplate =
        $(go.Adornment, "Link",
          $(go.Shape,
            // isPanelMain declares that this Shape shares the Link.geometry
            { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 })  // use selection object's strokeWidth
        );

      myDiagram.linkTemplate =
        $(go.Link,  // the whole link panel
          { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
          { relinkableFrom: true, relinkableTo: true, reshapable: true },
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4
          },
          new go.Binding("points").makeTwoWay(),
          $(go.Shape,  // the link path shape
            { isPanelMain: true, strokeWidth: 2 }),
          $(go.Shape,  // the arrowhead
            { toArrow: "Standard", stroke: null }),
          $(go.Panel, "Auto",
            new go.Binding("visible", "isSelected").ofObject(),
            $(go.Shape, "RoundedRectangle",  // the link shape
              { fill: "#F8F8F8", stroke: null }),
            $(go.TextBlock,
              {
                textAlign: "center",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#919191",
                margin: 2,
                minSize: new go.Size(10, NaN),
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          )
        );
     function makeButton(text, action, visiblePredicate) {
        return $("ContextMenuButton",
          $(go.TextBlock, text),
          { click: action },
          // don't bother with binding GraphObject.visible if there's no predicate
          visiblePredicate ? new go.Binding("visible", "", function(o, e) { return o.diagram ? visiblePredicate(o, e) : false; }).ofObject() : {});
      }
    var partContextMenu =
        $("ContextMenu",
          makeButton("Properties",
            function(e, obj) {  // OBJ is this Button
              var contextmenu = obj.part;  // the Button is in the context menu Adornment
              var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
              // now can do something with PART, or with its data, or with the Adornment (the context menu)
              if (part instanceof go.Link) alert(linkInfo(part.data));
              else if (part instanceof go.Group) alert(groupInfo(contextmenu));
              else alert(nodeInfo(part.data));
            }),
          makeButton("Cut",
            function(e, obj) { e.diagram.commandHandler.cutSelection(); },
            function(o) { return o.diagram.commandHandler.canCutSelection(); }),
          makeButton("Copy",
            function(e, obj) { e.diagram.commandHandler.copySelection(); },
            function(o) { return o.diagram.commandHandler.canCopySelection(); }),
          makeButton("Paste",
            function(e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.lastInput.documentPoint); },
            function(o) { return o.diagram.commandHandler.canPasteSelection(); }),
          makeButton("Delete",
            function(e, obj) { e.diagram.commandHandler.deleteSelection(); },
            function(o) { return o.diagram.commandHandler.canDeleteSelection(); }),
          makeButton("Undo",
            function(e, obj) { e.diagram.commandHandler.undo(); },
            function(o) { return o.diagram.commandHandler.canUndo(); }),
          makeButton("Redo",
            function(e, obj) { e.diagram.commandHandler.redo(); },
            function(o) { return o.diagram.commandHandler.canRedo(); }),
          makeButton("Group",
            function(e, obj) { e.diagram.commandHandler.groupSelection(); },
            function(o) { return o.diagram.commandHandler.canGroupSelection(); }),
          makeButton("Ungroup",
            function(e, obj) { e.diagram.commandHandler.ungroupSelection(); },
            function(o) { return o.diagram.commandHandler.canUngroupSelection(); })
        );
      function nodeInfo(d) {  // Tooltip info for a node data object
        var str = "Node " + d.key + ": " + d.text + "\n";
        if (d.group)
          str += "member of " + d.group;
        else
          str += "top-level node";
        return str;
      }
   function linkInfo(d) {  // Tooltip info for a link data object
        return "Link:\nfrom " + d.from + " to " + d.to;
      }

        function groupInfo(adornment) {  // takes the tooltip or context menu, not a group node data object
        var g = adornment.adornedPart;  // get the Group that the tooltip adorns
        var mems = g.memberParts.count;
        var links = 0;
        g.memberParts.each(function(part) {
          if (part instanceof go.Link) links++;
        });
        return "Group " + g.data.key + ": " + g.data.text + "\n" + mems + " members including " + links + " links";
      }

       myDiagram.groupTemplate =
        $(go.Group, "Vertical",
          {
            selectionObjectName: "PANEL",  // selection handle goes around shape, not label
            ungroupable: true  // enable Ctrl-Shift-G to ungroup a selected Group
          },
          $(go.TextBlock,
            {
              font: "bold 19px sans-serif",
              isMultiline: false,  // don't allow newlines in text
              editable: true  // allow in-place editing by user
            },
            new go.Binding("text", "text").makeTwoWay(),
            new go.Binding("stroke", "color")),
          $(go.Panel, "Auto",
            { name: "PANEL" },
            $(go.Shape, "Rectangle",  // the rectangular shape around the members
              {
                fill: "rgba(128,128,128,0.2)", stroke: "gray", strokeWidth: 3,
                portId: "", cursor: "pointer",  // the Shape is the port, not the whole Node
                // allow all kinds of links from and to this port
                fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
              }),
            $(go.Placeholder, { margin: 10, background: "transparent" })  // represents where the members are
          ),
          { // this tooltip Adornment is shared by all groups
            toolTip:
              $("ToolTip",
                $(go.TextBlock, { margin: 4 },
                  // bind to tooltip, not to Group.data, to allow access to Group properties
                  new go.Binding("text", "", groupInfo).ofObject())
              ),
            // the same context menu Adornment is shared by all groups
            contextMenu: partContextMenu
          }
        );

      // Define the behavior for the Diagram background:

      function diagramInfo(model) {  // Tooltip info for the diagram's model
        return "Model:\n" + model.nodeDataArray.length + " nodes, " + model.linkDataArray.length + " links";
      }

      // provide a tooltip for the background of the Diagram, when not over any Part
      myDiagram.toolTip =
        $("ToolTip",
          $(go.TextBlock, { margin: 4 },
            new go.Binding("text", "", diagramInfo))
        );

      // provide a context menu for the background of the Diagram, when not over any Part
      myDiagram.contextMenu =
        $("ContextMenu",
          makeButton("Paste",
            function(e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.lastInput.documentPoint); },
            function(o) { return o.diagram.commandHandler.canPasteSelection(); }),
          makeButton("Undo",
            function(e, obj) { e.diagram.commandHandler.undo(); },
            function(o) { return o.diagram.commandHandler.canUndo(); }),
          makeButton("Redo",
            function(e, obj) { e.diagram.commandHandler.redo(); },
            function(o) { return o.diagram.commandHandler.canRedo(); })
        );

      // initialize the Palette that is on the left side of the page
     var myPalette =
        $(go.Palette, this.refs.myPaletteDiv,  // must name or refer to the DIV HTML element
          {
            maxSelectionCount: 1,
            nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
            linkTemplate: // simplify the link template, just in this Palette
              $(go.Link,
                { // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
                  // to line up the Link in the same manner we have to pretend the Link has the same location spot
                  locationSpot: go.Spot.Center,
                  selectionAdornmentTemplate:
                    $(go.Adornment, "Link",
                      { locationSpot: go.Spot.Center },
                      $(go.Shape,
                        { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                      $(go.Shape,  // the arrowhead
                        { toArrow: "Standard", stroke: null })
                    )
                },
                {
                  routing: go.Link.AvoidsNodes,
                  curve: go.Link.JumpOver,
                  corner: 5,
                  toShortLength: 4
                },
                new go.Binding("points"),
                $(go.Shape,  // the link path shape
                  { isPanelMain: true, strokeWidth: 2 }),
                $(go.Shape,  // the arrowhead
                  { toArrow: "Standard", stroke: null })
              ),
            model: new go.GraphLinksModel([  // specify the contents of the Palette
              { text: "Start", figure: "Circle", fill: "#00AD5F" },
              { text: "Step" },
              { text: "DB", figure: "Database", fill: "lightgray" },
              { text: "???", figure: "Diamond", fill: "lightskyblue" },
              { text: "End", figure: "Circle", fill: "#CE0620" },

              {text:"dfs",figure:"Epsilon",fill:"green",isGroup:true},
              { text: "Comment", figure: "RoundedRectangle", fill: "lightyellow" }
            ], [
                // the Palette also has a disconnected Link, which the user can drag-and-drop
                { points: new go.List(/*go.Point*/).addAll([new go.Point(0, 0), new go.Point(30, 0), new go.Point(30, 40), new go.Point(60, 40)]) }
              ])
          });
    }
 




    static get defaultProps() {
      return {
        width: 800,
        height: 600,
      };
    }

    render(){
      const {width, height} = this.props
      const contorl_bar_height = 40
      return (
        <div>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%'}}>
              <Menu fluid style={{background:'rgb(133,158,158)'}}>

                <Menu.Item style={{color:'#fff'}} >
                    新建&nbsp;<span className="iconfont">&#xe600;</span>
</Menu.Item> 
                <Menu.Item style={{color:'#fff'}}>
                    新建&nbsp;<span className="iconfont">&#xe600;</span>

                </Menu.Item> 
                 <Menu.Item style={{color:'#fff'}}>
                    保存&nbsp;<span className="iconfont">&#xe794;</span>
                </Menu.Item> 
                <Menu.Item onClick={this.handleDelete} style={{color:'#fff'}}>
                  删除&nbsp;<span className="iconfont">&#xe661;</span>
                </Menu.Item>
                <Menu.Item onClick={this.handleCut} style={{color:'#fff'}}>
                  剪切&nbsp;<i className="cut icon"></i>
                </Menu.Item>
                <Menu.Item onClick={this.scrollTop} style={{color:'#fff'}}>
                  自适应
                </Menu.Item>                
                <Menu.Item onClick={this.handleCopy} style={{color:'#fff'}}>
                  复制&nbsp;<i className="copy icon"></i>
                </Menu.Item> 
                <Menu.Item onClick={this.handlePaste} style={{color:'#fff'}}>
                  粘贴&nbsp;<span className="iconfont">&#xe62b;</span>
                </Menu.Item>                               
                <Menu.Item onClick={this.handleSelectAll} style={{color:'#fff'}}>
                    全选&nbsp;<span className="iconfont">&#xe729;</span>
                </Menu.Item>      

                <Menu.Item onClick={this.handleback} style={{color:'#fff'}}>
                  后退&nbsp;<span className="iconfont">&#xe730;</span>
                </Menu.Item>                             
                <Menu.Item onClick={this.handleForward} style={{color:'#fff'}}>
                  前进&nbsp;<span className="iconfont">&#xe731;</span>
                </Menu.Item>
              </Menu>
          </div>
          <div style={{position: 'absolute',top:40, display:'flex',width:'100%', height:'100%',}}>
            <div ref='myPaletteDiv'  style={{flex:1,backgroundColor: '#859e9e'}}/>
            <div ref="myDiagramDiv"  style={{flex:6, backgroundColor: '#f7f7f7'}}/>      
          </div>
          <div style={{width:100,height:65,position:'absolute',left:30,top:400}}ref="myOverviewDiv"></div>
        </div>
      )
    }
   handleDelete(){
      box.selection.all(function(nodeOrLink) {
          return box.selection.all(function(nodeOrLink) { 
                      // console.log(nodeOrLink.data.key+'实验'); 
                      //判断是否存在不允许删除的节点或线 
                       box.model.removeNodeData(nodeOrLink.data);
                       box.model.removeLinkData(nodeOrLink.data);
                        //console.log("key"+nodeOrLink.data.key)//拿到节点的Key值
                       // box.layoutDiagram(true);
  //                      console.log(box.model.toJson());"class": "GraphLinksModel",
  // "nodeDataArray": [ {"text":"中间步骤", "key":-2, "loc":"-310 -70"} ],
  // "linkDataArray": [ {"points":
                       return true; 
          });
      })

    }
    handleCopy(){
      box.commandHandler.copySelection();
    }
    handlePaste(){
      box.commandHandler.pasteSelection(box.lastInput.documentPoint);
    }
    handleSelectAll(){
        box.commandHandler.selectAll();
    }
    handleback(){
         box.commandHandler.undo();
    }
    handleForward(){
        box.commandHandler.redo();
    }
    scrollTop(){
      box.commandHandler.scrollToPart();
    }
    handleCut(){
      box.commandHandler.cutSelection();
    }

}