import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';

export default class Test extends React.Component{
    componentDidMount(){
        var $ = go.GraphObject.make;
        var myDiagram =
        $(go.Diagram, "myDiagramDiv",
        {
          "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
        });
    
        var myModel = $(go.Model);
        // in the model data, each node is represented by a JavaScript object:
        myModel.nodeDataArray = [
        { key: "Alpha" },
        { key: "Beta" },
        { key: "Gamma" }
        ];
        myDiagram.model = myModel;
    }

    render(){
      return (
        <div id="myDiagramDiv" style={{width:400, height:450, backgroundColor: '#DAE4E4'}}>

        </div>
      )
    }
  }