import * as go from 'gojs';

// 用来表示事件的
export default class StartObject extends go.Node{
    constructor(){
        super(go.Panel.Auto)

        const r = 80
        var shape = new go.Shape();
        shape.figure = "Circle";
        shape.fill = "lightblue";
        shape.width = r
        shape.height = r
        this.add(shape);
        this.shape = shape

        var textblock = new go.TextBlock();
        textblock.text = "Start";
        textblock.editable = true
        textblock.isMultiline = true
        textblock.margin = 5;
        this.add(textblock);
        this.textblock = textblock
    }
}