import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { relative } from 'path';
import { Grid } from 'semantic-ui-react'

export default class Test extends React.Component{
    componentDidMount(){
      var $ = go.GraphObject.make;
      var myDiagram =
      $(go.Diagram, this.refs.myDiagramDiv,
      {
        "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
      });
  
      myDiagram.nodeTemplate =
        $(go.Node, "Auto",  // the Shape automatically fits around the TextBlock
          $(go.Shape, "RoundedRectangle",  // use this kind of figure for the Shape
            // bind Shape.fill to Node.data.color
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            { margin: 3 },  // some room around the text
            // bind TextBlock.text to Node.data.key
            new go.Binding("text", "key"))
        );
      myDiagram.model = new go.GraphLinksModel(
      [ // a JavaScript Array of JavaScript objects, one per node;
        // the "color" property is added specifically for this app
        { key: "Alpha", color: "lightblue" },
        { key: "Beta", color: "#fffffd" },
        { key: "Gamma", color: "lightgreen" },
        { key: "Delta", color: "pink" }
      ],
      [ // a JavaScript Array of JavaScript objects, one per link
        { from: "Alpha", to: "Beta" },
        { from: "Alpha", to: "Gamma" },
        { from: "Beta", to: "Beta" },
        { from: "Gamma", to: "Delta" },
        { from: "Delta", to: "Alpha" }
      ]);

    // notice whenever a transaction or undo/redo has occurred
    myDiagram.addModelChangedListener(function(evt) {
      if (evt.isTransactionFinished){
        console.log(evt.model)
      }
    });


      // create the Palette
      var myPalette =
        $(go.Palette, this.refs.myPaletteDiv);
    
      // the Palette's node template is different from the main Diagram's
      myPalette.nodeTemplate =
        $(go.Node, "Horizontal",
          $(go.Shape,
            { width: 14, height: 14, fill: "white" },
            new go.Binding("fill", "color")),
          $(go.TextBlock,
            new go.Binding("text", "color"))
        );
    
      // the list of data to show in the Palette
      myPalette.model.nodeDataArray = [
        { key: "C", color: "cyan" },
        { key: "LC", color: "lightcyan" },
        { key: "A", color: "aquamarine" },
        { key: "T", color: "turquoise" },
        { key: "PB", color: "powderblue" },
        { key: "LB", color: "lightblue" },
        { key: "LSB", color: "lightskyblue" },
        { key: "DSB", color: "deepskyblue" }
      ];
    
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
            <div ref="myDiagramDiv"  style={{position: 'relative',float:'left',top: 0, width:'90%', height:'100%', backgroundColor: '#DAE4E4'}}/>      
          </div>
        </div>
      )
    }
  }

  // left: panel_width, 