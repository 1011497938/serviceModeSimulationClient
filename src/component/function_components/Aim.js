import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { relative } from 'path';
import { Grid } from 'semantic-ui-react'
import { Icon, Menu} from 'semantic-ui-react'

var box;
var $ = go.GraphObject.make; 
export default class Aim extends React.Component{
     
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

      var nodeResizeAdornmentTemplate = //放大缩小图形用的
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
                fromLinkable: true, toLinkable: true, cursor: "pointer",
                fill: "white",  
                strokeWidth:2
              },
              new go.Binding("figure"),
              new go.Binding("fill")),

            $(go.TextBlock, new go.Binding("text", "color"),
              {
                font: "bold 11pt Helvetica,Arial,sans-serif",
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true  //文字是否可编辑
              },
              new go.Binding("text").makeTwoWay())
          ),
          makePort("T", go.Spot.Top, go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
        );







//画布中线条模式
      myDiagram.linkTemplate =
        $(go.Link,  // the whole link panel
          { relinkableFrom: true, relinkableTo: true, reshapable: true },
          {
            routing:go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4
          },
          new go.Binding("points").makeTwoWay(),
          $(go.Shape,  // the link path shape
            { isPanelMain: true, strokeWidth: 2 }),
          $(go.Shape,  // 绘图中的直线箭头
            { toArrow: "Standard", stroke: null }),
          $(go.Shape,  // the arrowhead
            { fromArrow: "BackwardTriangle",stroke: null  }), 
          $(go.Panel, "Auto",
            new go.Binding("visible", "visible").ofObject(),
            $(go.Shape, "RoundedRectangle",  // the link shape
              { fill: "#F8F8F8", stroke: null }),
            $(go.TextBlock,"关系",
              {
                // textAlign: "center",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#000",
                margin: 2,
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
                       $(go.TextBlock,                        // this is a Link label
                          new go.Binding("text", "text"))
                    )
                },
                new go.Binding("points"),
                $(go.Shape,
                { isPanelMain: true, strokeWidth: 2 }),
               $(go.Shape,  // 面板中的直线箭头
                { toArrow: "Standard", stroke: null }), 
                $(go.Shape,  // the arrowhead
                { fromArrow: "BackwardTriangle",stroke: null}),
                  new go.Binding("point2"),  
                  $(go.Shape,
                { isPanelMain: true, strokeWidth: 2 }),                               
              ),
                     
            model: new go.GraphLinksModel([  // specify the contents of the Palette
              { text: "战略目标", figure: "Ellipse", fill: "#00AD5F" },
              { text: "物理", figure: "RoundedRectangle", fill: "lightyellow" },
              { text: "情感", figure: "RoundedRectangle", fill: "lightyellow" },
              { text: "数字", figure: "RoundedRectangle", fill: "lightyellow" },
              { text: "子目标", figure: "Ellipse", fill: "lightskyblue" },
              { text:" ﹣  ﹣", figure: "MinusLine", fill: "lightskyblue"}              
            ], [
                { points: new go.List(/*go.Point*/).addAll([new go.Point(0, 0), new go.Point(60, 0)])}              
              ])
          });
         const myOverview =$(go.Overview, this.refs.myOverviewDiv, {observed: myDiagram, contentAlignment: go.Spot.Center })            
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