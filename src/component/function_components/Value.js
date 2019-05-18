import React from 'react';
import * as go from 'gojs';
import { ToolManager, Diagram } from 'gojs';
import { relative } from 'path';
import { Grid } from 'semantic-ui-react'
import { Icon, Menu} from 'semantic-ui-react'
var box;
export default class Value extends React.Component{
     
    componentDidMount(){
             var $ = go.GraphObject.make;  // for conciseness in defining templates

     var  diagram =$(go.Diagram, this.refs.myDiagramDiv); 
			    //    diagram.add(
			    // $(go.Part, "Horizontal",
			    //   $(go.Shape, { figure: "Club", 
			    //                 }),  // default fill and stroke are "black"
			    //   $(go.Shape, { figure: "Club", width: 40, height: 40, margin: 4,
			    //                 fill: "green" }),
			    //   $(go.Shape, { figure: "Club", width: 40, height: 40, margin: 4,
			    //                 fill: "green", stroke: null }),
			    //   $(go.Shape, { figure: "Club", width: 40, height: 40, margin: 4,
			    //                 fill: null, stroke: "green" }),
			    //   $(go.Shape, { figure: "Club", width: 40, height: 40, margin: 4,
			    //                 fill: null, stroke: "green", strokeWidth: 3 }),
			    //   $(go.Shape, { figure: "Club", width: 40, height: 40, margin: 4,
			    //                 fill: null, stroke: "green", strokeWidth: 6 }),
			    //   $(go.Shape, { figure: "Club", width: 40, height: 40, margin: 4,
			    //                 fill: "green", background: "orange" })
			    // )); 	
			    // 
			    // 改变画板上图形的大小
    	diagram.nodeTemplate =
				    $(go.Node, "Auto",
				      $(go.Shape, {figure:"RoundedRectangle",width: 40, height: 40, margin: 4,
				         fill: "white" },
				        new go.Binding("fill", "color"),
				        { portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer" }),
				      $(go.TextBlock, { margin: 5 },
				        new go.Binding("text", "key"))
				    );

				  diagram.undoManager.isEnabled = true;

				  // create the Palette
				  var myPalette =
				    $(go.Palette, this.refs.myPaletteDiv);

				  // the Palette's node template is different from the main Diagram's
				  myPalette.nodeTemplate =
				    $(go.Node, "Horizontal",
				      $(go.Shape,
				        { width: 40, height: 40, fill: "white",  },
				        new go.Binding("fill", "color"),
				       
				       new go.Binding("figure", "figure")),
				      $(go.TextBlock,
				        new go.Binding("text", "text"))
				    );

				  // the list of data to show in the Palette
				  myPalette.model.nodeDataArray = [
				    {text: "战略目标",color:"red",figure: "Ellipse",  },
				     { key: "C", text: "战略目标",color:"red" ,figure: "RoundedRectangle", },
				    { key: "C", text: "战略目标",color:"red" },
				     { key: "C", text: "战略目标",color:"red" },
				   { key: "C", text: "战略目标",color:"red" },
				     { key: "C", text: "战略目标",color:"red" },
				    { key: "C", text: "战略目标",color:"red" },
				     { key: "C", text: "战略目标",color:"red" },
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
        <div>
          <div ref='contorl_bar' style={{position: 'absolute', top:0, width:'100%', height: contorl_bar_height}}>
              <Menu fluid>
                <Menu.Item >
                    新建
                </Menu.Item> 
              </Menu>
          </div>
          <div style={{position: 'absolute', top: contorl_bar_height, display:'flex',width:'100%', height:'100%',}}>
            <div ref='myPaletteDiv'  style={{flex:1,backgroundColor: '#859e9e'}}/>
            <div ref="myDiagramDiv"  style={{flex:6, backgroundColor: '#f7f7f7'}}/>      
          </div>
        </div>
      )
    }
}
