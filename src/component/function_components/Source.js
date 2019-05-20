import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { relative } from 'path';
import { Icon, Menu} from 'semantic-ui-react'

var box;
export default class Source extends React.Component{
     
    componentDidMount(){
    
      var $ = go.GraphObject.make;  // for conciseness in defining templates
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
            "rotatingTool.snapAngleEpsilon": 15,
            "undoManager.isEnabled": true
          });

     

      box=myDiagram;

     //设置锚点
      function makePort(name, spot, output, input) {
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
          })
      }

   //控件背景颜色
      var nodeSelectionAdornmentTemplate = 
        $(go.Adornment, "Auto",
          $(go.Shape, { fill: null, stroke: "deepskyblue", strokeWidth: 1.5, strokeDashArray: [4, 2] }),
          $(go.Placeholder)
        );

      var nodeResizeAdornmentTemplate =
        $(go.Adornment, "Spot",
          { locationSpot: go.Spot.Right},
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
 
//控件在面板的中间
      myDiagram.nodeTemplate =
        $(go.Node, "Spot",   
          { locationSpot: go.Spot.Center },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
          { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
          { resizable: true, resizeObjectName: "PANEL", resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
          { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
          new go.Binding("angle").makeTwoWay(),
          $(go.Panel, "Auto", //子元素在面板的位置
            { name: "PANEL" },

            new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.Shape, "Rectangle",  
              {
                portId: "", 
                fromLinkable: true, toLinkable: true, cursor: "pointer",
                fill: "white",  
                strokeWidth: 2
              },
              new go.Binding("figure"),
              new go.Binding("fill")),

            $(go.TextBlock, new go.Binding("text", "color"),
              {
                font: "bold 11pt Helvetica, Arial, sans-serif",
                margin:20,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true  //文字是否可编辑
              },


              new go.Binding("text").makeTwoWay())
          ),

        );

//画布中线条模式
      myDiagram.linkTemplate =
        $(go.Link,  // the whole link panel
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
                margin: 20,
                minSize: new go.Size(10, NaN),
                editable: true
              },
              new go.Binding("text").makeTwoWay())
          )
        );

  
        

    //左边的控制面板
     var  myPalette =
        $(go.Palette, this.refs.myPaletteDiv,  
          {
            maxSelectionCount: 1,
            nodeTemplateMap: myDiagram.nodeTemplateMap,  
            linkTemplate: 
              $(go.Link,
                { 
                  locationSpot: go.Spot.Center,
                  selectionAdornmentTemplate:
                    $(go.Adornment, "Link",
                      { locationSpot: go.Spot.Center },
                      $(go.Shape,
                        { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }),
                      $(go.Shape,  // the arrowhead
                        { toArrow: "Standard", stroke: null }),
                       $(go.TextBlock,                        // this is a Link label
                          new go.Binding("text", "text"))
                    )
                },
                {
                  routing: go.Link.AvoidsNodes,
                  curve: go.Link.JumpOver,
                  corner:5,
                  toShortLength:4
                },
                new go.Binding("points"),
                $(go.Shape,
                  { isPanelMain: true, strokeWidth: 2 }),
                $(go.Shape,
                  { toArrow: "Standard", stroke: null }),

              ),
            model: new go.GraphLinksModel([  // specify the contents of the Palette
              { text: "提供主体", figure: "RoundedRectangle", fill: "#00AD5F" },
              { text: "消费主体", figure: "RoundedRectangle", fill: "lightskyblue" }
              
            ], [
                // the Palette also has a disconnected Link, which the user can drag-and-drop
                { points: new go.List(/*go.Point*/).addAll([new go.Point(0, 0), new go.Point(60, 0)]) }
              ])
          });
          
         const myOverview =
            $(go.Overview, this.refs.myOverviewDiv, 
              { observed: myDiagram, contentAlignment: go.Spot.Center });
         
        
      }



    static get defaultProps() {
      return {
        width: 800,
        height: 600,
      };
    }

    render(){
      const {width, height} = this.props
      const contorl_bar_height = 60
      return (
        <div>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%'}}>
             
          </div>
          <div style={{position: 'absolute',top:40, display:'flex',width:'100%', height:'100%',}}>
            <div ref='myPaletteDiv'  style={{flex:1,backgroundColor: '#859e9e'}}/>
            <div ref="myDiagramDiv"  style={{flex:6, backgroundColor: '#f7f7f7'}}/>      
          </div>
          <div style={{width:100,height:65,position:'absolute',left:30,top:300}}ref="myOverviewDiv"></div>
        </div>
      )
    }
  
  }