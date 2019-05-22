import * as go from 'gojs';
import { conditionalExpression } from '@babel/types';
const {
  GraphController, $, makePort,   
  nodeResizeAdornmentTemplate,
  nodeRotateAdornmentTemplate,
  nodeSelectionAdornmentTemplate,
  showSmallPorts,
  common_node_propety,
} = require('./GraphController.ts');


// const $ = go.GraphObject.make;

export default class Controller extends GraphController{
  constructor(diagram, palette){
    super(diagram, palette)

    this.nodeTemplateMap.add('carrier', carrierNodeTemplate)
    this.nodeTemplateMap.add('resource', resourceNodeTemplate)

    this.init()
  }
}

const custom_r = 80
const custom_props = {
  stroke: null,
  width: custom_r,
  height: custom_r
}
const carrierNodeTemplate =
$(go.Node, 'Spot',
  $(go.Shape, "RoundedRectangle", 
    custom_props, 
    {
      width: 120,
      height: 70,
      fill: '#00A6ED'
    },
    // new go.Binding("fill", "color"),
  ),
  common_node_propety(),
  $(go.TextBlock,
  { margin: 3 },  
    new go.Binding("text", "key"))
); 

const resourceNodeTemplate =
  $(go.Node, "Auto",
    $(go.Shape, { fill: "white" }),
    $(go.Panel, "Table",
      new go.Binding("itemArray", "people"),
      $(go.RowColumnDefinition,
        { separatorStrokeWidth: 0, separatorStroke: "none"}),
      $(go.RowColumnDefinition,
        { row: 0, background: "#FFB400" }),
      // the table headers -- remains even if itemArray is empty
      $(go.Panel, "TableRow",
        { isPanelMain: true },
        new go.Binding("itemArray", "columnDefinitions"),
        {
          itemTemplate:  // bound to a column definition object
            $(go.Panel,
              new go.Binding("column"),
              $(go.TextBlock,
                { margin: new go.Margin(2, 2, 0, 2), font: "bold 10pt sans-serif"},
                new go.Binding("text"))
            )
        }
      ),
      { // the rows for the people
        defaultAlignment: go.Spot.Left,
        defaultColumnSeparatorStroke: "black",
        itemTemplate:  // bound to a person/row data object
          $(go.Panel, "TableRow",
            // which in turn consists of a collection of cell objects,
            // held by the "columns" property in an Array
            new go.Binding("itemArray", "columns"),
            // you could also have other Bindings here for the whole row
            {
              itemTemplate:  // bound to a cell object
                $(go.Panel,  // each of which as "attr" and "text" properties
                  { stretch: go.GraphObject.Fill, alignment: go.Spot.TopLeft },
                  new go.Binding("column", "attr",
                    function(a, elt) {  // ELT is this bound item/cell Panel
                      // elt.data will be the cell object
                      // elt.panel.data will be the person/row data object
                      // elt.part.data will be the node data object
                      // "columnDefinitions" is on the node data object, so:
                      function findColumnDefinitionForName(nodedata, attrname) {
                        var columns = nodedata.columnDefinitions;
                        for (var i = 0; i < columns.length; i++) {
                          if (columns[i].attr === attrname) return columns[i];
                        }
                        return null;
                      }
                      var cd = findColumnDefinitionForName(elt.part.data, a);
                      if (cd !== null) return cd.column;
                      // throw new Error("unknown column name: " + a);
                    }),
                  // you could also have other Bindings here for this cell
                  $(go.TextBlock, { editable: true },
                    { margin: new go.Margin(2, 2, 0, 2), wrap: go.TextBlock.None},
                    new go.Binding("text").makeTwoWay())
                )
            }
          )
      }
    ),
    common_node_propety(),
  );