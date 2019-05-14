import * as go from 'gojs';

// 用来表示事件的
export default class EventObject extends go.Node{
    constructor(){
        super(go.Panel.Auto)

        var shape = new go.Shape();
        shape.figure = "Ellipse";
        shape.fill = "lightblue";
        this.add(shape);
        this.shape = shape

        var textblock = new go.TextBlock();
        textblock.text = "Event";
        textblock.editable = true
        textblock.isMultiline = true
        textblock.margin = 5;
        this.add(textblock);
        this.textblock = textblock
    }
}