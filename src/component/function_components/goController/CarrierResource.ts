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

// 每一行
const fieldTemplate =
$(go.Panel, "TableRow",  // this Panel is a row in the containing Table
  // new go.Binding("portId", "name"),  // this Panel is a "port"
  {
    background: "transparent",  // so this port's background can be picked by the mouse
    fromSpot: go.Spot.LeftRightSides,  // links only go from the right side to the left side
    toSpot: go.Spot.LeftRightSides,
    // allow drawing links from or to this port:
    fromLinkable: true, toLinkable: true
  },
  // { // allow the user to select items -- the background color indicates whether "selected"
  //   //?? maybe this should be more sophisticated than simple toggling of selection
  //   click: function(e, item) {
  //     // assume "transparent" means not "selected", for items
  //     var oldskips = item.diagram.skipsUndoManager;
  //     item.diagram.skipsUndoManager = true;
  //     if (item.background === "transparent") {
  //       item.background = "dodgerblue";
  //     } else {
  //       item.background = "transparent";
  //     }
  //     item.diagram.skipsUndoManager = oldskips;
  //   }
  // },
  $(go.Shape,
    {
      width: 12, height: 12, column: 0, strokeWidth: 2, margin: 4,
      // but disallow drawing links from or to this shape:
      fromLinkable: false, toLinkable: false
    },
    new go.Binding("figure", "figure"),
    new go.Binding("fill", "color")
  ),
  $(go.TextBlock,
    {
      margin: new go.Margin(0, 2), column: 1, font: "bold 13px sans-serif",
      // and disallow drawing links from or to this text:
      fromLinkable: false, toLinkable: false
    },
    new go.Binding("text", "name")),
  $(go.TextBlock,
    { margin: new go.Margin(0, 2), column: 2, font: "13px sans-serif" },
    new go.Binding("text", "info"))
);



const carrierNodeTemplate =
$(go.Node, "Auto",
new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
// this rectangular shape surrounds the content of the node
$(go.Shape,
  { fill: "#EEEEEE" }),
// the content consists of a header and a list of items
$(go.Panel, "Vertical",
  // this is the header for the whole node
  $(go.Panel, "Auto",
    { stretch: go.GraphObject.Horizontal },  // as wide as the whole node
    $(go.Shape,
      { fill: "#1570A6", stroke: null }),
    $(go.TextBlock,
      {
        alignment: go.Spot.Center,
        margin: 3,
        stroke: "white",
        textAlign: "center",
        font: "bold 12pt sans-serif"
      },
      new go.Binding("text", "key"))),
  // this Panel holds a Panel for each item object in the itemArray;
  // each item Panel is defined by the itemTemplate to be a TableRow in this Table
  $(go.Panel, "Table",
    {
      name: "TABLE",
      padding: 2,
      minSize: new go.Size(100, 10),
      defaultStretch: go.GraphObject.Horizontal,
      itemTemplate: fieldTemplate
    },
    new go.Binding("itemArray", "fields")
  )  // end Table Panel of items
)  // end Vertical Panel
);  // end Node

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