import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { relative } from 'path';
import { Grid } from 'semantic-ui-react'
import EventObject from './WorkFlowComponents/EventObject';
import StartObject from './WorkFlowComponents/StartObject';
import TerminateObject from './WorkFlowComponents/TerminateObject';
import TaskObject from './WorkFlowComponents/TaskObject';
// 5月14日，添加了过程流图, 谭思危
export default class WorkFlow extends React.Component{
    componentDidMount(){
      var $ = go.GraphObject.make;
      var diagram =
      $(go.Diagram, this.refs.myDiagramDiv,
      {
        "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
      });
  
      diagram.nodeTemplate =
        $(go.Node, "Auto",  // the Shape automatically fits around the TextBlock
          $(go.Shape, "RoundedRectangle",  // use this kind of figure for the Shape
            // bind Shape.fill to Node.data.color
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            { margin: 3 },  // some room around the text
            // bind TextBlock.text to Node.data.key
            new go.Binding("text", "key"))
        );
      diagram.model = new go.GraphLinksModel(
      // [ // a JavaScript Array of JavaScript objects, one per node;
      //   // the "color" property is added specifically for this app
      //   { key: "Alpha", color: "lightblue" },
      //   { key: "Beta", color: "#fffffd" },
      //   { key: "Gamma", color: "lightgreen" },
      //   { key: "Delta", color: "pink" }
      // ],
      // [ // a JavaScript Array of JavaScript objects, one per link
      //   { from: "Alpha", to: "Beta" },
      //   { from: "Alpha", to: "Gamma" },
      //   { from: "Beta", to: "Beta" },
      //   { from: "Gamma", to: "Delta" },
      //   { from: "Delta", to: "Alpha" }
      // ]
      );

      // notice whenever a transaction or undo/redo has occurred
      diagram.addModelChangedListener(function(evt) {
        if (evt.isTransactionFinished){
          console.log(evt.model)
        }
      });

      // create the Palette
      var palette =
        $(go.Palette, this.refs.myPaletteDiv);
  
      // the Palette's node template is different from the main Diagram's
      palette.nodeTemplate =
        $(go.Node, "Horizontal",
          $(go.Shape,
            { width: 14, height: 14, fill: "white" },
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            new go.Binding("text", "color"))
        );
    
      // the list of data to show in the Palette
      // palette.model.nodeDataArray = [];
      palette.add(new StartObject())
      palette.add(new TerminateObject())
      palette.add(new TaskObject())

      let testObject1 = new TaskObject(), testObject2 = new TaskObject()
      testObject1.portId = '1'
      testObject1.portId = '2'
      console.log(testObject1, testObject1.portId)
      diagram.add(testObject1)
      diagram.add(testObject2)
      // diagram.startTransaction("make new link");
      // diagram.model.addLinkData({ from: "1", to: "2" });
      // diagram.commitTransaction("make new link");
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
        <div style={{float:'left', position: 'relative', width: '100%', height: '100%'}}>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%', height: contorl_bar_height}}></div>
          <div style={{position: 'absolute', top: contorl_bar_height, width:'100%', height:'100%',}}>
            <div ref='myPaletteDiv'  style={{position: 'relative',float:'left',top: 0, width:'10%', height:'100%', backgroundColor: '#859e9e'}}/>
            <div ref="myDiagramDiv"  style={{position: 'relative',float:'left',top: 0, width:'90%', height:'100%', backgroundColor: '#f7f7f7'}}/>      
          </div>
        </div>
      )
    }
  }

  // left: panel_width, 